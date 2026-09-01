import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { siteUrl } from '@shared/lib/site'
import { alternatesFor } from '@shared/lib/seo'
import { ogLocale, routing } from '@shared/i18n/routing'
import { SiteDocument } from '@app/_components/SiteDocument'

// O documento inteiro fica dentro de [locale] para que trocar de idioma
// recrie a árvore — navegação, rodapé e player incluídos.

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const description = t('description')

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: 'Garden Psychedelia',
      template: '%s — Garden Psychedelia',
    },
    description,
    keywords: t.raw('keywords'),
    alternates: alternatesFor('/', locale),
    openGraph: {
      type: 'website',
      siteName: 'Garden Psychedelia',
      locale: ogLocale[locale],
      alternateLocale: routing.locales
        .filter((item) => item !== locale)
        .map((item) => ogLocale[item]),
      url: siteUrl,
      title: 'Garden Psychedelia',
      description,
      images: [
        {
          url: '/covers/dbawot.jpg',
          width: 1200,
          height: 1200,
          alt: 'Garden Psychedelia',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Garden Psychedelia',
      description,
      images: ['/covers/dbawot.jpg'],
    },
    icons: { icon: '/favicon.svg' },
  }
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  const messages = await getMessages({ locale })

  return (
    <SiteDocument locale={locale} messages={messages}>
      {children}
    </SiteDocument>
  )
}
