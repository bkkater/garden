'use client'

import { createPortal } from 'react-dom'

// Renderiza os filhos direto no <body>, fora da árvore da página.
//
// Obrigatório para qualquer overlay `position: fixed` disparado de dentro de
// uma página: o wrapper do PageShell tem `animate-rise`, que deixa um
// `transform` no elemento. Um ancestral com `transform` vira o containing block
// do `fixed`, então `inset-0` passa a medir a página inteira em vez da viewport
// (era isso que fazia a foto ampliada abrir fora da tela).
export function Portal({ children }) {
  if (typeof document === 'undefined') return null
  return createPortal(children, document.body)
}
