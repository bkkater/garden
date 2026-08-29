'use client'

import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useRef,
} from 'react'

// ─── Estado ────────────────────────────────────────────────────────────────

const initial = {
  track: null,      // { slug, title, type, audio }
  isPlaying: false,
  progress: 0,      // 0–1 (dentro do previewLimit, se houver)
  duration: 0,      // duração efetiva (limitada ao previewLimit)
  fullDuration: 0,  // duração real da faixa
  volume: 0.8,
  previewLimit: null, // segundos — quando setado, a reprodução para nesse ponto
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return {
        ...state,
        track: action.track,
        isPlaying: true,
        progress: 0,
        duration: 0,
        fullDuration: 0,
        previewLimit: action.previewLimit ?? null,
      }
    case 'PLAY':
      return {
        ...state,
        isPlaying: true,
        previewLimit:
          action.previewLimit !== undefined ? action.previewLimit : state.previewLimit,
      }
    case 'PAUSE':
      return { ...state, isPlaying: false }
    case 'TICK':
      return { ...state, progress: action.progress, duration: action.duration }
    case 'METADATA':
      return {
        ...state,
        duration: action.duration,
        fullDuration: action.fullDuration ?? state.fullDuration,
      }
    case 'VOLUME':
      return { ...state, volume: action.volume }
    case 'ENDED':
      return { ...state, isPlaying: false, progress: 0 }
    case 'CLOSE':
      return { ...initial, volume: state.volume }
    default:
      return state
  }
}

// ─── Context ───────────────────────────────────────────────────────────────

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial)
  const audioRef = useRef(null)

  // ── Ações públicas ────────────────────────────────────────────────────────

  /** Toca uma faixa. Se for a mesma já carregada, faz toggle play/pause. */
  const play = useCallback(
    (track, opts = {}) => {
      const el = audioRef.current
      if (!el) return

      const previewLimit = opts.previewSeconds ?? null

      if (state.track?.slug === track.slug) {
        if (state.isPlaying) {
          el.pause()
          dispatch({ type: 'PAUSE' })
        } else {
          if (previewLimit && el.currentTime >= previewLimit) el.currentTime = 0
          el.play().catch(() => {})
          dispatch({ type: 'PLAY', previewLimit })
        }
        return
      }

      // Nova faixa
      el.src = track.audio
      el.volume = state.volume
      el.load()
      dispatch({ type: 'LOAD', track, previewLimit })
      el.play().catch(() => {})
    },
    [state.track, state.isPlaying, state.volume],
  )

  const pause = useCallback(() => {
    audioRef.current?.pause()
    dispatch({ type: 'PAUSE' })
  }, [])

  const resume = useCallback(() => {
    audioRef.current?.play().catch(() => {})
    dispatch({ type: 'PLAY' })
  }, [])

  /** ratio: 0–1 */
  const seek = useCallback(
    (ratio) => {
      const el = audioRef.current
      if (!el || !el.duration) return
      const effDur = state.previewLimit
        ? Math.min(state.previewLimit, el.duration)
        : el.duration
      el.currentTime = ratio * effDur
      dispatch({ type: 'TICK', progress: ratio, duration: effDur })
    },
    [state.previewLimit],
  )

  /** volume: 0–1 */
  const setVolume = useCallback((v) => {
    if (audioRef.current) audioRef.current.volume = v
    dispatch({ type: 'VOLUME', volume: v })
  }, [])

  const close = useCallback(() => {
    const el = audioRef.current
    if (el) { el.pause(); el.src = '' }
    dispatch({ type: 'CLOSE' })
  }, [])

  // ── Handlers do elemento de áudio ─────────────────────────────────────────

  const onTimeUpdate = () => {
    const el = audioRef.current
    if (!el || !el.duration) return

    const limit = state.previewLimit
    if (limit && el.currentTime >= limit) {
      el.pause()
      el.currentTime = 0
      dispatch({ type: 'ENDED' })
      return
    }

    const effDur = limit ? Math.min(limit, el.duration) : el.duration
    dispatch({ type: 'TICK', progress: el.currentTime / effDur, duration: effDur })
  }

  const onLoadedMetadata = () => {
    const el = audioRef.current
    if (!el) return
    const limit = state.previewLimit
    dispatch({
      type: 'METADATA',
      duration: limit ? Math.min(limit, el.duration) : el.duration,
      fullDuration: el.duration,
    })
  }

  const onEnded = () => dispatch({ type: 'ENDED' })

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <PlayerContext.Provider value={{ state, play, pause, resume, seek, setVolume, close }}>
      {children}
      {/* Elemento de áudio único — nunca desmonta */}
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      />
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer deve ser usado dentro de <PlayerProvider>')
  return ctx
}
