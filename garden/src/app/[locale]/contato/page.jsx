import { getTranslations } from 'next-intl/server'
import { band, logo, AGENDA_YEAR } from '@shared/lib/site'
import { PageShell, PageHead, SocialLinks } from '@shared/ui'
import { pageMetadata } from '@shared/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return pageMetadata({
    locale,
    href: '/contato',
    namespace: 'contact.meta',
    values: { year: AGENDA_YEAR },
  })
}

export default async function Contato() {
  const t = await getTranslations('contact')
  const tCommon = await getTranslations('common')
  const tMedia = await getTranslations('media')

  return (
    <PageShell>
      <PageHead eyebrow={t('eyebrow')}>
        {t('headline', { year: AGENDA_YEAR })}
      </PageHead>

      <a
        href={`mailto:${band.email}`}
        className="mb-14 block break-words font-extrabold tracking-tighter no-underline text-3xl sm:text-4xl lg:text-5xl transition-colors duration-200 hover:text-accent"
      >
        {band.email}
      </a>

      <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-16">
        <div className="md:flex-1">
          <p className="max-w-prose leading-relaxed text-copy">{t('body')}</p>
          <SocialLinks className="mt-7 max-w-md" />
        </div>

        <figure className="flex w-44 shrink-0 flex-col items-center text-center">
          <img
            src={logo.badge}
            alt={tMedia('badgeAlt')}
            width={176}
            height={176}
            className="size-44 rounded-full object-cover"
          />
          <figcaption className="mt-3 font-mono text-xs uppercase leading-relaxed tracking-widest text-muted">
            {band.city} — {band.state} ·{' '}
            {tCommon('sinceYear', { year: band.since })}
          </figcaption>
        </figure>
      </div>
    </PageShell>
  )
}
