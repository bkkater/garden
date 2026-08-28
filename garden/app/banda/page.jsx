import PageShell from '@/components/PageShell'
import PageHead from '@/components/PageHead'
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

      <blockquote className="mb-16 max-w-[24ch] leading-tight tracking-tight text-2xl md:text-3xl">
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
          <p className="mb-4 text-lg leading-relaxed text-copy">{band.manifesto}</p>
          <ul className="mt-8 border-t border-line">
            {[
              ['Origem', `${band.city} — ${band.state}`],
              ['Desde', band.since],
              ['Formação', 'Cinco integrantes'],
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
            <figure
              key={member.name}
              className="reveal group relative overflow-hidden"
            >
              <img
                src={member.image}
                alt={`${member.name}, ${member.role}`}
                className="h-[58vh] w-full object-cover object-[center_18%] transition-[transform,filter] duration-500 ease-out [filter:contrast(1.12)_saturate(0.82)] group-hover:scale-[1.02] group-hover:[filter:contrast(1.15)_saturate(0.65)]"
              />
              <figcaption className="absolute inset-x-3 bottom-3 flex flex-col gap-1 [text-shadow:0_1px_10px_var(--color-bg)]">
                <strong className="text-xl tracking-tight">{member.name}</strong>
                <em className="font-mono text-xs not-italic uppercase tracking-widest text-accent">
                  {member.role}
                </em>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3">
        {bandaMedia.strip.map((shot) => (
          <img
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            className="reveal h-72 w-full object-cover [filter:grayscale(0.2)_contrast(1.1)]"
          />
        ))}
      </div>
    </PageShell>
  )
}
