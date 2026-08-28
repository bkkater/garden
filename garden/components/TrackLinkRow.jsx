import Link from 'next/link'

// Linha de faixa sem prévia: só o link para a página da letra.
export default function TrackLinkRow({ track }) {
  return (
    <li className="border-t border-line">
      <Link
        href={`/sons/${track.slug}`}
        className="group flex items-center gap-2.5 py-3 font-mono text-xs uppercase tracking-widest text-muted no-underline transition-colors hover:text-accent"
      >
        <span className="underline decoration-line decoration-1 underline-offset-4 group-hover:decoration-accent">
          {track.title}
        </span>
        <span className="sr-only">— ver letra</span>
      </Link>
    </li>
  )
}
