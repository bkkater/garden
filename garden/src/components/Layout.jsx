import { Outlet, useLocation } from 'react-router-dom'
import ShaderVideo from './ShaderVideo'
import Navigation from './Navigation'

export default function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="app">
      <div className="stage">
        <ShaderVideo />
      </div>

      <Navigation />

      <main className={isHome ? 'is-home' : 'is-page'} key={location.pathname}>
        <Outlet />
      </main>

      <div className="grain" aria-hidden="true" />
    </div>
  )
}
