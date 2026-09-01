'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@shared/i18n/navigation'
import { band } from '@shared/lib/site'
import { SocialLinks } from '@shared/ui/SocialLinks'

// Rodapé persistente — contato acessível de qualquer página.
export function Footer() {
  const t = useTranslations('common')

  return (
    <footer className="relative z-[2] border-t border-line bg-bg px-4 py-12 lg:px-8">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-widest no-underline transition-colors duration-200 hover:text-accent"
          >
            Garden Psychedelia
          </Link>
          <a
            href={`mailto:${band.email}`}
            className="mt-3 block break-words text-base no-underline transition-colors duration-200 hover:text-accent"
          >
            {band.email}
          </a>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted">
            {band.city} — {band.state} · {t('sinceYear', { year: band.since })}
          </p>
        </div>

        <SocialLinks variant="row" className="-mx-2" />
      </div>
    </footer>
  )
}
