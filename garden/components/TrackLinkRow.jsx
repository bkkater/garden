import Link from 'next/link'

// Linha de faixa sem prévia: só o link para a página da letra.
export default function TrackLinkRow({ track, number, label }) {
  return (
    <li className="border-t border-line">
      <Link
        href={`/sons/${track.slug}`}
        className="group flex items-center gap-4 py-5 no-underline"
      >
        {number && (
          <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted/60">
            {number}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-display font-semibold leading-tight text-xl tracking-tight text-fg transition-colors group-hover:text-accent">
            {track.title}
          </p>
          {label && (
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted">
              {label}
            </p>
          )}
        </div>
      </Link>
    </li>
  )
}
