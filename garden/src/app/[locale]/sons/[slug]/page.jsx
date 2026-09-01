import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { PageShell, PageHead } from '@shared/ui'
import { Link } from '@shared/i18n/navigation'
import { TrackPlayButton } from '@features/player'
import { tracks, trackBySlug, hasAudio, OtherSounds } from '@features/catalog'
import { alternatesFor } from '@shared/lib/seo'
import { ogLocale } from '@shared/i18n/routing'

export const dynamicParams = false

export function generateStaticParams() {
  return tracks.map((track) => ({ slug: track.slug }))
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params
  const track = trackBySlug(slug)
  if (!track) return {}

  const t = await getTranslations({ locale, namespace: 'track' })
  const tTracks = await getTranslations({ locale, namespace: 'tracks' })
  const description = tTracks.has(`${slug}.note`)
    ? tTracks(`${slug}.note`)
    : t('metaDescription', { title: track.title })

  const alternates = alternatesFor(`/sons/${track.slug}`, locale)

  return {
    title: track.title,
    description,
    alternates,
    openGraph: {
      title: `${track.title} — Garden Psychedelia`,
      description,
      url: alternates.canonical,
      locale: ogLocale[locale],
      images: track.cover ? [track.cover] : undefined,
    },
  }
}

export default async function TrackDetail({ params }) {
  const { slug } = await params
  const track = trackBySlug(slug)
  if (!track) notFound()

  const t = await getTranslations('track')
  const tTracks = await getTranslations('tracks')
  const tMusic = await getTranslations('music')
  const tCommon = await getTranslations('common')

  const meta = [track.year, track.type].filter(Boolean).join(' · ')

  const playButton = hasAudio(track) ? (
    <TrackPlayButton
      track={{
        slug: track.slug,
        title: track.title,
        type: track.type,
        audio: track.audio,
      }}
    />
  ) : null

  return (
    <PageShell>
      <Link
        href="/sons"
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted no-underline transition-colors duration-200 hover:text-accent"
      >
        <span aria-hidden="true">←</span> {t('backToMusic')}
      </Link>

      <div className="sm:flex sm:items-start sm:justify-between sm:gap-8">
        <div>
          <PageHead eyebrow={`03 — ${tMusic('meta.title')} / ${track.title}`}>
            {track.title}
          </PageHead>
          {meta && <p className="kicker -mt-6 mb-6 sm:mb-0">{meta}</p>}
        </div>
        {playButton && (
          <div className="mb-14 flex sm:mb-0 sm:shrink-0 sm:pt-8">{playButton}</div>
        )}
      </div>

      <div className="hidden sm:block sm:h-14" aria-hidden="true" />

      <article className="mb-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        {track.cover && (
          <figure>
            <img
              src={track.cover}
              alt={tCommon('coverOf', { title: track.title })}
              className="aspect-square w-full object-cover"
            />
            {tTracks.has(`${track.slug}.coverCredit`) && (
              <figcaption className="mt-2.5 font-mono text-xs uppercase tracking-widest text-muted">
                {tTracks(`${track.slug}.coverCredit`)}
              </figcaption>
            )}
          </figure>
        )}
        <div className={track.cover ? '' : 'lg:col-span-2'}>
          {tTracks.has(`${track.slug}.note`) && (
            <p className="my-3 max-w-prose leading-relaxed text-copy">
              {tTracks(`${track.slug}.note`)}
            </p>
          )}
          {track.plays && (
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-accent">
              {tCommon('plays', { count: track.plays })}
            </p>
          )}
          {track.spotifyTrackId && (
            <a
              href={`https://open.spotify.com/track/${track.spotifyTrackId}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-fg px-6 py-3 font-mono text-xs font-medium uppercase tracking-widest no-underline transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg"
            >
              {t('listenSpotify')}
            </a>
          )}
        </div>
      </article>

      {track.lyrics && (
        <section className="border-t border-line pt-8">
          <h2 className="mb-6 font-extrabold tracking-tighter text-3xl md:text-4xl">
            {t('lyrics')}
          </h2>
          <p className="max-w-prose whitespace-pre-line leading-relaxed text-copy">
            {track.lyrics}
          </p>
        </section>
      )}

      <OtherSounds currentSlug={track.slug} />
    </PageShell>
  )
}
