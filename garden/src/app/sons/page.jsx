import Link from 'next/link'
import { band } from '@/lib/content'
import { ep1Media } from '@/lib/media'
import { PageShell, PageHead, Section, Pill } from '@shared/ui'
import { TrackPreview } from '@features/player'
import { demos, ep1, releases, hasAudio, TrackLinkRow } from '@features/catalog'

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

      <div className="mb-16 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-line pt-5">
        <dl className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
          {[
            { value: '+40 mil', label: 'plays nos streamings', accent: true },
            { value: releases.length, label: 'singles lançados', hideOnMobile: true },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`items-baseline gap-2.5 ${
                stat.hideOnMobile ? 'hidden sm:flex' : 'flex'
              }`}
            >
              <dd
                className={`font-extrabold leading-none tracking-tighter text-2xl ${
                  stat.accent ? 'text-accent' : 'text-fg'
                }`}
              >
                {stat.value}
              </dd>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
        <a
          href="#discografia"
          className="ml-auto hidden font-mono text-[10px] uppercase tracking-widest text-muted no-underline transition-colors hover:text-accent sm:block"
        >
          Ver discografia <span aria-hidden="true">↓</span>
        </a>
      </div>

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
          <div className="my-3 flex flex-wrap items-center gap-x-4 gap-y-3">
            <h2 className="font-extrabold leading-none tracking-tighter text-5xl md:text-6xl lg:text-7xl">
              {featured.title}
            </h2>
            <Pill tone="accent">Novo lançamento</Pill>
          </div>
          <p className="max-w-prose leading-relaxed text-copy">{featured.note}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
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

      <div id="discografia" className="scroll-mt-24">
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

      <Section as="section" className="mt-20 border-t border-line pt-8">
        <Section.Header count={`${ep1.length} faixas · 2026`} variant="plain">
          EP 1
        </Section.Header>
        <p className="mb-8 max-w-prose leading-relaxed text-copy">
          Éter, Morning Riser, Cos I Lov U e @Me — quatro faixas, um fôlego. Ainda
          em obra, ainda mudando de forma, mas já existem.
        </p>

        <Section.Rule glyph="ring">Em produção</Section.Rule>
        <Section.List>
          {[...ep1]
            .sort((a, b) => (a.n || '').localeCompare(b.n || ''))
            .map((track) =>
              hasAudio(track) ? (
                <TrackPreview key={track.slug} track={track} number={track.n} label="Inédita" />
              ) : (
                <TrackLinkRow key={track.slug} track={track} number={track.n} />
              )
            )}
        </Section.List>

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
      </Section>

      <Section as="aside" className="mt-20 border-t border-line pt-8">
        <Section.Header count={`${demos.length} faixas`} variant="plain">
          No estúdio
        </Section.Header>
        <p className="mb-8 max-w-prose leading-relaxed text-copy">
          Demos em processo, sons que ainda estão por vir e que você já pode conferir.
        </p>

        <Section.Rule glyph="dashed">Em processo</Section.Rule>
        <Section.List>
          {[...demos]
            // As que dá pra ouvir vêm primeiro.
            .sort((a, b) => Number(hasAudio(b)) - Number(hasAudio(a)))
            .map((demo) =>
              hasAudio(demo) ? (
                <TrackPreview key={demo.slug} track={demo} />
              ) : (
                <TrackLinkRow key={demo.slug} track={demo} />
              ),
            )}
        </Section.List>
      </Section>
    </PageShell>
  )
}
