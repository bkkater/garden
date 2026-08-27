import { band, members } from '../data/content'

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
          <img src="/images/live-duo.jpg" alt="Garden Psychedelia no Festival Troque o Disco" />
          <figcaption>Festival Troque o Disco · foto Hyakuya</figcaption>
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
        <img src="/images/live-bass.jpg" alt="Bob no baixo" />
        <img src="/images/live-gabriel.jpg" alt="Gabriel no palco" />
        <img src="/images/wp1-milton.jpg" alt="Milton no vocal" />
      </div>
    </section>
  )
}
