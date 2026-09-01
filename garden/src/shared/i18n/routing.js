import { defineRouting } from 'next-intl/routing'

// pt fica na raiz (/banda), en ganha prefixo (/en/banda).
// Prioridade do idioma: prefixo na URL > cookie NEXT_LOCALE (escolha anterior)
// > Accept-Language do aparelho > defaultLocale.
export const routing = defineRouting({
  locales: ['pt', 'en'],
  defaultLocale: 'pt',
  localePrefix: 'as-needed',
  localeDetection: true,
})

export const htmlLang = { pt: 'pt-BR', en: 'en' }
export const ogLocale = { pt: 'pt_BR', en: 'en_US' }
export const hreflang = { pt: 'pt-BR', en: 'en' }
