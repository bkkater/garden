import Link from 'next/link'
import { notFound } from 'next/navigation'
import { demos, ep1, tracks, trackBySlug } from '@/lib/content'
import { PageShell, PageHead, Section, Pill } from '@shared/ui'
import { TrackPlayButton } from '@features/player'
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

  // "Ver outros sons": agrupado por origem. Cada faixa aparece em um grupo só,
  // com prioridade Spotify > EP 1 > estúdio.
  const notThis = (t) => t.slug !== track.slug
  const onSpotify = tracks.filter((t) => notThis(t) && t.spotifyTrackId)
  const spotifySlugs = new Set(onSpotify.map((t) => t.slug))
  const inEp1 = ep1.filter(
    (t) => notThis(t) && !spotifySlugs.has(t.slug) && hasAudio(t),
  )
  const inStudio = demos.filter(
    (t) => notThis(t) && !spotifySlugs.has(t.slug) && hasAudio(t),
  )

  const otherGroups = [
    { key: 'spotify', title: 'No Spotify', hint: 'Ouvir na íntegra', glyph: 'dot', badge: 'Novo lançamento', tone: 'accent', items: onSpotify },
    { key: 'ep1', title: 'EP 1', hint: 'Prévia disponível', glyph: 'ring', badge: 'Inédito', items: inEp1 },
    { key: 'studio', title: 'No estúdio', hint: 'Sem mixagem final', glyph: 'dashed', badge: 'Demo', items: inStudio },
  ].filter((g) => g.items.length > 0)

  const totalOthers = otherGroups.reduce((n, g) => n + g.items.length, 0)

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

      <div className="sm:flex sm:items-start sm:justify-between sm:gap-8">
        <div>
          <PageHead eyebrow={`03 — Sons / ${track.title}`}>{track.title}</PageHead>
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

      {otherGroups.length > 0 && (
        <Section as="section" className="mt-20 border-t border-line pt-8">
          <Section.Header
            className="mb-10"
            count={`${totalOthers} ${totalOthers === 1 ? 'faixa' : 'faixas'} · ${
              otherGroups.length
            } ${otherGroups.length === 1 ? 'origem' : 'origens'}`}
          >
            Ver outros sons
          </Section.Header>

          <div className="space-y-12">
            {otherGroups.map((g) => (
              <div key={g.key}>
                <Section.Rule glyph={g.glyph} hint={g.hint}>
                  {g.title}
                </Section.Rule>

                <Section.List>
                  {g.items.map((t) => (
                    <li
                      key={t.slug}
                      className="border-t border-line first:border-t-0 last:border-b"
                    >
                      <Link
                        href={`/sons/${t.slug}`}
                        className="group flex items-baseline gap-2.5 py-5 no-underline"
                      >
                        <span className="truncate font-display font-semibold leading-tight text-lg tracking-tight text-fg transition-colors group-hover:text-accent">
                          {t.title}
                        </span>

                        {g.key === 'spotify'
                          ? t.featured && (
                              <Pill tone="accent" className="shrink-0">
                                {g.badge}
                              </Pill>
                            )
                          : <Pill className="shrink-0">{g.badge}</Pill>}
                      </Link>
                    </li>
                  ))}
                </Section.List>
              </div>
            ))}
          </div>
        </Section>
      )}
    </PageShell>
  )
}
