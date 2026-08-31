import { releases } from './releases'
import { ep1 } from './ep1'
import { demos } from './demos'

// Catálogo completo, na ordem de exibição: singles, EP 1, estúdio.
export const tracks = [...releases, ...ep1, ...demos]

export function trackBySlug(slug) {
  return tracks.find((track) => track.slug === slug)
}
