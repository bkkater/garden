import { getTranslations } from 'next-intl/server'
import { LiveGallery, agenda, events, posters, galleryByEvent } from '@features/live'
import { band, AGENDA_YEAR } from '@shared/lib/site'
import { PageHead, PageShell } from '@shared/ui'
import { pageMetadata } from '@shared/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return pageMetadata({
    locale,
    href: '/shows',
    namespace: 'shows.meta',
    values: { year: AGENDA_YEAR },
  })
}

export default async function AoVivo() {
  const t = await getTranslations('shows')
  const groups = galleryByEvent()

  return (
    <PageShell>
      <PageHead eyebrow={t('eyebrow')}>{t('headline')}</PageHead>

      {/* Agenda — o que está por vir */}
      <section className="mb-20 max-w-prose border-t border-line pt-8">
        <h2 className="font-extrabold tracking-tighter text-3xl md:text-4xl">
          {t('agendaTitle', { year: agenda.year })}
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-copy">
          {t('status', { year: agenda.year })} {t('detail')}
        </p>
        <a
          href={`mailto:${band.email}`}
          className="mt-6 inline-block rounded-full border border-fg px-5 py-3 font-mono text-xs uppercase tracking-widest no-underline transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg"
        >
          {t('callGarden')}
        </a>
      </section>

      {/* Nossos eventos — as Weird Parties */}
      <section className="mb-20 border-t border-line pt-8">
        <h2 className="font-extrabold tracking-tighter text-3xl md:text-4xl">
          {t('ourEvents')}
        </h2>
        <p className="mt-3 mb-12 max-w-prose text-lg leading-relaxed text-copy">
          {t('ourEventsBody')}
        </p>

        <h3 className="kicker">{t('posters')}</h3>
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {posters.map((poster) => (
            <figure key={poster.src} className="reveal">
              <img
                src={poster.src}
                alt={poster.title}
                className="aspect-square w-full object-cover [filter:contrast(1.08)]"
              />
              <figcaption className="mt-2.5 font-mono text-xs uppercase tracking-widest text-muted">
                {poster.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Já rolou — retrospectiva */}
      <section className="border-t border-line pt-8">
        <h2 className="font-extrabold tracking-tighter text-3xl md:text-4xl">
          {t('alreadyHappened')}
        </h2>
        <p className="mt-3 mb-12 max-w-prose text-lg leading-relaxed text-copy">
          {t('alreadyHappenedBody')}
        </p>

        <h3 className="kicker">{t('showsAndParties')}</h3>
        <ul className="mt-4 mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {events.map((event) => (
            <li key={event.id} className="border-t border-line pt-4">
              <h4 className="mb-2 text-2xl tracking-tight">{event.title}</h4>
              <span className="block leading-relaxed text-copy">
                {t(`events.${event.id}`)}
              </span>
            </li>
          ))}
        </ul>

        <h3 className="kicker mb-6">{t('photosByNight')}</h3>
        <LiveGallery groups={groups} headingLevel="h4" />
      </section>
    </PageShell>
  )
}
