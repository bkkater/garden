import LiveGallery from '@/components/LiveGallery';
import PageHead from '@/components/PageHead';
import PageShell from '@/components/PageShell';
import { agenda, band, events, posters } from '@/lib/content';
import { galleryByEvent } from '@/lib/media';
import { AGENDA_YEAR } from '@/lib/site';

const description = `Agenda ${AGENDA_YEAR} aberta. E a retrospectiva: Festival Troque o Disco, as Weird Parties e as fotos de cada noite.`;

export const metadata = {
  title: 'Ao vivo',
  description,
  alternates: { canonical: '/ao-vivo' },
  openGraph: {
    title: 'Ao vivo — Garden Psychedelia',
    description,
    url: '/ao-vivo',
  },
};

export default function AoVivo() {
  const groups = galleryByEvent();

  return (
    <PageShell>
      <PageHead eyebrow='02 — Ao vivo'>
        Shows, festivais e Weird Parties.
      </PageHead>

      {/* Agenda — o que está por vir */}
      <section className='mb-20 max-w-prose border-t border-line pt-8'>
        <h2 className='font-extrabold tracking-tighter text-3xl md:text-4xl'>
          Agenda {AGENDA_YEAR}
        </h2>
        <p className='mt-3 text-lg leading-relaxed text-copy'>
          {agenda.status} {agenda.detail}
        </p>
        <a
          href={`mailto:${band.email}`}
          className='mt-6 inline-block rounded-full border border-fg px-5 py-3 font-mono text-xs uppercase tracking-widest no-underline transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg'
        >
          Chamar a Garden
        </a>
      </section>

      {/* Já rolou — retrospectiva */}
      <section className='border-t border-line pt-8'>
        <h2 className='font-extrabold tracking-tighter text-3xl md:text-4xl'>
          Já rolou
        </h2>
        <p className='mt-3 mb-12 max-w-prose text-lg leading-relaxed text-copy'>
          Um festival, quatro Weird Parties e muitas outras histórias. Tudo isso
          entre {band.since} e {AGENDA_YEAR}.
        </p>

        <h3 className='kicker'>Shows e festas</h3>
        <ul className='mt-4 mb-16 grid grid-cols-1 gap-6 md:grid-cols-3'>
          {events.map((event) => (
            <li key={event.title} className='border-t border-line pt-4'>
              <h4 className='mb-2 text-2xl tracking-tight'>{event.title}</h4>
              <p className='mb-2.5 font-mono text-xs uppercase tracking-widest text-muted'>
                {event.place}
              </p>
              <span className='block leading-relaxed text-copy'>
                {event.note}
              </span>
            </li>
          ))}
        </ul>

        <h3 className='kicker'>Cartazes</h3>
        <div className='mt-4 mb-16 grid grid-cols-2 gap-4 lg:grid-cols-4'>
          {posters.map((poster) => (
            <figure key={poster.src} className='reveal'>
              <img
                src={poster.src}
                alt={poster.title}
                className='aspect-square w-full object-cover [filter:contrast(1.08)]'
              />
              <figcaption className='mt-2.5 font-mono text-xs uppercase tracking-widest text-muted'>
                {poster.title}
              </figcaption>
            </figure>
          ))}
        </div>

        <h3 className='kicker mb-6'>Fotos por noite</h3>
        <LiveGallery groups={groups} headingLevel='h4' />
      </section>
    </PageShell>
  );
}
