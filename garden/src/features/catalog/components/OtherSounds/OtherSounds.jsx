import Link from 'next/link'
import { Section, Pill } from '@shared/ui'
import { tracks, ep1, demos } from '../../data'
import { hasAudio } from '../../lib/hasAudio.server'

// Bloco "Ver outros sons" no fim da página de uma faixa. Agrupa as demais
// faixas por origem (Spotify > EP 1 > estúdio); cada uma aparece num grupo só.
export function OtherSounds({ currentSlug }) {
  const notThis = (t) => t.slug !== currentSlug
  const onSpotify = tracks.filter((t) => notThis(t) && t.spotifyTrackId)
  const spotifySlugs = new Set(onSpotify.map((t) => t.slug))
  const inEp1 = ep1.filter(
    (t) => notThis(t) && !spotifySlugs.has(t.slug) && hasAudio(t),
  )
  const inStudio = demos.filter(
    (t) => notThis(t) && !spotifySlugs.has(t.slug) && hasAudio(t),
  )

  const groups = [
    { key: 'spotify', title: 'No Spotify', hint: 'Ouvir na íntegra', glyph: 'dot', badge: 'Novo lançamento', featuredOnly: true, items: onSpotify },
    { key: 'ep1', title: 'EP 1', hint: 'Prévia disponível', glyph: 'ring', badge: 'Inédito', items: inEp1 },
    { key: 'studio', title: 'No estúdio', hint: 'Sem mixagem final', glyph: 'dashed', badge: 'Demo', items: inStudio },
  ].filter((g) => g.items.length > 0)

  if (groups.length === 0) return null

  const total = groups.reduce((n, g) => n + g.items.length, 0)

  return (
    <Section as="section" className="mt-20 border-t border-line pt-8">
      <Section.Header
        className="mb-10"
        count={`${total} ${total === 1 ? 'faixa' : 'faixas'} · ${
          groups.length
        } ${groups.length === 1 ? 'origem' : 'origens'}`}
      >
        Ver outros sons
      </Section.Header>

      <div className="space-y-12">
        {groups.map((g) => (
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

                    {g.featuredOnly
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
  )
}
