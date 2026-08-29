// Separador de grupo: glifo + rótulo + régua + dica opcional.
// glyph: 'dot' (vermelho cheio) | 'ring' (anel vazado) | 'dashed' (anel tracejado)
export default function GroupHeader({ glyph = 'ring', label, hint }) {
  return (
    <div className="mb-2 flex items-center gap-3">
      <span
        aria-hidden="true"
        className={[
          'h-2 w-2 shrink-0 rounded-full',
          glyph === 'dot'
            ? 'bg-accent'
            : glyph === 'dashed'
              ? 'border border-dashed border-muted'
              : 'border border-muted',
        ].join(' ')}
      />
      <span
        className={`shrink-0 font-mono text-[10px] uppercase tracking-widest ${
          glyph === 'dot' ? 'text-accent' : 'text-muted'
        }`}
      >
        {label}
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
