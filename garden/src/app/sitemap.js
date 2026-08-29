import { tracks } from '@/lib/content'
import { siteUrl } from '@/lib/site'

const routes = [
  '',
  '/banda',
  '/shows',
  '/sons',
  '/contato',
  ...tracks.map((track) => `/sons/${track.slug}`),
]

export default function sitemap() {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))
}
