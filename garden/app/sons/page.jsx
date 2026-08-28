import Link from 'next/link'
import PageShell from '@/components/PageShell'
import PageHead from '@/components/PageHead'
import { band, demos, ep1, releases } from '@/lib/content'
import { ep1Media } from '@/lib/media'

const description =
  'Singles, o EP 1 em produção e as demos da Garden Psychedelia — com letras.'

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
        EPs, singles e o que ainda está por vir.
      </PageHead>

      <p className="mb-16 font-mono text-xs uppercase tracking-widest text-accent">
        +40.000 plays nos streamings
      </p>

      <article className="mb-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <figure>
          <img
            src={featured.cover}
            alt={`Capa de ${featured.title}`}
            className="aspect-square w-full object-cover"
          />
          {featured.coverCredit && (
            <figcaption className="mt-2.5 font-mono text-xs uppercase tracking-widest text-muted">
              {featured.coverCredit}
            </figcaption>
          )}
        </figure>
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
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={band.spotify}
              target="_blank"
              rel="noreferrer"
              className="inline-block border border-fg px-4 py-3 text-xs uppercase tracking-widest no-underline transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg"
            >
              Ouvir no Spotify
            </a>
            <Link
              href={`/sons/${featured.slug}`}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted no-underline transition-colors duration-200 hover:text-accent"
            >
              Ver mais <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </article>

      <div>
        {rest.map((item) => (
          <article
            key={item.title}
            className="reveal flex gap-6 border-t border-line py-5"
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
              <Link
                href={`/sons/${item.slug}`}
                className="mt-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted no-underline transition-colors duration-200 hover:text-accent"
              >
                Ver mais <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-20 border-t border-line pt-8">
        <h2 className="mb-2.5 text-3xl md:text-4xl tracking-tight">EP 1</h2>
        <p className="max-w-prose leading-relaxed text-copy">
          As quatro faixas em produção para o próximo EP. Letra completa e prévia
          do som em cada página.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {ep1.map((track) => (
            <li key={track.slug}>
              <Link
                href={`/sons/${track.slug}`}
                className="inline-flex items-center gap-2 border border-fg px-3.5 py-2.5 font-mono text-xs uppercase tracking-wider no-underline transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg"
              >
                <span aria-hidden="true">✦</span> {track.title}
              </Link>
            </li>
          ))}
        </ul>

        <h3 className="kicker mt-12">Prévia da estética</h3>
        <p className="mt-3 max-w-prose leading-relaxed text-copy">
          As fotos que acompanham o lançamento — a virada da Garden também no
          visual.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ep1Media.map((shot) => (
            <img
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover [filter:contrast(1.05)_saturate(0.95)]"
            />
          ))}
        </div>
        <p className="mt-2.5 font-mono text-xs uppercase tracking-widest text-muted">
          Fotos por Flávia Motta
        </p>
      </section>

      <aside className="mt-20 border-t border-line pt-8">
        <h2 className="mb-2.5 text-3xl md:text-4xl tracking-tight">No estúdio</h2>
        <p className="max-w-prose leading-relaxed text-copy">
          Demos em processo, sons que ainda estão por vir e que você já pode conferir.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {demos.map((demo) => (
            <li key={demo.slug}>
              <Link
                href={`/sons/${demo.slug}`}
                className="inline-flex items-center gap-2 border border-line px-3.5 py-2.5 font-mono text-xs uppercase tracking-wider no-underline transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                <span aria-hidden="true">▶</span> {demo.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </PageShell>
  )
}
