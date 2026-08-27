import PageShell from '@/components/PageShell'
import PageHead from '@/components/PageHead'
import { band } from '@/lib/content'
import { contatoMedia } from '@/lib/media'

export const metadata = {
  title: 'Contato',
  description: 'Booking e contato da Garden Psychedelia — agenda 2026 aberta.',
}

export default function Contato() {
  return (
    <PageShell>
      <PageHead eyebrow="04 — Contato">Agenda 2026 aberta.</PageHead>

      <a
        href={`mailto:${band.email}`}
        className="mb-14 block break-words font-extrabold tracking-[-0.05em] no-underline text-[clamp(28px,6vw,72px)] hover:text-accent"
      >
        {band.email}
      </a>

      <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-2">
        <div>
          <p className="leading-relaxed text-copy">
            Shows, festivais, Weird Parties e o corre do ao vivo. Fala com a Garden
            pelo e-mail ou pelas redes.
          </p>
          <ul className="mt-7">
            <li>
              <a
                href={band.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-block border-b border-line py-2.5 tracking-[0.08em] no-underline hover:text-accent"
              >
                Instagram · @gardenpsychedelia
              </a>
            </li>
            <li>
              <a
                href={band.spotify}
                target="_blank"
                rel="noreferrer"
                className="inline-block border-b border-line py-2.5 tracking-[0.08em] no-underline hover:text-accent"
              >
                Spotify · Garden Psychedelia
              </a>
            </li>
          </ul>
        </div>

        <figure>
          <img
            src={contatoMedia.figure.src}
            alt={contatoMedia.figure.alt}
            className="w-full mix-blend-screen"
          />
          <figcaption className="mt-2.5 font-mono text-[11px] tracking-[0.08em] text-muted">
            {band.city} — {band.state} · desde {band.since}
          </figcaption>
        </figure>
      </div>
    </PageShell>
  )
}
