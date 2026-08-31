'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { band, navItems, logo } from '@shared/lib/site'

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Trava o scroll do body enquanto o menu mobile está aberto.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const solid =
    scrolled || open
      ? 'bg-bg/90 shadow-[0_14px_34px_-10px_rgba(0,0,0,0.85)] backdrop-blur-sm lg:mix-blend-normal'
      : 'bg-gradient-to-b from-bg via-bg/90 to-transparent lg:bg-none lg:mix-blend-difference'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-20 flex items-center gap-4 px-4 py-3 transition-[background-color,box-shadow] duration-300 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-6 lg:px-8 lg:py-4 ${solid}`}
    >
      <Link href="/" className="flex shrink-0 items-center gap-3 text-left">
        <img
          src={logo.badge}
          alt=""
          className="h-11 w-11 rounded-full object-cover"
        />
        <span className="flex flex-col leading-none">
          <strong className="text-sm uppercase tracking-widest">Garden</strong>
          <em className="text-xs not-italic uppercase tracking-widest opacity-70">
            Psychedelia
          </em>
        </span>
      </Link>

      {/* Desktop — linha de links, separados por ponto */}
      <nav className="hidden flex-1 items-center justify-end gap-3 lg:flex">
        {navItems.map((item, i) => {
          const active = pathname === item.to
          return (
            <span key={item.to} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden="true" className="text-muted/50">
                  ·
                </span>
              )}
              <Link
                href={item.to}
                aria-current={active ? 'page' : undefined}
                className={`shrink-0 py-3 font-mono text-xs uppercase tracking-widest no-underline transition-colors duration-200 hover:text-accent hover:mix-blend-normal ${
                  active ? 'text-accent mix-blend-normal' : ''
                }`}
              >
                {item.label}
              </Link>
            </span>
          )
        })}
      </nav>

      <a
        href={`mailto:${band.email}`}
        className="hidden shrink-0 rounded-full border border-fg px-4 py-2 font-mono text-xs uppercase tracking-widest no-underline mix-blend-normal transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg lg:inline-block"
      >
        Booking
      </a>

      {/* Mobile — botão hambúrguer */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        className="ml-auto flex size-11 shrink-0 flex-col items-center justify-center gap-1.5 mix-blend-normal lg:hidden"
      >
        <span
          className={`h-px w-6 bg-fg transition-transform duration-200 ${open ? 'translate-y-[7px] rotate-45' : ''}`}
        />
        <span
          className={`h-px w-6 bg-fg transition-opacity duration-200 ${open ? 'opacity-0' : ''}`}
        />
        <span
          className={`h-px w-6 bg-fg transition-transform duration-200 ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
        />
      </button>

      {/* Mobile — painel */}
      {open && (
        <nav
          id="mobile-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-100%)] min-h-[65dvh] overflow-y-auto border-t border-line bg-bg px-4 pt-2 pb-10 lg:hidden"
        >
          {navItems.map((item) => {
            const active = pathname === item.to
            return (
              <Link
                key={item.to}
                href={item.to}
                onClick={() => setOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={`block border-b border-line/60 py-4 font-mono text-sm uppercase tracking-widest no-underline transition-colors duration-200 hover:text-accent ${
                  active ? 'text-accent' : ''
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <a
            href={`mailto:${band.email}`}
            onClick={() => setOpen(false)}
            className="mt-5 inline-block rounded-full border border-fg px-5 py-2.5 font-mono text-xs uppercase tracking-widest no-underline transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg"
          >
            Booking
          </a>
        </nav>
      )}
    </header>
  )
}
