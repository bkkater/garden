import { cn } from '@shared/lib/cn'

// Badge em cápsula usado em toda a lista de faixas: "Inédito", "Demo",
// "Novo lançamento". `tone`:
//   - 'neutral' (padrão): filete e texto discretos
//   - 'accent': filete e texto na cor da marca
const tones = {
  neutral: 'border-line text-muted',
  accent: 'border-accent text-accent',
}

export function Pill({ tone = 'neutral', className, children }) {
  return (
    <span
      className={cn(
        'rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-widest',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
