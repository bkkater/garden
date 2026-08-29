'use client'

import { PageShell, PageHead } from '@shared/ui'

// Fronteira de erro da lista de sons — se algo quebrar na renderização,
// mostra um aviso com opção de tentar de novo em vez da tela do Next.
export default function SonsError({ reset }) {
  return (
    <PageShell>
      <PageHead eyebrow="03 — Sons">Algo saiu do tom.</PageHead>
      <p className="mb-8 max-w-prose leading-relaxed text-copy">
        Não foi possível carregar os sons agora. Tente de novo em instantes.
      </p>
      <button
        type="button"
        onClick={reset}
        className="inline-block border border-fg px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg"
      >
        Tentar de novo
      </button>
    </PageShell>
  )
}
