'use client'

import Link from 'next/link'
import { usePlayer } from '@/lib/PlayerContext'

export default function DemoPlayer({ demo }) {
  const { state, play } = usePlayer()

  const isThis = state.track?.slug === demo.slug
  const isPlaying = isThis && state.isPlaying

  // Clique no círculo ▶/⏸ — só toca, sem navegar
  const handlePlayButton = (e) => {
    e.preventDefault()
    e.stopPropagation()
    play(demo)
  }

  // Clique no nome — toca E navega para a letra (via Link normal)
  const handleLinkClick = () => {
    play(demo)
  }

  return (
    <li className="border-t border-line">
      <div className="flex items-center gap-3 py-3">

        {/* Botão de play/pause — não navega */}
        <button
          onClick={handlePlayButton}
          aria-label={`${isPlaying ? 'Pausar' : 'Reproduzir'} ${demo.title}`}
          className={[
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 hover:border-accent hover:text-accent',
            isPlaying ? 'border-accent text-accent' : 'border-current',
          ].join(' ')}
        >
          {isPlaying ? (
            <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
              <rect x="0" y="0" width="3" height="12" rx="1" />
              <rect x="7" y="0" width="3" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
              <path d="M0 0l10 6L0 12V0z" />
            </svg>
          )}
        </button>

        {/* Nome da faixa — navega para a letra E inicia a música */}
        <Link
          href={`/sons/${demo.slug}`}
          onClick={handleLinkClick}
          className={[
            'flex-1 font-mono text-xs uppercase tracking-widest no-underline transition-colors duration-150 hover:text-accent',
            isThis ? 'text-accent' : '',
          ].join(' ')}
        >
          {demo.title}
        </Link>

        {/* Barrinhas animadas "tocando agora" */}
        {isPlaying && (
          <span className="flex items-end gap-[3px]" aria-hidden="true">
            {[0, 0.2, 0.1].map((delay, i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '3px',
                  borderRadius: '2px',
                  background: 'var(--color-accent)',
                  animation: `pipBar 0.8s ease-in-out ${delay}s infinite alternate`,
                }}
              />
            ))}
            <style>{`
              @keyframes pipBar {
                from { height: 4px; }
                to   { height: 14px; }
              }
            `}</style>
          </span>
        )}
      </div>
    </li>
  )
}
