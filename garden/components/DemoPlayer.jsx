'use client'

import Link from 'next/link'
import { usePlayer } from '@/lib/PlayerContext'

// Prévia direto da lista de Nossas músicas.
const PREVIEW_SECONDS = 30

export default function DemoPlayer({ demo, number, label }) {
  const { state, play } = usePlayer()

  const isThis = state.track?.slug === demo.slug
  const isPlaying = isThis && state.isPlaying
  const ended = isThis && state.previewEnded
  const progress = isThis ? Math.min(1, Math.max(0, state.progress)) : 0
  const active = isPlaying || ended

  const trigger = () => play(demo, { previewSeconds: PREVIEW_SECONDS })

  const elapsed = Math.round(progress * PREVIEW_SECONDS)
  let caption = label
  if (isPlaying) {
    caption = `Tocando prévia · 0:${String(elapsed).padStart(2, '0')} / 0:${PREVIEW_SECONDS}`
  } else if (ended) {
    caption = 'Prévia completa · Ouça a faixa ↗'
  }

  return (
    <li
      className={`relative border-t border-line transition-colors ${
        active ? 'bg-accent/[0.07]' : ''
      }`}
    >
      <div className="flex items-center gap-4 py-5">
        {number && (
          <span
            className={`shrink-0 font-mono text-[10px] tabular-nums ${
              active ? 'text-accent/70' : 'text-muted/60'
            }`}
          >
            {number}
          </span>
        )}

        {/* Nome + legenda — navega para a página da faixa. */}
        <Link href={`/sons/${demo.slug}`} className="group min-w-0 flex-1 no-underline">
          <p
            className={`truncate font-display font-semibold leading-tight text-xl tracking-tight transition-colors group-hover:text-accent ${
              isPlaying ? 'text-accent' : 'text-fg'
            }`}
          >
            {demo.title}
          </p>
          {caption && (
            <p
              className={`mt-0.5 font-mono text-[10px] uppercase tracking-widest ${
                ended ? 'text-accent' : 'text-muted'
              }`}
            >
              {caption}
            </p>
          )}
        </Link>

        <button
          type="button"
          onClick={trigger}
          aria-label={
            isPlaying
              ? `Pausar prévia de ${demo.title}`
              : ended
                ? `Repetir prévia de ${demo.title}`
                : `Ouvir prévia de ${demo.title}`
          }
          className={[
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105 active:scale-95',
            isPlaying ? 'bg-accent text-bg' : 'border border-line text-muted hover:text-fg',
          ].join(' ')}
        >
          {isPlaying ? (
            <span className="flex items-end gap-[2px]" aria-hidden="true">
              {[0, 0.2, 0.1].map((delay, i) => (
                <span
                  key={i}
                  style={{
                    display: 'block',
                    width: '2.5px',
                    borderRadius: '2px',
                    background: 'currentColor',
                    animation: `pipBar 0.8s ease-in-out ${delay}s infinite alternate`,
                  }}
                />
              ))}
              <style>{`@keyframes pipBar { from { height: 4px } to { height: 13px } }`}</style>
            </span>
          ) : ended ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          ) : (
            <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
              <path d="M0 0l10 6L0 12V0z" />
            </svg>
          )}
        </button>
      </div>

      {/* Borda inferior vira barra de progresso da prévia (cheia quando termina) */}
      {(isPlaying || ended) && (
        <div
          className="absolute inset-x-0 bottom-0 h-[2px] bg-accent"
          style={{ width: `${progress * 100}%`, transition: 'width 0.15s linear' }}
          aria-hidden="true"
        />
      )}
    </li>
  )
}
