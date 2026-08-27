import { band, members } from '../data/content'
import { bandaMedia } from '../data/media'

export default function Banda() {
  return (
    <section className="page banda">
      <header className="page-head">
        <p>01 — Banda</p>
        <h1>Alternativo por natureza. Sério por escolha.</h1>
      </header>

      <blockquote className="quote">{band.quote}</blockquote>

      <div className="banda-grid">
        <figure className="banda-photo">
          <img src={bandaMedia.hero.src} alt={bandaMedia.hero.alt} />
          <figcaption>{bandaMedia.hero.caption}</figcaption>
        </figure>

        <div className="banda-copy">
          <p>{band.about}</p>
          <p>{band.manifesto}</p>
          <ul className="facts">
            <li>
              <span>Origem</span>
              <strong>{band.city} — {band.state}</strong>
            </li>
            <li>
              <span>Desde</span>
              <strong>{band.since}</strong>
            </li>
            <li>
              <span>Formação</span>
              <strong>Cinco integrantes</strong>
            </li>
            <li>
              <span>Base</span>
              <strong>Rock and roll + psicodelia</strong>
            </li>
          </ul>
        </div>
      </div>

      <section className="members">
        <p className="tag">Formação</p>
        <h2>Integrantes</h2>
        <div className="members-grid">
          {members.map((member) => (
            <figure key={member.name} className="member">
              <img src={member.image} alt={`${member.name}, ${member.role}`} />
              <figcaption>
                <strong>{member.name}</strong>
                <em>{member.role}</em>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="banda-strip">
        {bandaMedia.strip.map((shot) => (
          <img key={shot.src} src={shot.src} alt={shot.alt} />
        ))}
      </div>
    </section>
  )
}
