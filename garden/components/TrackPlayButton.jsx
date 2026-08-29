'use client'

import { usePlayer } from '@/lib/PlayerContext'

function fmt(s) {
  if (!s || Number.isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, '0')
  return `${m}:${sec}`
}

export default function TrackPlayButton({ track }) {
  const { state, play, seek } = usePlayer()

  const isThis = state.track?.slug === track.slug
  const isPlaying = isThis && state.isPlaying
  const progress = isThis ? Math.min(1, Math.max(0, state.progress)) : 0
  const duration = isThis ? state.duration : 0

  const onScrub = (e) => {
    if (!isThis) return
    const rect = e.currentTarget.getBoundingClientRect()
    seek(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)))
  }

  return (
    <div className="flex w-full max-w-md items-center gap-4 rounded-full border border-line py-2 pl-2 pr-5 sm:w-[22rem]">
      <button
        type="button"
        onClick={() => play(track)}
        aria-label={`${isPlaying ? 'Pausar' : 'Reproduzir'} ${track.title}`}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-bg transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        {isPlaying ? (
          <svg className="h-4 w-4" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
            <rect x="0" y="0" width="4" height="16" rx="1.5" />
            <rect x="10" y="0" width="4" height="16" rx="1.5" />
          </svg>
        ) : (
          <svg className="ml-0.5 h-4 w-4" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
            <path d="M0 0l14 8L0 16V0z" />
          </svg>
        )}
      </button>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-widest">
          <span className={isThis ? 'text-accent' : 'text-fg'}>Ouça a prévia</span>
          <span className="shrink-0 tabular-nums text-muted">
            {fmt(progress * duration)} / {fmt(duration)}
          </span>
        </div>

        <div
          role={isThis ? 'slider' : undefined}
          aria-label={isThis ? 'Posição da faixa' : undefined}
          aria-valuenow={isThis ? Math.round(progress * 100) : undefined}
          aria-valuemin={isThis ? 0 : undefined}
          aria-valuemax={isThis ? 100 : undefined}
          onClick={onScrub}
          className={`relative h-[3px] w-full overflow-hidden rounded-full bg-line ${
            isThis ? 'cursor-pointer' : ''
          }`}
        >
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${progress * 100}%`, transition: 'width 0.12s linear' }}
          />
        </div>
      </div>
    </div>
  )
}
