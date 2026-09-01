import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Junta classes condicionais e resolve conflitos do Tailwind
// (ex.: cn('px-2', cond && 'px-4') -> 'px-4').
// Substitui os [...].join(' ') espalhados pelos componentes.
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
