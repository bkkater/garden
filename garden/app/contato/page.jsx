import PageShell from '@/components/PageShell'
import PageHead from '@/components/PageHead'
import SocialLinks from '@/components/SocialLinks'
import { band } from '@/lib/content'
import { contatoMedia } from '@/lib/media'
import { AGENDA_YEAR } from '@/lib/site'

const description = `Booking e contato da Garden Psychedelia — agenda ${AGENDA_YEAR} aberta.`

export const metadata = {
  title: 'Contato',
  description,
  alternates: { canonical: '/contato' },
  openGraph: { title: 'Contato — Garden Psychedelia', description, url: '/contato' },
}

export default function Contato() {
  return (
    <PageShell>
      <PageHead eyebrow="04 — Contato">Agenda {AGENDA_YEAR} aberta.</PageHead>

      <a
        href={`mailto:${band.email}`}
        className="mb-14 block break-words font-extrabold tracking-tighter no-underline text-3xl sm:text-4xl lg:text-5xl transition-colors duration-200 hover:text-accent"
      >
        {band.email}
      </a>

      <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-16">
        <div className="md:flex-1">
          <p className="max-w-prose leading-relaxed text-copy">
            Fale com a Garden pelo e-mail ou pelas redes.
          </p>
          <SocialLinks className="mt-7 max-w-md" />
        </div>

        <figure className="shrink-0">
          <img
            src={contatoMedia.figure.src}
            alt={contatoMedia.figure.alt}
            width={176}
            height={176}
            className="size-44 rounded-full object-cover"
          />
          <figcaption className="mt-2.5 font-mono text-xs uppercase tracking-widest text-muted">
            {band.city} — {band.state} · desde {band.since}
          </figcaption>
        </figure>
      </div>
    </PageShell>
  )
}
