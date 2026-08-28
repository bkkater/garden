'use client'

import Link from 'next/link'
import { usePlayer } from '@/lib/PlayerContext'

// Prévia curta ao tocar direto da lista de Nossas músicas.
const PREVIEW_SECONDS = 15

const R = 13
const CIRC = 2 * Math.PI * R

export default function DemoPlayer({ demo }) {
  const { state, play } = usePlayer()

  const isThis = state.track?.slug === demo.slug
  const isPlaying = isThis && state.isPlaying
  const progress = isThis ? Math.min(1, Math.max(0, state.progress)) : 0
  const elapsed = Math.round(progress * PREVIEW_SECONDS)
  const timeLabel = `0:${String(elapsed).padStart(2, '0')}`

  return (
    <li className="border-t border-line">
      <div className="flex items-center gap-3 py-3">

        {/* Nome + ícone de letra — só navega para a página da letra. */}
        <Link
          href={`/sons/${demo.slug}`}
          className={[
            'group flex flex-1 items-center gap-2.5 font-mono text-xs uppercase tracking-widest no-underline transition-colors duration-150 hover:text-accent',
            isThis ? 'text-accent' : 'text-muted',
          ].join(' ')}
        >
          <span className="underline decoration-line decoration-1 underline-offset-4 group-hover:decoration-accent">
            {demo.title}
          </span>
          <span className="sr-only">— ver letra</span>
        </Link>

        {/* Controle de prévia à direita — rótulo + círculo ▶/⏸.
            O anel branco acompanha o progresso dos 15s. */}
        <button
          type="button"
          onClick={() => play(demo, { previewSeconds: PREVIEW_SECONDS })}
          aria-label={`${isPlaying ? 'Pausar prévia de' : 'Ouvir prévia de'} ${demo.title}`}
          className={[
            'group/preview flex shrink-0 items-center gap-2 rounded-full border py-1 pl-3 pr-1 font-mono text-[10px] uppercase tracking-widest transition-colors duration-200',
            isThis
              ? 'border-accent text-accent'
              : 'border-line text-muted hover:border-accent hover:text-accent',
          ].join(' ')}
        >
          {isPlaying ? (
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
                @keyframes pipBar { from { height: 4px } to { height: 12px } }
              `}</style>
            </span>
          ) : null}

          <span className="tabular-nums">{isThis ? timeLabel : 'Prévia'}</span>

          <span className="relative flex h-7 w-7 items-center justify-center">
            <span
              className={[
                'flex h-7 w-7 items-center justify-center rounded-full border text-fg transition-colors',
                isThis ? 'border-transparent' : 'border-current group-hover/preview:border-accent group-hover/preview:text-accent',
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
            </span>

            {isThis && (
              <svg
                className="pointer-events-none absolute inset-0 -rotate-90"
                viewBox="0 0 28 28"
                aria-hidden="true"
              >
                <circle cx="14" cy="14" r={R} fill="none" stroke="var(--color-line)" strokeWidth="2" />
                <circle
                  cx="14"
                  cy="14"
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
        </button>
      </div>
    </li>
  )
}
