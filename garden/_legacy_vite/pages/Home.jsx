import { band, navItems } from '../data/content'
import { layout } from '../design/tokens'
import { usePageTransition } from '../components/PageTransition'

export default function Home() {
  const { goTo } = usePageTransition()
  const menu = layout.home.menu

  const links = (
    <div className="home-links">
      {navItems.map((item) => (
        <button key={item.to} type="button" onClick={() => goTo(item.to)}>
          {item.label}
          <span>↗</span>
        </button>
      ))}
    </div>
  )

  const kicker = (
    <p className="home-kicker">
      <span>Desde {band.since}</span>
      <span>{band.city} — {band.state}</span>
      <span>Agenda 2026 aberta</span>
    </p>
  )

  return (
    <section className={`home is-menu-${menu}`}>
      <div className="home-head">
        {menu === 'top' && links}
        {kicker}
      </div>

      <div className="home-title">
        <p>psicodelia como referência</p>
        <h1>
          Garden
          <em>Psychedelia</em>
        </h1>
      </div>

      <div className="home-foot">
        <p>{band.quote}</p>
        {menu === 'bottom-right' && links}
      </div>
    </section>
  )
}
