import { siteUrl } from '@shared/lib/site'

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
