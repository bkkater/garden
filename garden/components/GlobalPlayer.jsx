'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { usePlayer } from '@/lib/PlayerContext'

// ─── Ícones inline (sem dependência extra) ─────────────────────────────────

function IconPlay({ size = 14 }) {
  const h = Math.round((size * 16) / 14)
  return (
    <svg width={size} height={h} viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
      <path d="M0 0l14 8L0 16V0z" />
    </svg>
  )
}

function IconPause({ size = 14 }) {
  const h = Math.round((size * 16) / 14)
  return (
    <svg width={size} height={h} viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
      <rect x="0" y="0" width="4" height="16" rx="1.5" />
      <rect x="10" y="0" width="4" height="16" rx="1.5" />
    </svg>
  )
}

function IconVolume({ muted }) {
  return muted ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

function IconMaximize() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// ─── Formatador de tempo ───────────────────────────────────────────────────

function fmt(s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60).toString().padStart(2, '0')
  return `${m}:${sec}`
}

// ─── Componente principal ──────────────────────────────────────────────────

export default function GlobalPlayer() {
  const { state, pause, resume, seek, setVolume, close } = usePlayer()
  const { track, isPlaying, progress, duration, volume } = state
  const volRef = useRef(volume)
  const [minimized, setMinimized] = useState(false)

  // Prévia de 15s (tocada da lista) roda inline no próprio item — sem barra.
  if (!track || state.previewLimit) return null

  const handlePlayPause = (e) => {
    e?.stopPropagation()
    if (isPlaying) {
      pause()
    } else {
      resume()
    }
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
    setVolume(volume > 0 ? 0 : (volRef.current > 0 ? volRef.current : 0.8))
  }

  const elapsed = duration * progress
  const typeLabel = track.type === 'EP 1' ? 'EP 1' : 'Demo'

  // Versão minimizada: Pílula compacta no canto inferior direito
  if (minimized) {
    return (
      <div
        role="region"
        aria-label="Player de áudio minimizado"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-full border border-line px-4 py-2.5 shadow-2xl transition-transform duration-300 hover:scale-105"
        style={{
          background: 'color-mix(in srgb, var(--color-bg) 90%, transparent)',
          backdropFilter: 'blur(16px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
          animation: 'playerPillIn 0.3s cubic-bezier(0.22,1,0.36,1) both',
        }}
      >
        {/* Play/Pause rápido */}
        <button
          onClick={handlePlayPause}
          aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-fg text-fg transition-colors hover:border-accent hover:text-accent"
        >
          {isPlaying ? <IconPause size={10} /> : <IconPlay size={10} />}
        </button>

        {/* Título da faixa + link da letra */}
        <Link
          href={`/sons/${track.slug}`}
          className="group max-w-[150px] truncate font-display font-semibold text-xs text-fg no-underline hover:text-accent sm:max-w-[220px]"
          title={track.title}
        >
          {track.title}
          <span className="ml-1 text-[10px] text-muted opacity-0 group-hover:opacity-100">↗</span>
        </Link>

        {/* Barrinhas animadas quando tocando */}
        {isPlaying && (
          <span className="flex items-end gap-[2px] pr-1" aria-hidden="true">
            {[0, 0.2, 0.1].map((delay, i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '2.5px',
                  borderRadius: '2px',
                  background: 'var(--color-accent)',
                  animation: `pipBar 0.8s ease-in-out ${delay}s infinite alternate`,
                }}
              />
            ))}
          </span>
        )}

        <div className="h-4 w-[1px] bg-line" aria-hidden="true" />

        {/* Botão expandir */}
        <button
          onClick={() => setMinimized(false)}
          aria-label="Expandir player"
          className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors hover:text-fg"
          title="Expandir player"
        >
          <IconMaximize />
          Expandir
        </button>

        {/* Fechar */}
        <button
          onClick={close}
          aria-label="Fechar player"
          className="text-muted transition-colors hover:text-fg"
          title="Fechar player"
        >
          <IconClose />
        </button>

        <style>{`
          @keyframes playerPillIn {
            from { transform: translateY(20px) scale(0.9); opacity: 0; }
            to   { transform: translateY(0) scale(1);    opacity: 1; }
          }
          @keyframes pipBar {
            from { height: 3px; }
            to   { height: 11px; }
          }
        `}</style>
      </div>
    )
  }

  // Versão expandida: Barra completa fixa no rodapé
  return (
    <div
      role="region"
      aria-label="Player de áudio"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        animation: 'playerSlideUp 0.35s cubic-bezier(0.22,1,0.36,1) both',
      }}
    >
      {/* Barra de progresso — no topo do player, largura total */}
      <div
        className="group relative h-[3px] w-full cursor-pointer bg-line"
        onClick={handleSeek}
        role="slider"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progresso"
      >
        <div
          className="h-full bg-accent transition-[width] duration-100"
          style={{ width: `${progress * 100}%` }}
        />
        {/* Handle visível no hover */}
        <div
          className="absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-accent opacity-0 transition-opacity group-hover:opacity-100"
          style={{ left: `${progress * 100}%` }}
        />
      </div>

      {/* Corpo do player */}
      <div
        style={{
          background: 'color-mix(in srgb, var(--color-bg) 88%, transparent)',
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
          borderTop: '1px solid var(--color-line)',
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-8">

          {/* Info da faixa — clicável → página da letra */}
          <Link
            href={`/sons/${track.slug}`}
            className="group min-w-0 flex-1 no-underline"
            aria-label={`Ver letra de ${track.title}`}
          >
            <p className="truncate font-display font-semibold leading-tight text-sm transition-colors group-hover:text-accent md:text-base">
              {track.title}
              <span className="ml-1.5 font-mono text-[10px] opacity-0 transition-opacity group-hover:opacity-60" aria-hidden="true">↗</span>
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
              {typeLabel} · Garden Psychedelia
            </p>
          </Link>

          {/* Controles centrais */}
          <div className="flex shrink-0 items-center gap-4 md:gap-5">
            {/* Tempo */}
            <span className="hidden font-mono text-[11px] text-muted md:block tabular-nums">
              {fmt(elapsed)} / {fmt(duration)}
            </span>

            {/* Play / Pause */}
            <button
              onClick={handlePlayPause}
              aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-fg transition-all duration-200 hover:border-accent hover:text-accent active:scale-95"
            >
              {isPlaying ? <IconPause /> : <IconPlay />}
            </button>
          </div>

          {/* Controles direitos */}
          <div className="flex flex-1 items-center justify-end gap-3 md:gap-4">
            {/* Volume */}
            <div className="hidden items-center gap-2 md:flex">
              <button
                onClick={toggleMute}
                aria-label={volume === 0 ? 'Ativar som' : 'Silenciar'}
                className="text-muted transition-colors hover:text-fg"
              >
                <IconVolume muted={volume === 0} />
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.02}
                value={volume}
                onChange={handleVolume}
                aria-label="Volume"
                className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-line"
                style={{
                  accentColor: 'var(--color-accent)',
                  background: `linear-gradient(to right, var(--color-accent) ${volume * 100}%, var(--color-line) ${volume * 100}%)`,
                }}
              />
            </div>

            {/* X — tocando: minimiza; pausado/parado: fecha de vez */}
            <button
              onClick={() => (isPlaying ? setMinimized(true) : close())}
              aria-label={isPlaying ? 'Minimizar player' : 'Fechar player'}
              className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-line/40 hover:text-fg"
              title={isPlaying ? 'Minimizar' : 'Fechar'}
            >
              <IconClose />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes playerSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  )
}
