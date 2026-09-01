import { useTranslations } from 'next-intl'
import { PageShell, PageHead } from '@shared/ui'
import { Link } from '@shared/i18n/navigation'

export function NotFoundPage() {
  const t = useTranslations('notFound')

  return (
    <PageShell>
      <PageHead eyebrow={t('eyebrow')}>{t('headline')}</PageHead>
      <Link
        href="/"
        className="inline-block border border-fg px-4 py-3 text-xs uppercase tracking-widest no-underline transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg"
      >
        {t('backHome')}
      </Link>
    </PageShell>
  )
}
