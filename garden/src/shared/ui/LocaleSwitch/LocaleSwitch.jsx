'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@shared/i18n/navigation'
import { routing } from '@shared/i18n/routing'

// Cada idioma é um link de verdade para a rota atual. O href sai sempre com
// prefixo (/pt/... ou /en/...), então o proxy atualiza o cookie NEXT_LOCALE e
// redireciona para a URL canônica. Funciona em qualquer página e sem JS.
export function LocaleSwitch({ className = '', onNavigate }) {
  const locale = useLocale()
  const pathname = usePathname()
  const t = useTranslations('locale')

  return (
    <nav
      aria-label={t('label')}
      className={`flex items-center gap-2 font-mono text-xs uppercase tracking-widest ${className}`}
    >
      {routing.locales.map((item, i) => {
        const active = item === locale
        return (
          <span key={item} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-muted/50">
                ·
              </span>
            )}
            <Link
              href={pathname}
              locale={item}
              hrefLang={item}
              onClick={onNavigate}
              aria-current={active ? 'true' : undefined}
              className={`uppercase no-underline transition-colors duration-200 ${
                active ? 'text-accent' : 'text-muted hover:text-fg'
              }`}
            >
              <span className="sr-only">
                {t('switchTo', { language: t(item) })}
              </span>
              <span aria-hidden="true">{item}</span>
            </Link>
          </span>
        )
      })}
    </nav>
  )
}
