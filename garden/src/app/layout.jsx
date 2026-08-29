import { IBM_Plex_Mono, Syne } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ACTIVE_THEME } from '@/lib/theme'
import { siteUrl } from '@/lib/site'
import SiteChrome from '@/components/SiteChrome'
import './globals.css'

// Duas famílias, self-hosted via next/font:
//   Syne          — títulos, marca, corpo
//   IBM Plex Mono — rótulos, eyebrows, legendas (uppercase + tracking)
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

const description =
  'Garden Psychedelia — banda de psicodelia de Campos dos Goytacazes (RJ), ativa desde 2019. Discos, registros ao vivo e contato.'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Garden Psychedelia',
    template: '%s — Garden Psychedelia',
  },
  description,
  keywords: [
    'Garden Psychedelia',
    'psicodelia',
    'rock',
    'Campos dos Goytacazes',
    'banda',
    'Weird Party',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Garden Psychedelia',
    locale: 'pt_BR',
    url: siteUrl,
    title: 'Garden Psychedelia',
    description,
    images: [{ url: '/covers/dbawot.jpg', width: 1200, height: 1200, alt: 'Garden Psychedelia' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Garden Psychedelia',
    description,
    images: ['/covers/dbawot.jpg'],
  },
  icons: { icon: '/favicon.svg' },
}
export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      data-theme={ACTIVE_THEME}
      className={`${syne.variable} ${plexMono.variable}`}
    >
      <body>
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
