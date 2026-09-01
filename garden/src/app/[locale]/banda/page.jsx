import { getTranslations } from 'next-intl/server'
import { MemberCard, band, members, bandaMedia } from '@features/band'
import { PageShell, PageHead } from '@shared/ui'
import { pageMetadata } from '@shared/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return pageMetadata({ locale, href: '/banda', namespace: 'band.meta' })
}

export default async function Banda() {
  const t = await getTranslations('band')
  const tMembers = await getTranslations('members')
  const tMedia = await getTranslations('media')

  return (
    <PageShell>
      <PageHead eyebrow={t('eyebrow')}>{t('headline')}</PageHead>

      <blockquote className="mb-16 max-w-[46ch] font-normal leading-snug text-xl md:text-2xl text-copy">
        {t('quote')}
      </blockquote>

      <div className="mb-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <figure>
          <img
            src={bandaMedia.hero.src}
            alt={tMedia('bandaHeroAlt')}
            className="h-[70vh] w-full object-cover [filter:contrast(1.12)_saturate(0.85)]"
          />
          <figcaption className="mt-2.5 font-mono text-xs uppercase tracking-widest text-muted">
            {tMedia('bandaHeroCaption')}
          </figcaption>
        </figure>

        <div className="max-w-prose">
          <p className="mb-4 text-lg leading-relaxed text-copy">{t('about')}</p>
          <p className="mb-4 text-lg leading-relaxed text-copy">{t('live')}</p>
          <ul className="mt-8 border-t border-line">
            {[
              [t('origin'), `${band.city} — ${band.state}`],
              [t('since'), band.since],
              [t('base'), t('baseValue')],
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
        <p className="kicker">{t('lineup')}</p>
        <h2 className="my-3 font-extrabold tracking-tighter text-4xl lg:text-5xl">
          {t('members')}
        </h2>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
          {members.map((member) => (
            <MemberCard
              key={member.name}
              member={{ ...member, role: tMembers(member.name) }}
            />
          ))}
        </div>
      </section>
    </PageShell>
  )
}
