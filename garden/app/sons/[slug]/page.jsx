import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageShell from '@/components/PageShell'
import PageHead from '@/components/PageHead'
import TrackPlayButton from '@/components/TrackPlayButton'
import { tracks, trackBySlug } from '@/lib/content'
import { hasAudio } from '@/lib/audio.server'

export const dynamicParams = false

export function generateStaticParams() {
  return tracks.map((track) => ({ slug: track.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const track = trackBySlug(slug)
  if (!track) return {}

  const description = track.note || `Letra de ${track.title} — Garden Psychedelia.`

  return {
    title: track.title,
    description,
    alternates: { canonical: `/sons/${track.slug}` },
    openGraph: {
      title: `${track.title} — Garden Psychedelia`,
      description,
      url: `/sons/${track.slug}`,
      images: track.cover ? [track.cover] : undefined,
    },
  }
}

export default async function TrackDetail({ params }) {
  const { slug } = await params
  const track = trackBySlug(slug)
  if (!track) notFound()

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
        <span aria-hidden="true">←</span> Voltar para Sons
      </Link>

      <div className="flex items-start justify-between gap-6">
        <PageHead eyebrow={`03 — Sons / ${track.title}`}>{track.title}</PageHead>
        {playButton && (
          <div className="hidden shrink-0 pt-9 sm:block">{playButton}</div>
        )}
      </div>

      <article className="mb-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        {track.cover && (
          <figure>
            <img
              src={track.cover}
              alt={`Capa de ${track.title}`}
              className="aspect-square w-full object-cover"
            />
            {track.coverCredit && (
              <figcaption className="mt-2.5 font-mono text-xs uppercase tracking-widest text-muted">
                {track.coverCredit}
              </figcaption>
            )}
          </figure>
        )}
        <div className={track.cover ? '' : 'lg:col-span-2'}>
          {meta && <p className="kicker">{meta}</p>}
          {track.note && (
            <p className="my-3 max-w-prose leading-relaxed text-copy">
              {track.note}
            </p>
          )}
          {track.plays && (
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-accent">
              {track.plays} plays
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            {playButton && <span className="sm:hidden">{playButton}</span>}
            {track.spotifyTrackId && (
              <a
                href={`https://open.spotify.com/track/${track.spotifyTrackId}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-fg px-6 py-3 font-mono text-xs font-medium uppercase tracking-widest no-underline transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg"
              >
                Ouvir no Spotify
              </a>
            )}
          </div>
        </div>

      </article>

      {track.lyrics && (
        <section className="border-t border-line pt-8">
          <h2 className="mb-6 font-extrabold tracking-tighter text-3xl md:text-4xl">
            Letra
          </h2>
          <p className="max-w-prose whitespace-pre-line leading-relaxed text-copy">
            {track.lyrics}
          </p>
        </section>
      )}
    </PageShell>
  )
}
