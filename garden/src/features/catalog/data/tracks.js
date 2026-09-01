import { releases } from './releases'
import { ep1 } from './ep1'
import { demos } from './demos'
import { lyricsBySlug } from './lyrics'

// Catálogo completo, na ordem de exibição: singles, EP 1, estúdio.
// A letra de cada faixa vem de data/lyrics/<slug>.js (um arquivo por música).
export const tracks = [...releases, ...ep1, ...demos].map((track) => ({
  ...track,
  lyrics: lyricsBySlug[track.slug],
}))

export function trackBySlug(slug) {
  return tracks.find((track) => track.slug === slug)
}
