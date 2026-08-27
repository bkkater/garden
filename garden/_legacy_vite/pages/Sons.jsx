import { demos, releases, band } from '../data/content'

export default function Sons() {
  const featured = releases.find((item) => item.featured)
  const rest = releases.filter((item) => !item.featured)

  return (
    <section className="page sons">
      <header className="page-head">
        <p>03 — Sons</p>
        <h1>Discos, singles e o que ainda está germinando.</h1>
      </header>

      <article className="featured">
        <img src={featured.cover} alt={`Capa de ${featured.title}`} />
        <div>
          <p className="tag">{featured.year} · {featured.type}</p>
          <h2>{featured.title}</h2>
          <p>{featured.note}</p>
          <p className="plays">{featured.plays} plays</p>
          <a href={band.spotify} target="_blank" rel="noreferrer">
            Ouvir no Spotify
          </a>
        </div>
      </article>

      <div className="release-list">
        {rest.map((item) => (
          <article key={item.title}>
            <img src={item.cover} alt="" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.year} · {item.type} · {item.plays} plays</p>
              <span>{item.note}</span>
            </div>
          </article>
        ))}
      </div>

      <aside className="demos">
        <h2>No estúdio</h2>
        <p>Demos em processo — Morning Riser já vazou do palco para o arquivo ao vivo.</p>
        <ul>
          {demos.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </aside>
    </section>
  )
}
