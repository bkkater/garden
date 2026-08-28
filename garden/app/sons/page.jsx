import PageShell from '@/components/PageShell'
import PageHead from '@/components/PageHead'
import { band, demos, releases } from '@/lib/content'

const description = 'Discos, singles e demos da Garden Psychedelia.'

export const metadata = {
  title: 'Sons',
  description,
  alternates: { canonical: '/sons' },
  openGraph: { title: 'Sons — Garden Psychedelia', description, url: '/sons' },
}

export default function Sons() {
  const featured = releases.find((item) => item.featured)
  const rest = releases.filter((item) => !item.featured)

  return (
    <PageShell>
      <PageHead eyebrow="03 — Sons">
        Discos, singles e o que ainda está germinando.
      </PageHead>

      <article className="mb-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <img
          src={featured.cover}
          alt={`Capa de ${featured.title}`}
          className="aspect-square w-full object-cover"
        />
        <div>
          <p className="kicker">
            {featured.year} · {featured.type}
          </p>
          <h2 className="my-3 font-extrabold leading-none tracking-tighter text-5xl md:text-6xl lg:text-7xl">
            {featured.title}
          </h2>
          <p className="max-w-prose leading-relaxed text-copy">{featured.note}</p>
          <p className="my-4 font-mono text-xs uppercase tracking-widest text-accent">
            {featured.plays} plays
          </p>
          <a
            href={band.spotify}
            target="_blank"
            rel="noreferrer"
            className="inline-block border border-fg px-4 py-3 text-xs uppercase tracking-widest no-underline hover:border-accent hover:bg-accent hover:text-bg"
          >
            Ouvir no Spotify
          </a>
        </div>
      </article>

      <div>
        {rest.map((item) => (
          <article
            key={item.title}
            className="flex gap-6 border-t border-line py-5"
          >
            <img
              src={item.cover}
              alt=""
              className="h-20 w-28 shrink-0 object-cover [filter:grayscale(0.3)_contrast(1.15)]"
            />
            <div>
              <h3 className="text-3xl tracking-tight">{item.title}</h3>
              <p className="my-1.5 font-mono text-xs uppercase tracking-widest text-muted">
                {item.year} · {item.type} · {item.plays} plays
              </p>
              <span className="block max-w-prose leading-relaxed text-copy">
                {item.note}
              </span>
            </div>
          </article>
        ))}
      </div>

      <aside className="mt-20 border-t border-line pt-8">
        <h2 className="mb-2.5 text-3xl md:text-4xl tracking-tight">No estúdio</h2>
        <p className="max-w-prose leading-relaxed text-copy">
          Demos em processo — Morning Riser já vazou do palco para o arquivo ao vivo.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {demos.map((name) => (
            <li
              key={name}
              className="border border-line px-3.5 py-2.5 font-mono text-xs uppercase tracking-wider"
            >
              {name}
            </li>
          ))}
        </ul>
      </aside>
    </PageShell>
  )
}
