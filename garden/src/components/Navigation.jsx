import { useLocation } from 'react-router-dom'
import { navItems, band } from '../data/content'
import { usePageTransition } from './PageTransition'

export default function Navigation() {
  const { goTo } = usePageTransition()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className={`site-nav ${isHome ? 'is-home' : ''}`}>
      <button className="brand" type="button" onClick={() => goTo('/')}>
        <img src="/logos/logo-badge.png" alt="" />
        <span>
          <strong>Garden</strong>
          <em>Psychedelia</em>
        </span>
      </button>

      <nav>
        {navItems.map((item) => (
          <button
            key={item.to}
            type="button"
            className={location.pathname === item.to ? 'is-active' : ''}
            onClick={() => goTo(item.to)}
          >
            <span className="idx">{item.index}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <a className="nav-mail" href={`mailto:${band.email}`}>
        Booking
      </a>
    </header>
  )
}
