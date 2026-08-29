'use client'

import Link from 'next/link'
import { PageShell, PageHead } from '@shared/ui'

// Fronteira de erro da página de uma faixa.
export default function TrackError({ reset }) {
  return (
    <PageShell>
      <PageHead eyebrow="03 — Sons">Essa faixa não quis tocar.</PageHead>
      <p className="mb-8 max-w-prose leading-relaxed text-copy">
        Algo falhou ao carregar esta página.
      </p>
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={reset}
          className="inline-block border border-fg px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg"
        >
          Tentar de novo
        </button>
        <Link
          href="/sons"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted no-underline transition-colors duration-200 hover:text-accent"
        >
          <span aria-hidden="true">←</span> Voltar para Sons
        </Link>
      </div>
    </PageShell>
  )
}
