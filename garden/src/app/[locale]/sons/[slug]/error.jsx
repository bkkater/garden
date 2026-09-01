'use client'

import { useTranslations } from 'next-intl'
import { PageShell, PageHead } from '@shared/ui'
import { Link } from '@shared/i18n/navigation'

// Fronteira de erro da página de uma faixa.
export default function TrackError({ reset }) {
  const t = useTranslations()

  return (
    <PageShell>
      <PageHead eyebrow={t('music.eyebrow')}>{t('error.trackTitle')}</PageHead>
      <p className="mb-8 max-w-prose leading-relaxed text-copy">
        {t('error.trackBody')}
      </p>
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={reset}
          className="inline-block border border-fg px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg"
        >
          {t('error.retry')}
        </button>
        <Link
          href="/sons"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted no-underline transition-colors duration-200 hover:text-accent"
        >
          <span aria-hidden="true">←</span> {t('track.backToMusic')}
        </Link>
      </div>
    </PageShell>
  )
}
