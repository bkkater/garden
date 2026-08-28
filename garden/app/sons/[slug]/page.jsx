import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageShell from '@/components/PageShell'
import PageHead from '@/components/PageHead'
import TrackPlayer from '@/components/TrackPlayer'
import { band, tracks, trackBySlug } from '@/lib/content'

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

  return (
    <PageShell>
      <Link
        href="/sons"
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted no-underline transition-colors duration-200 hover:text-accent"
      >
        <span aria-hidden="true">←</span> Voltar para Sons
      </Link>
      <PageHead eyebrow={`03 — Sons / ${track.title}`}>{track.title}</PageHead>

      <article className="mb-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        {track.cover && (
          <img
            src={track.cover}
            alt={`Capa de ${track.title}`}
            className="aspect-square w-full object-cover"
          />
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
          {track.spotifyTrackId ? (
            <TrackPlayer
              trackId={track.spotifyTrackId}
              title={track.title}
              fallbackUrl={band.spotify}
            />
          ) : (
            track.type === 'EP 1' && (
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                Prévia em breve.
              </p>
            )
          )}
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
