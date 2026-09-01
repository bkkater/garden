import { getTranslations } from 'next-intl/server'
import { getPathname } from '@shared/i18n/navigation'
import { hreflang, ogLocale, routing } from '@shared/i18n/routing'

// canonical + hreflang de uma rota interna (ex.: '/banda') nos dois idiomas.
export function alternatesFor(href, locale) {
  const languages = Object.fromEntries(
    routing.locales.map((item) => [
      hreflang[item],
      getPathname({ locale: item, href }),
    ]),
  )

  return {
    canonical: getPathname({ locale, href }),
    languages: {
      ...languages,
      'x-default': getPathname({ locale: routing.defaultLocale, href }),
    },
  }
}

// Metadata de uma página comum: título e descrição vêm do dicionário.
export async function pageMetadata({ locale, href, namespace, values, images }) {
  const t = await getTranslations({ locale, namespace })
  const title = t('title')
  const description = t('description', values)

  return {
    title,
    description,
    alternates: alternatesFor(href, locale),
    openGraph: {
      title: `${title} — Garden Psychedelia`,
      description,
      url: getPathname({ locale, href }),
      locale: ogLocale[locale],
      ...(images ? { images } : {}),
    },
  }
}
