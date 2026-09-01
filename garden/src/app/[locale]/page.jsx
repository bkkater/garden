import { getTranslations } from 'next-intl/server'
import { band, AGENDA_YEAR, siteUrl } from '@shared/lib/site'
import { Link } from '@shared/i18n/navigation'
import { SectionPreview } from '@app/_components/SectionPreview'
import { homeSections } from '@app/_data/home'

// O canonical, o hreflang e a descrição da home vêm do layout de [locale].

export default async function Home() {
  const t = await getTranslations('home')
  const tCommon = await getTranslations('common')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: band.name,
    foundingDate: String(band.since),
    foundingLocation: {
      '@type': 'Place',
      name: `${band.city}, ${band.state}, ${tCommon('country')}`,
    },
    genre: 'Psychedelic rock',
    email: band.email,
    url: siteUrl,
    sameAs: [band.instagram, band.youtube, band.tiktok, band.spotify],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — sobre o shader */}
      <section className="flex min-h-dvh flex-col justify-between px-4 pt-28 pb-12 lg:px-8">
        <p className="kicker">
          {band.city}, {band.state} · {tCommon('sinceYear', { year: band.since })}
        </p>

        <div>
          <p className="kicker mb-3 text-fg">
            {t('agendaOpen', { year: AGENDA_YEAR })}
          </p>
          <h1 className="font-extrabold leading-none tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-8xl">
            Garden
            <span className="block text-accent mix-blend-screen">Psychedelia</span>
          </h1>
          <p className="mt-4 max-w-[34ch] text-lg text-muted">{t('intro')}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={band.spotify}
            target="_blank"
            rel="noreferrer"
            className="inline-block border border-fg px-5 py-3 font-mono text-xs uppercase tracking-widest no-underline transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg"
          >
            {t('listenSpotify')}
          </a>
          <Link
            href="/shows"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted no-underline transition-colors duration-200 hover:text-accent"
          >
            {t('seeAgenda')} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* Vitrine — prévia de cada seção, sobre fundo sólido */}
      <section className="relative z-[2] bg-bg px-4 pb-28 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-transparent to-bg"
        />
        {homeSections.map((section, i) => (
          <SectionPreview
            key={section.to}
            to={section.to}
            index={section.index}
            image={section.image}
            label={t(`sections.${section.key}.label`)}
            cta={t(`sections.${section.key}.cta`)}
            teaser={t(`sections.${section.key}.teaser`)}
            flip={i % 2 === 1}
          />
        ))}
      </section>
    </>
  )
}
