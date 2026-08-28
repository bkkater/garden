import Link from 'next/link'
import SectionPreview from '@/components/SectionPreview'
import { band, homeIntro, homeSections } from '@/lib/content'
import { siteUrl } from '@/lib/site'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: band.name,
  foundingDate: String(band.since),
  foundingLocation: {
    '@type': 'Place',
    name: `${band.city}, ${band.state}, Brasil`,
  },
  genre: 'Psychedelic rock',
  email: band.email,
  url: siteUrl,
  sameAs: [band.instagram, band.spotify],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — sobre o shader */}
      <section className="flex min-h-[88vh] flex-col justify-between px-4 pt-28 pb-12 lg:px-8">
        <p className="kicker flex flex-wrap gap-x-7 gap-y-1">
          <span>Desde {band.since}</span>
          <span>
            {band.city} — {band.state}
          </span>
          <span>Agenda 2026 aberta</span>
        </p>

        <div>
          <h1 className="font-extrabold leading-none tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-8xl">
            Garden
            <span className="block text-accent mix-blend-screen">Psychedelia</span>
          </h1>
          <p className="mt-4 max-w-[34ch] text-lg text-copy">{homeIntro}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={band.spotify}
            target="_blank"
            rel="noreferrer"
            className="inline-block border border-fg px-5 py-3 font-mono text-xs uppercase tracking-widest no-underline hover:border-accent hover:bg-accent hover:text-bg"
          >
            Ouvir no Spotify
          </a>
          <Link
            href="/ao-vivo"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted no-underline hover:text-accent"
          >
            Ver a agenda <span aria-hidden="true">↓</span>
          </Link>
        </div>
      </section>

      {/* Vitrine — prévia de cada seção, sobre fundo sólido */}
      <section className="relative z-[2] bg-bg px-4 pb-28 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-transparent to-bg"
        />
        {homeSections.map((section, i) => (
          <SectionPreview key={section.to} {...section} flip={i % 2 === 1} />
        ))}
      </section>
    </>
  )
}
