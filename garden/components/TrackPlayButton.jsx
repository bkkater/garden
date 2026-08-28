'use client'

import { usePlayer } from '@/lib/PlayerContext'

// Toca a faixa inteira (com o player global). Rótulo explícito + anel de progresso.
const R = 17
const CIRC = 2 * Math.PI * R

function fmt(s) {
  if (!s || Number.isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, '0')
  return `${m}:${sec}`
}

export default function TrackPlayButton({ track }) {
  const { state, play } = usePlayer()

  const isThis = state.track?.slug === track.slug
  const isPlaying = isThis && state.isPlaying
  const progress = isThis ? Math.min(1, Math.max(0, state.progress)) : 0

  let label = 'Ouça a faixa'
  if (isPlaying) label = `Tocando · ${fmt(progress * state.duration)}`
  else if (isThis && progress > 0) label = `Pausado · ${fmt(progress * state.duration)}`

  return (
    <button
      type="button"
      onClick={() => play(track)}
      aria-label={`${isPlaying ? 'Pausar' : 'Reproduzir'} ${track.title}`}
      className={[
        'inline-flex items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-5 font-mono text-xs font-medium uppercase tracking-widest transition-colors duration-200',
        isThis
          ? 'border-accent text-accent'
          : 'border-fg text-fg hover:border-accent hover:text-accent',
      ].join(' ')}
    >
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-bg">
          {isPlaying ? (
            <svg className="h-3.5 w-3.5" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
              <rect x="0" y="0" width="4" height="16" rx="1.5" />
              <rect x="10" y="0" width="4" height="16" rx="1.5" />
            </svg>
          ) : (
            <svg className="ml-0.5 h-3.5 w-3.5" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
              <path d="M0 0l14 8L0 16V0z" />
            </svg>
          )}
        </span>

        {isThis && (
          <svg
            className="pointer-events-none absolute inset-0 -rotate-90"
            viewBox="0 0 36 36"
            aria-hidden="true"
          >
            <circle cx="18" cy="18" r={R} fill="none" stroke="var(--color-line)" strokeWidth="2" />
            <circle
              cx="18"
              cy="18"
              r={R}
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC * (1 - progress)}
              style={{ transition: 'stroke-dashoffset 0.12s linear' }}
            />
          </svg>
        )}
      </span>

      <span className="tabular-nums">{label}</span>
    </button>
  )
}
