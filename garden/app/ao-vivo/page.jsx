import PageShell from '@/components/PageShell'
import PageHead from '@/components/PageHead'
import LiveGallery from '@/components/LiveGallery'
import { events, posters } from '@/lib/content'
import { galleryByEvent } from '@/lib/media'

export const metadata = {
  title: 'Ao vivo',
  description:
    'Shows, festivais e Weird Parties da Garden Psychedelia, com registro fotográfico.',
}

export default function AoVivo() {
  const groups = galleryByEvent()

  return (
    <PageShell>
      <PageHead eyebrow="02 — Ao vivo">
        O trabalho desses anos, escrito e desenhado no palco.
      </PageHead>

      <ul className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {events.map((event) => (
          <li key={event.title} className="border-t border-line pt-4">
            <h2 className="mb-2 text-2xl tracking-[-0.04em]">{event.title}</h2>
            <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
              {event.place}
            </p>
            <span className="leading-relaxed text-copy">{event.note}</span>
          </li>
        ))}
      </ul>

      <div className="mb-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {posters.map((poster) => (
          <figure key={poster.src}>
            <img
              src={poster.src}
              alt={poster.title}
              className="aspect-square w-full object-cover [filter:contrast(1.08)]"
            />
            <figcaption className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
              {poster.title}
            </figcaption>
          </figure>
        ))}
      </div>

      <LiveGallery groups={groups} />
    </PageShell>
  )
}
