import { band } from '@/lib/content'
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
    <section className="flex min-h-screen flex-col justify-between px-4 pt-28 pb-10 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <p className="kicker flex flex-wrap gap-7">
        <span>Desde {band.since}</span>
        <span>
          {band.city} — {band.state}
        </span>
        <span>Agenda 2026 aberta</span>
      </p>

      <div>
        <p className="mb-3 text-lg text-copy">psicodelia como referência</p>
        <h1 className="font-extrabold leading-none tracking-tighter text-6xl sm:text-7xl lg:text-8xl">
          Garden
          <span className="block text-accent mix-blend-screen">Psychedelia</span>
        </h1>
      </div>

      <p className="max-w-[38ch] text-lg leading-relaxed text-copy">{band.quote}</p>
    </section>
  )
}
