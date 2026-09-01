import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ locale, requestLocale }) => {
  // `locale` chega quando alguém pede explicitamente (getTranslations({locale}));
  // caso contrário vem do segmento [locale] da rota, resolvido pelo Next.
  const requested = locale ?? (await requestLocale)
  const resolved = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  return {
    locale: resolved,
    messages: (await import(`../../messages/${resolved}.json`)).default,
  }
})
