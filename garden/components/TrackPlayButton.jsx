'use client'

import { usePlayer } from '@/lib/PlayerContext'

/**
 * Botão que dispara o player global ao lado do título da faixa na página de letra.
 */
export default function TrackPlayButton({ track, size = 'default' }) {
  const { state, play } = usePlayer()

  const isThis = state.track?.slug === track.slug
  const isPlaying = isThis && state.isPlaying

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        play(track)
      }}
      aria-label={isPlaying ? `Pausar ${track.title}` : `Reproduzir ${track.title}`}
      title={isPlaying ? 'Pausar' : 'Reproduzir'}
      className={[
        'inline-flex items-center justify-center rounded-full border transition-all duration-200 active:scale-95 shrink-0 align-middle',
        'h-11 w-11 sm:h-14 sm:w-14',
        isPlaying
          ? 'border-accent bg-accent text-bg shadow-[0_0_24px_rgba(227,27,35,0.45)]'
          : 'border-fg text-fg hover:border-accent hover:bg-accent hover:text-bg',
      ].join(' ')}
    >
      <span
        className="flex items-center justify-center"
        aria-hidden="true"
      >
        {isPlaying ? (
          <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 14 16" fill="currentColor">
            <rect x="0" y="0" width="4" height="16" rx="1.5" />
            <rect x="10" y="0" width="4" height="16" rx="1.5" />
          </svg>
        ) : (
          <svg className="h-4 w-4 sm:h-5 sm:w-5 ml-0.5" viewBox="0 0 14 16" fill="currentColor">
            <path d="M0 0l14 8L0 16V0z" />
          </svg>
        )}
      </span>
    </button>
  )
}
