'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { band, navItems } from '@/lib/content'
import { logos } from '@/lib/media'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-20 flex items-center gap-4 bg-gradient-to-b from-bg via-bg/90 to-transparent px-4 py-3 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-6 lg:bg-none lg:px-8 lg:py-5 lg:mix-blend-difference">
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
        className="hidden px-3 py-3 font-mono text-xs uppercase tracking-widest no-underline hover:text-accent hover:mix-blend-normal lg:block"
      >
        Booking
      </a>
    </header>
  )
}
