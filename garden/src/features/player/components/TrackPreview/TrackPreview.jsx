'use client'

import Link from 'next/link'
import { usePlayer } from '../../hooks/usePlayer'
import { fmt } from '../GlobalPlayer/parts/format'
import { Pill } from '@shared/ui/Pill'

// Prévia de 30s direto da lista de Nossas músicas (ex-DemoPlayer).
const PREVIEW_SECONDS = 30

export function TrackPreview({ track, number, label }) {
  const { state, play, pause, resume, promote } = usePlayer()

  const isThis = state.track?.slug === track.slug
  const inPreview = isThis && state.previewLimit != null
  const previewPlaying = inPreview && state.isPlaying
  const previewEnded = isThis && state.previewEnded
  // "Promovida": virou faixa inteira (sem limite) e já rolou algo.
  const promoted =
    isThis && state.previewLimit == null && (state.isPlaying || state.progress > 0)
  const fullPlaying = promoted && state.isPlaying

  const progress = isThis ? Math.min(1, Math.max(0, state.progress)) : 0
  const active = previewPlaying || previewEnded || promoted

  const previewTrigger = () => play(track, { previewSeconds: PREVIEW_SECONDS })
  const fullToggle = () => (state.isPlaying ? pause() : resume())

  const elapsed = Math.round(progress * PREVIEW_SECONDS)
  let stateCaption = null
  if (previewPlaying) {
    stateCaption = `Tocando prévia · 0:${String(elapsed).padStart(2, '0')} / 0:${PREVIEW_SECONDS}`
  } else if (previewEnded) {
    stateCaption = 'Prévia completa'
  } else if (fullPlaying) {
    stateCaption = `Tocando · ${fmt(progress * state.duration)}`
  } else if (promoted) {
    stateCaption = `Pausado · ${fmt(progress * state.duration)}`
  }

  const titleRed = previewPlaying || fullPlaying

  return (
    <li
      className={`relative border-t border-line transition-colors first:border-t-0 ${
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
        <Link href={`/sons/${track.slug}`} className="group min-w-0 flex-1 no-underline">
          <div className="flex items-baseline gap-2.5">
            <p
              className={`truncate font-display font-semibold leading-tight text-xl tracking-tight transition-colors group-hover:text-accent ${
                titleRed ? 'text-accent' : 'text-fg'
              }`}
            >
              {track.title}
            </p>
            {label && !stateCaption && (
              <Pill className="shrink-0">{label}</Pill>
            )}
          </div>
          {stateCaption && (
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted">
              {stateCaption}
            </p>
          )}
        </Link>

        {/* Controles à direita conforme o estado */}
        {previewEnded ? (
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={previewTrigger}
              aria-label={`Repetir prévia de ${track.title}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-fg"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={promote}
              aria-label={`Continuar ouvindo ${track.title}`}
              className="flex items-center gap-2 rounded-full bg-accent py-2 pl-3 pr-4 font-mono text-[10px] uppercase tracking-widest text-bg transition-transform hover:scale-105 active:scale-95"
            >
              <svg width="9" height="11" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
                <path d="M0 0l10 6L0 12V0z" />
              </svg>
              Continuar ouvindo
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={promoted ? fullToggle : previewTrigger}
            aria-label={`${
              previewPlaying || fullPlaying ? 'Pausar' : 'Ouvir'
            } ${track.title}`}
            className={[
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105 active:scale-95',
              previewPlaying || fullPlaying
                ? 'bg-accent text-bg'
                : promoted
                  ? 'bg-accent text-bg'
                  : 'border border-line text-muted hover:text-fg',
            ].join(' ')}
          >
            {previewPlaying ? (
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
            ) : fullPlaying ? (
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
        )}
      </div>

      {/* Borda inferior vira barra de progresso */}
      {active && (
        <div
          className="absolute inset-x-0 bottom-0 h-[2px] bg-accent"
          style={{ width: `${progress * 100}%`, transition: 'width 0.15s linear' }}
          aria-hidden="true"
        />
      )}
    </li>
  )
}
