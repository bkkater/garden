'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@shared/i18n/navigation'
import { IconPlay, IconPause, IconVolume, IconMinimize, IconClose } from './parts/icons'
import { EqBars } from './parts/EqBars'
import { fmt } from './parts/format'

// Player expandido: barra completa fixa no rodapé.
export function PlayerBar({
  track,
  isPlaying,
  progress,
  duration,
  volume,
  elapsed,
  onPlayPause,
  onSeek,
  onVolume,
  onToggleMute,
  onMinimize,
  onClose,
}) {
  const t = useTranslations('player')
  return (
    <div
      role="region"
      aria-label={t('region')}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        animation: 'playerSlideUp 0.35s cubic-bezier(0.22,1,0.36,1) both',
      }}
    >
      {/* Barra de progresso — no topo do snackbar, largura total.
          z-20 pra bolinha não ficar escondida atrás do corpo do player. */}
      <div
        className="group relative z-20 h-[3px] w-full cursor-pointer bg-line"
        onClick={onSeek}
        role="slider"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={t('progress')}
      >
        <div
          className="h-full bg-accent transition-[width] duration-100"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_2px_var(--color-bg)] transition-transform duration-100 group-hover:scale-125"
          style={{ left: `${progress * 100}%` }}
        />
      </div>

      {/* Corpo do player */}
      <div
        className="relative z-10"
        style={{
          background: 'color-mix(in srgb, var(--color-bg) 88%, transparent)',
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        }}
      >
        <div className="flex items-center gap-4 px-4 py-3 md:gap-6 lg:px-8">

          {/* Esquerda — Play / Pause */}
          <button
            onClick={onPlayPause}
            aria-label={isPlaying ? t('pause') : t('play')}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-bg transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            {isPlaying ? <IconPause /> : <IconPlay />}
          </button>

          {/* Centro — faixa + legenda + barrinhas + tempo */}
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Link
              href={`/sons/${track.slug}`}
              className="group min-w-0 no-underline"
              aria-label={t('seeLyrics', { title: track.title })}
            >
              <p className="truncate font-display font-semibold leading-tight text-sm transition-colors group-hover:text-accent md:text-base">
                {track.title}
                <span className="ml-1.5 font-mono text-[10px] text-muted opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">↗</span>
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {track.type} — {isPlaying ? t('playing') : t('paused')}
              </p>
            </Link>
            <EqBars playing={isPlaying} />
            <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted">
              {fmt(elapsed)} / {fmt(duration)}
            </span>
          </div>

          {/* Direita — volume + ações */}
          <div className="flex shrink-0 items-center gap-3 md:gap-4">
            <div className="hidden items-center gap-2 md:flex">
              <button
                onClick={onToggleMute}
                aria-label={volume === 0 ? t('unmute') : t('mute')}
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
                onChange={onVolume}
                aria-label={t('volume')}
                className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-line"
                style={{
                  accentColor: '#fff',
                  background: `linear-gradient(to right, #fff ${volume * 100}%, var(--color-line) ${volume * 100}%)`,
                }}
              />
            </div>

            {/* Separador entre volume e ações */}
            <span className="hidden h-5 w-px bg-line md:block" aria-hidden="true" />

            {/* Ações independentes: ⌄ sempre encolhe, ✕ sempre fecha e interrompe. */}
            <div className="flex items-center gap-1">
              <button
                onClick={onMinimize}
                aria-label={t('minimize')}
                className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-line/40 hover:text-fg"
                title={t('minimizeHint')}
              >
                <IconMinimize />
              </button>
              <button
                onClick={onClose}
                aria-label={t('close')}
                className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-line/40 hover:text-fg"
                title={t('closeHint')}
              >
                <IconClose size={10} />
              </button>
            </div>
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
