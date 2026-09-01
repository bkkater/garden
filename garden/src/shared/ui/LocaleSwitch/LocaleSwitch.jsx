'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@shared/i18n/navigation'
import { routing } from '@shared/i18n/routing'

function GlobeIcon(props) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
      {...props}
    >
      <circle cx="8" cy="8" r="6.25" />
      <path d="M1.75 8h12.5M8 1.75c1.9 2 2.9 4 2.9 6.25S9.9 12.25 8 14.25c-1.9-2-2.9-4-2.9-6.25S6.1 3.75 8 1.75Z" />
    </svg>
  )
}

function ChevronIcon(props) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      {...props}
    >
      <path d="m4 6 4 4 4-4" />
    </svg>
  )
}

// Menu de idioma: um gatilho em pílula (globo + sigla + seta) que abre a lista
// dos locales. Cada opção é um link de verdade para a rota atual com prefixo
// (/pt/... ou /en/...), então o proxy atualiza o cookie NEXT_LOCALE e redireciona
// para a URL canônica. Funciona em qualquer página.
export function LocaleSwitch({ className = '', onNavigate }) {
  const locale = useLocale()
  const pathname = usePathname()
  const t = useTranslations('locale')
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onPointer = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onPointer)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => {
    setOpen(false)
    onNavigate?.()
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={t('label')}
        className="flex items-center gap-1.5 rounded-full border border-line px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:border-fg"
      >
        <GlobeIcon className="size-3.5 opacity-80" />
        <span>{locale}</span>
        <ChevronIcon
          className={`size-3.5 opacity-70 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          id={menuId}
          role="menu"
          className="absolute right-0 top-full z-30 mt-2 min-w-[4.5rem] overflow-hidden rounded-xl border border-line bg-bg py-1 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.85)]"
        >
          {routing.locales.map((item) => {
            const active = item === locale
            return (
              <li key={item} role="none">
                <Link
                  href={pathname}
                  locale={item}
                  hrefLang={item}
                  role="menuitem"
                  onClick={close}
                  aria-current={active ? 'true' : undefined}
                  className={`flex items-center gap-2 px-3 py-2.5 font-mono text-xs uppercase tracking-widest no-underline transition-colors duration-200 hover:bg-fg/5 ${
                    active ? 'text-accent' : 'text-fg'
                  }`}
                >
                  <span className="sr-only">
                    {t('switchTo', { language: t(item) })}
                  </span>
                  <span aria-hidden="true">{item}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
