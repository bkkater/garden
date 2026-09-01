'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@shared/i18n/navigation'
import { IconPlay, IconPause, IconMaximize, IconClose } from './parts/icons'

// Player minimizado: pílula compacta no canto inferior direito.
export function MiniPill({ track, isPlaying, onPlayPause, onExpand, onClose }) {
  const t = useTranslations('player')
  return (
    <div
      role="region"
      aria-label={t('regionMinimized')}
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
        onClick={onPlayPause}
        aria-label={isPlaying ? t('pause') : t('play')}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-bg transition-transform hover:scale-105 active:scale-95"
      >
        {isPlaying ? <IconPause size={10} /> : <IconPlay size={10} />}
      </button>

      {/* Título da faixa + tipo + link da letra */}
      <Link
        href={`/sons/${track.slug}`}
        className="group flex min-w-0 items-baseline gap-2 no-underline"
        title={track.title}
      >
        <span className="max-w-[130px] truncate font-display font-semibold text-xs text-fg transition-colors group-hover:text-accent sm:max-w-[200px]">
          {track.title}
        </span>
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-widest text-muted">
          {track.type}
        </span>
        <span className="text-[10px] text-muted opacity-0 transition-opacity group-hover:opacity-100">↗</span>
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
        onClick={onExpand}
        aria-label={t('expand')}
        className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors hover:text-fg"
        title={t('expand')}
      >
        <IconMaximize />
        {t('expandShort')}
      </button>

      {/* Fechar */}
      <button
        onClick={onClose}
        aria-label={t('close')}
        className="text-muted transition-colors hover:text-fg"
        title={t('closeHint')}
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
