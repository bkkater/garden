import { getTranslations } from 'next-intl/server'
import { Section, Pill } from '@shared/ui'
import { Link } from '@shared/i18n/navigation'
import { tracks, ep1, demos } from '../../data'
import { hasAudio } from '../../lib/hasAudio.server'

// Bloco "Ver outros sons" no fim da página de uma faixa. Agrupa as demais
// faixas por origem (Spotify > EP 1 > estúdio); cada uma aparece num grupo só.
export async function OtherSounds({ currentSlug }) {
  const t = await getTranslations('track')
  const tMusic = await getTranslations('music')

  const notThis = (item) => item.slug !== currentSlug
  const onSpotify = tracks.filter((item) => notThis(item) && item.spotifyTrackId)
  const spotifySlugs = new Set(onSpotify.map((item) => item.slug))
  const inEp1 = ep1.filter(
    (item) => notThis(item) && !spotifySlugs.has(item.slug) && hasAudio(item),
  )
  const inStudio = demos.filter(
    (item) => notThis(item) && !spotifySlugs.has(item.slug) && hasAudio(item),
  )

  const groups = [
    { key: 'spotify', title: t('onSpotify'), hint: t('listenFull'), glyph: 'dot', badge: t('newRelease'), tone: 'accent', featuredOnly: true, items: onSpotify },
    { key: 'ep1', title: 'EP 1', hint: t('previewAvailable'), glyph: 'ring', badge: t('unreleased'), items: inEp1 },
    { key: 'studio', title: t('inStudio'), hint: t('noFinalMix'), glyph: 'dashed', badge: 'Demo', items: inStudio },
  ].filter((g) => g.items.length > 0)

  if (groups.length === 0) return null

  const total = groups.reduce((n, g) => n + g.items.length, 0)

  return (
    <Section as="section" className="mt-20 border-t border-line pt-8">
      <Section.Header
        className="mb-10"
        count={`${tMusic('tracksCount', { count: total })} · ${t('sourcesCount', {
          count: groups.length,
        })}`}
      >
        {t('seeOther')}
      </Section.Header>

      <div className="space-y-12">
        {groups.map((g) => (
          <div key={g.key}>
            <Section.Rule glyph={g.glyph} hint={g.hint}>
              {g.title}
            </Section.Rule>

            <Section.List>
              {g.items.map((item) => (
                <li
                  key={item.slug}
                  className="border-t border-line first:border-t-0 last:border-b"
                >
                  <Link
                    href={`/sons/${item.slug}`}
                    className="group flex items-baseline gap-2.5 py-5 no-underline"
                  >
                    <span className="truncate font-display font-semibold leading-tight text-lg tracking-tight text-fg transition-colors group-hover:text-accent">
                      {item.title}
                    </span>

                    {g.featuredOnly ? (
                      item.featured && (
                        <Pill tone="accent" className="shrink-0">
                          {g.badge}
                        </Pill>
                      )
                    ) : (
                      <Pill className="shrink-0">{g.badge}</Pill>
                    )}
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
