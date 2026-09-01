import { Link } from '@shared/i18n/navigation'
import { cn } from '@shared/lib/cn'

// Linha de faixa da lista de /sons — layout único para as variações com e sem
// prévia. A página monta as partes que quer:
//
//   <TrackRow href="/sons/eter">
//     <TrackRow.Number>01</TrackRow.Number>
//     <TrackRow.Body>
//       <TrackRow.Title>Éter</TrackRow.Title>
//       <TrackRow.Caption>Inédita</TrackRow.Caption>
//     </TrackRow.Body>
//   </TrackRow>
//
// Sem `href` a linha não é um link (útil quando a ação vive num botão).
export function TrackRow({ href, active = false, className, children }) {
  const inner = cn(
    'flex items-center gap-4 py-5',
    href && 'group no-underline',
    className,
  )
  return (
    <li
      className={cn(
        'relative border-t border-line first:border-t-0',
        active && 'bg-accent/[0.07]',
      )}
    >
      {href ? (
        <Link href={href} className={inner}>
          {children}
        </Link>
      ) : (
        <div className={inner}>{children}</div>
      )}
    </li>
  )
}

function Number({ active = false, children }) {
  return (
    <span
      className={cn(
        'shrink-0 font-mono text-[10px] tabular-nums',
        active ? 'text-accent/70' : 'text-muted/60',
      )}
    >
      {children}
    </span>
  )
}

function Body({ children }) {
  return <div className="min-w-0 flex-1">{children}</div>
}

function Title({ accent = false, children }) {
  return (
    <p
      className={cn(
        'truncate font-display font-semibold leading-tight text-xl tracking-tight transition-colors group-hover:text-accent',
        accent ? 'text-accent' : 'text-fg',
      )}
    >
      {children}
    </p>
  )
}

function Caption({ children }) {
  return (
    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted">
      {children}
    </p>
  )
}

TrackRow.Number = Number
TrackRow.Body = Body
TrackRow.Title = Title
TrackRow.Caption = Caption
