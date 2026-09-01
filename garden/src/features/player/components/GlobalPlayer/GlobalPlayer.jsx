'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { usePlayer } from '../../hooks/usePlayer'
import { PlayerBar } from './PlayerBar'
import { MiniPill } from './MiniPill'

// Orquestrador do player persistente: lê o contexto, decide qual superfície
// mostrar (barra expandida, pílula minimizada ou nada) e passa estado +
// ações para a parte escolhida.
export function GlobalPlayer() {
  const { state, pause, resume, seek, setVolume, close } = usePlayer()
  const { track, isPlaying, progress, duration, volume } = state
  const volRef = useRef(volume)
  const [minimized, setMinimized] = useState(false)
  const pathname = usePathname()

  // Esc: encolhe a barra expandida; na pílula, fecha de vez.
  useEffect(() => {
    if (!track) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (minimized) close()
      else setMinimized(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [track, minimized, close])

  // Não mostra o player quando:
  //  - não há faixa carregada;
  //  - é a prévia da lista (roda inline no próprio item);
  //  - a pessoa está na própria página da faixa (o player já vive lá).
  if (!track || state.previewLimit || pathname === `/sons/${track.slug}`) {
    return null
  }

  const handlePlayPause = (e) => {
    e?.stopPropagation()
    if (isPlaying) pause()
    else resume()
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    seek(ratio)
  }

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value)
    volRef.current = v
    setVolume(v)
  }

  const toggleMute = () => {
    setVolume(volume > 0 ? 0 : volRef.current > 0 ? volRef.current : 0.8)
  }

  if (minimized) {
    return (
      <MiniPill
        track={track}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onExpand={() => setMinimized(false)}
        onClose={close}
      />
    )
  }

  return (
    <PlayerBar
      track={track}
      isPlaying={isPlaying}
      progress={progress}
      duration={duration}
      volume={volume}
      elapsed={duration * progress}
      onPlayPause={handlePlayPause}
      onSeek={handleSeek}
      onVolume={handleVolume}
      onToggleMute={toggleMute}
      onMinimize={() => setMinimized(true)}
      onClose={close}
    />
  )
}
