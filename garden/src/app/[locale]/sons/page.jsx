import { getTranslations } from 'next-intl/server'
import { band } from '@shared/lib/site'
import { Link } from '@shared/i18n/navigation'
import { PageShell, PageHead, Section, Pill } from '@shared/ui'
import { TrackPreview } from '@features/player'
import {
  demos,
  ep1,
  releases,
  ep1Media,
  hasAudio,
  TrackLinkRow,
} from '@features/catalog'
import { pageMetadata } from '@shared/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return pageMetadata({ locale, href: '/sons', namespace: 'music.meta' })
}

export default async function Sons() {
  const t = await getTranslations('music')
  const tTracks = await getTranslations('tracks')
  const tCommon = await getTranslations('common')
  const tMedia = await getTranslations('media')

  const featured = releases.find((item) => item.featured)
  const rest = releases.filter((item) => !item.featured)
  const ep1Alts = tMedia.raw('ep1')

  return (
    <PageShell>
      <PageHead eyebrow={t('eyebrow')}>{t('headline')}</PageHead>

      <div className="mb-16 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-line pt-5">
        <dl className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
          {[
            { value: t('playsValue'), label: t('playsStreaming'), accent: true },
            {
              value: rest.length,
              label: t('singlesReleased'),
              hideOnMobile: true,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`items-baseline gap-2.5 ${
                stat.hideOnMobile ? 'hidden sm:flex' : 'flex'
              }`}
            >
              <dd
                className={`font-extrabold leading-none tracking-tighter text-2xl ${
                  stat.accent ? 'text-accent' : 'text-fg'
                }`}
              >
                {stat.value}
              </dd>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
        <a
          href="#discografia"
          className="ml-auto hidden font-mono text-[10px] uppercase tracking-widest text-muted no-underline transition-colors hover:text-accent sm:block"
        >
          {t('seeDiscography')} <span aria-hidden="true">↓</span>
        </a>
      </div>

      <article className="mb-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <figure>
          <img
            src={featured.cover}
            alt={tCommon('coverOf', { title: featured.title })}
            className="aspect-square w-full object-cover"
          />
          {tTracks.has(`${featured.slug}.coverCredit`) && (
            <figcaption className="mt-2.5 font-mono text-xs uppercase tracking-widest text-muted">
              {tTracks(`${featured.slug}.coverCredit`)}
            </figcaption>
          )}
        </figure>
        <div>
          <p className="kicker">
            {featured.year} · {featured.type}
          </p>
          <div className="my-3 flex flex-wrap items-center gap-x-4 gap-y-3">
            <h2 className="font-extrabold leading-none tracking-tighter text-5xl md:text-6xl lg:text-7xl">
              {featured.title}
            </h2>
            <Pill tone="accent">{t('newRelease')}</Pill>
          </div>
          {tTracks.has(`${featured.slug}.note`) && (
            <p className="max-w-prose leading-relaxed text-copy">
              {tTracks(`${featured.slug}.note`)}
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={band.spotify}
              target="_blank"
              rel="noreferrer"
              className="inline-block border border-fg px-4 py-3 text-xs uppercase tracking-widest no-underline transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg"
            >
              {t('listenSpotify')}
            </a>
            <Link
              href={`/sons/${featured.slug}`}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted no-underline transition-colors duration-200 hover:text-accent"
            >
              {t('seeMore')} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </article>

      <div id="discografia" className="scroll-mt-24">
        {rest.map((item) => (
          <article
            key={item.title}
            className="reveal flex gap-6 border-t border-line py-5"
          >
            <img
              src={item.cover}
              alt=""
              className="h-20 w-28 shrink-0 object-cover [filter:grayscale(0.3)_contrast(1.15)]"
            />
            <div>
              <h3 className="text-3xl tracking-tight">{item.title}</h3>
              <p className="my-1.5 font-mono text-xs uppercase tracking-widest text-muted">
                {item.year} · {item.type} ·{' '}
                {tCommon('plays', { count: item.plays })}
              </p>
              {tTracks.has(`${item.slug}.note`) && (
                <span className="block max-w-prose leading-relaxed text-copy">
                  {tTracks(`${item.slug}.note`)}
                </span>
              )}
              <Link
                href={`/sons/${item.slug}`}
                className="mt-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted no-underline transition-colors duration-200 hover:text-accent"
              >
                {t('seeMore')} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <Section as="section" className="mt-20 border-t border-line pt-8">
        <Section.Header
          count={t('tracksYear', { count: ep1.length, year: 2026 })}
          variant="plain"
        >
          EP 1
        </Section.Header>
        <p className="mb-8 max-w-prose leading-relaxed text-copy">
          {t('ep1Blurb')}
        </p>

        <Section.Rule glyph="ring">{t('inProduction')}</Section.Rule>
        <Section.List>
          {[...ep1]
            .sort((a, b) => (a.n || '').localeCompare(b.n || ''))
            .map((track) =>
              hasAudio(track) ? (
                <TrackPreview
                  key={track.slug}
                  track={track}
                  number={track.n}
                  label={t('unreleased')}
                />
              ) : (
                <TrackLinkRow key={track.slug} track={track} number={track.n} />
              ),
            )}
        </Section.List>

        <h3 className="kicker mt-12">{t('aestheticPreview')}</h3>
        <p className="mt-3 max-w-prose leading-relaxed text-copy">
          {t('aestheticBody')}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ep1Media.map((shot, i) => (
            <img
              key={shot.src}
              src={shot.src}
              alt={ep1Alts[i] ?? ''}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover [filter:contrast(1.05)_saturate(0.95)]"
            />
          ))}
        </div>
        <p className="mt-2.5 font-mono text-xs uppercase tracking-widest text-muted">
          {t('photosBy')}
        </p>
      </Section>

      <Section as="aside" className="mt-20 border-t border-line pt-8">
        <Section.Header
          count={t('tracksCount', { count: demos.length })}
          variant="plain"
        >
          {t('inStudio')}
        </Section.Header>
        <p className="mb-8 max-w-prose leading-relaxed text-copy">
          {t('studioBlurb')}
        </p>

        <Section.Rule glyph="dashed">{t('inProgress')}</Section.Rule>
        <Section.List>
          {[...demos]
            // As que dá pra ouvir vêm primeiro.
            .sort((a, b) => Number(hasAudio(b)) - Number(hasAudio(a)))
            .map((demo) =>
              hasAudio(demo) ? (
                <TrackPreview key={demo.slug} track={demo} />
              ) : (
                <TrackLinkRow key={demo.slug} track={demo} />
              ),
            )}
        </Section.List>
      </Section>
    </PageShell>
  )
}
