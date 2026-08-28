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
        <p className="mb-3 font-serif text-lg italic">psicodelia como referência</p>
        <h1 className="font-extrabold leading-[0.92] tracking-[-0.05em] text-[clamp(42px,11vw,140px)]">
          Garden
          <span className="block not-italic text-accent mix-blend-screen">
            Psychedelia
          </span>
        </h1>
      </div>

      <p className="max-w-[34ch] font-serif text-lg leading-[1.45]">{band.quote}</p>
    </section>
  )
}
