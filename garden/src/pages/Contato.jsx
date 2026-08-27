import { band } from '../data/content'

export default function Contato() {
  return (
    <section className="page contato">
      <header className="page-head">
        <p>04 — Contato</p>
        <h1>Agenda 2026 aberta.</h1>
      </header>

      <a className="mail" href={`mailto:${band.email}`}>
        {band.email}
      </a>

      <div className="contato-grid">
        <div>
          <p>
            Shows, festivais, Weird Parties e o corre do ao vivo.
            Fala com a Garden pelo e-mail ou pelas redes.
          </p>
          <ul className="social">
            <li>
              <a href={band.instagram} target="_blank" rel="noreferrer">
                Instagram · @gardenpsychedelia
              </a>
            </li>
            <li>
              <a href={band.spotify} target="_blank" rel="noreferrer">
                Spotify · Garden Psychedelia
              </a>
            </li>
          </ul>
        </div>

        <figure>
          <img src="/logos/logo-red.png" alt="Logo Garden Psychedelia" />
          <figcaption>{band.city} — {band.state} · desde {band.since}</figcaption>
        </figure>
      </div>
    </section>
  )
}
