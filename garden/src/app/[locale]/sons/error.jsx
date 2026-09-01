'use client'

import { useTranslations } from 'next-intl'
import { PageShell, PageHead } from '@shared/ui'

// Fronteira de erro da lista de sons.
export default function SonsError({ reset }) {
  const t = useTranslations()

  return (
    <PageShell>
      <PageHead eyebrow={t('music.eyebrow')}>{t('error.listTitle')}</PageHead>
      <p className="mb-8 max-w-prose leading-relaxed text-copy">
        {t('error.listBody')}
      </p>
      <button
        type="button"
        onClick={reset}
        className="inline-block border border-fg px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg"
      >
        {t('error.retry')}
      </button>
    </PageShell>
  )
}
