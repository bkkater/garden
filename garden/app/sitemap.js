import { siteUrl } from '@/lib/site'

const routes = ['', '/banda', '/shows', '/sons', '/contato']

export default function sitemap() {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))
}
