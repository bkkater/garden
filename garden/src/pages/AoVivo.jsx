import { useState } from 'react'
import { events, gallery, posters } from '../data/content'

export default function AoVivo() {
  const [active, setActive] = useState(null)

  return (
    <section className="page ao-vivo">
      <header className="page-head">
        <p>02 — Ao vivo</p>
        <h1>O trabalho desses anos, escrito e desenhado no palco.</h1>
      </header>

      <ul className="event-list">
        {events.map((event) => (
          <li key={event.title}>
            <h2>{event.title}</h2>
            <p>{event.place}</p>
            <span>{event.note}</span>
          </li>
        ))}
      </ul>

      <div className="poster-row">
        {posters.map((poster) => (
          <figure key={poster.src}>
            <img src={poster.src} alt={poster.title} />
            <figcaption>{poster.title}</figcaption>
          </figure>
        ))}
      </div>

      <div className="gallery">
        {gallery.map((shot) => (
          <button
            key={shot.src}
            type="button"
            className={`shot ${shot.wide ? 'is-wide' : ''}`}
            onClick={() => setActive(shot)}
          >
            <img src={shot.src} alt={`${shot.event}, foto ${shot.credit}`} loading="lazy" />
            <span>
              {shot.event}
              <em>{shot.credit}</em>
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div className="lightbox" onClick={() => setActive(null)} role="presentation">
          <img src={active.src} alt="" />
          <p>
            {active.event} · foto {active.credit}
          </p>
        </div>
      )}
    </section>
  )
}
