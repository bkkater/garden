import { cn } from '@shared/lib/cn'

// Bloco de página com cabeçalho (título + contagem) e, opcionalmente, um
// separador de grupo antes da lista. Substitui o par repetido
// "div flex + h2 + span" / GroupHeader / <ul> que aparecia solto em /sons e
// /sons/[slug].
//
//   <Section as="aside" className="mt-20 border-t border-line pt-8">
//     <Section.Header count="4 faixas · 2026" variant="plain">EP 1</Section.Header>
//     <p>…</p>
//     <Section.Rule glyph="ring">Em produção</Section.Rule>
//     <Section.List>{…}</Section.List>
//   </Section>

export function Section({ as: Tag = 'section', className, children }) {
  return <Tag className={className}>{children}</Tag>
}

// variant: 'display' (padrão, extrabold + tracking-tighter — o h2 do site)
//          'plain'   (peso normal + tracking-tight)
function Header({ count, variant = 'display', className, children }) {
  return (
    <div
      className={cn(
        'mb-2.5 flex items-baseline justify-between gap-4',
        className,
      )}
    >
      <h2
        className={cn(
          'text-3xl md:text-4xl',
          variant === 'plain'
            ? 'tracking-tight'
            : 'font-extrabold tracking-tighter',
        )}
      >
        {children}
      </h2>
      {count != null && (
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted">
          {count}
        </span>
      )}
    </div>
  )
}

// Separador de grupo: glifo + rótulo + régua + dica opcional (ex-GroupHeader).
// glyph: 'dot' (vermelho cheio) | 'ring' (anel) | 'dashed' (anel tracejado)
const glyphClass = {
  dot: 'bg-accent',
  ring: 'border border-muted',
  dashed: 'border border-dashed border-muted',
}

function Rule({ glyph = 'ring', hint, className, children }) {
  return (
    <div className={cn('mb-2 flex items-center gap-3', className)}>
      <span
        aria-hidden="true"
        className={cn('h-2 w-2 shrink-0 rounded-full', glyphClass[glyph])}
      />
      <span
        className={cn(
          'shrink-0 font-mono text-[10px] uppercase tracking-widest',
          glyph === 'dot' ? 'text-accent' : 'text-muted',
        )}
      >
        {children}
      </span>
      <span className="h-px flex-1 bg-line" aria-hidden="true" />
      {hint && (
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted">
          {hint}
        </span>
      )}
    </div>
  )
}

function List({ className, children }) {
  return <ul className={className}>{children}</ul>
}

Section.Header = Header
Section.Rule = Rule
Section.List = List
