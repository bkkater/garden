import PageShell from '@/components/PageShell'
import PageHead from '@/components/PageHead'
import MemberCard from '@/components/MemberCard'
import { band, members } from '@/lib/content'
import { bandaMedia } from '@/lib/media'

const description =
  'A Garden Psychedelia — psicodelia de Campos dos Goytacazes (RJ) desde 2019, cinco integrantes.'

export const metadata = {
  title: 'Banda',
  description,
  alternates: { canonical: '/banda' },
  openGraph: { title: 'Banda — Garden Psychedelia', description, url: '/banda' },
}

export default function Banda() {
  return (
    <PageShell>
      <PageHead eyebrow="01 — Banda">
        Alternativo por natureza. Sério por escolha.
      </PageHead>

      <blockquote className="mb-16 max-w-[46ch] font-normal leading-snug text-xl md:text-2xl text-copy">
        {band.quote}
      </blockquote>

      <div className="mb-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <figure>
          <img
            src={bandaMedia.hero.src}
            alt={bandaMedia.hero.alt}
            className="h-[70vh] w-full object-cover [filter:contrast(1.12)_saturate(0.85)]"
          />
          <figcaption className="mt-2.5 font-mono text-xs uppercase tracking-widest text-muted">
            {bandaMedia.hero.caption}
          </figcaption>
        </figure>

        <div className="max-w-prose">
          <p className="mb-4 text-lg leading-relaxed text-copy">{band.about}</p>
          <p className="mb-4 text-lg leading-relaxed text-copy">{band.live}</p>
          <ul className="mt-8 border-t border-line">
            {[
              ['Origem', `${band.city} — ${band.state}`],
              ['Desde', band.since],
              ['Base', 'Rock and roll + psicodelia'],
            ].map(([label, value]) => (
              <li
                key={label}
                className="flex justify-between gap-4 border-b border-line py-3.5 text-sm"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  {label}
                </span>
                <strong>{value}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="my-20">
        <p className="kicker">Formação</p>
        <h2 className="my-3 font-extrabold tracking-tighter text-4xl lg:text-5xl">
          Integrantes
        </h2>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
          {members.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>
    </PageShell>
  )
}
