'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { band, navItems } from '@/lib/content'
import { logos } from '@/lib/media'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-20 grid grid-cols-1 items-center gap-3 bg-gradient-to-b from-bg to-transparent px-4 py-4 mix-blend-normal lg:grid-cols-[auto_1fr_auto] lg:gap-6 lg:bg-none lg:px-8 lg:py-5 lg:mix-blend-difference">
      <Link href="/" className="flex items-center gap-3 text-left">
        <img
          src={logos.badge}
          alt=""
          className="h-11 w-11 rounded-full object-cover"
        />
        <span className="flex flex-col leading-none">
          <strong className="text-[13px] uppercase tracking-[0.18em]">Garden</strong>
          <em className="text-[11px] not-italic uppercase tracking-[0.12em] opacity-70">
            Psychedelia
          </em>
        </span>
      </Link>

      <nav className="flex justify-start gap-2 overflow-x-auto lg:justify-end">
        {navItems.map((item) => {
          const active = pathname === item.to
          return (
            <Link
              key={item.to}
              href={item.to}
              aria-current={active ? 'page' : undefined}
              className={`px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] no-underline hover:text-accent hover:mix-blend-normal ${
                active ? 'text-accent mix-blend-normal' : ''
              }`}
            >
              <span className="block text-[9px] opacity-45">{item.index}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <a
        href={`mailto:${band.email}`}
        className="hidden px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] no-underline hover:text-accent hover:mix-blend-normal lg:block"
      >
        Booking
      </a>
    </header>
  )
}
