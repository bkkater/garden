'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { band, navItems } from '@/lib/content'
import { logos } from '@/lib/media'

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-20 flex items-center gap-4 px-4 py-3 transition-[background-color,box-shadow] duration-300 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-6 lg:px-8 lg:py-4 ${
        scrolled
          ? 'bg-bg/90 shadow-[0_14px_34px_-10px_rgba(0,0,0,0.85)] backdrop-blur-sm lg:mix-blend-normal'
          : 'bg-gradient-to-b from-bg via-bg/90 to-transparent lg:bg-none lg:mix-blend-difference'
      }`}
    >
      <Link href="/" className="flex shrink-0 items-center gap-3 text-left">
        <img
          src={logos.badge}
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

      <nav className="flex flex-1 gap-2 overflow-x-auto lg:justify-end">
        {navItems.map((item) => {
          const active = pathname === item.to
          return (
            <Link
              key={item.to}
              href={item.to}
              aria-current={active ? 'page' : undefined}
              className={`shrink-0 px-3 py-3 font-mono text-xs uppercase tracking-widest no-underline hover:text-accent hover:mix-blend-normal ${
                active ? 'text-accent mix-blend-normal' : ''
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <a
        href={`mailto:${band.email}`}
        className="hidden shrink-0 rounded-full border border-fg px-4 py-2 font-mono text-xs uppercase tracking-widest no-underline mix-blend-normal transition-colors hover:border-accent hover:bg-accent hover:text-bg lg:inline-block"
      >
        Booking
      </a>
    </header>
  )
}
