'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Portal } from '@shared/ui/Portal'

// Galerias por evento + lightbox. Recebe os grupos já montados do Server Component.
// `headingLevel` controla o nível do título de cada noite (default h3).
export function LiveGallery({ groups, headingLevel: Heading = 'h3' }) {
  const [active, setActive] = useState(null)
  const t = useTranslations('gallery')
  const tCommon = useTranslations('common')

  // Enquanto o lightbox está aberto: trava o scroll do fundo e fecha no Esc.
  useEffect(() => {
    if (!active) return
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [active])

  return (
    <>
      {groups.map((group) => (
        <section key={group.event} className="mb-14">
          <p className="kicker">{t('photosCount', { count: group.shots.length })}</p>
          <Heading className="my-2 font-extrabold tracking-tighter text-2xl md:text-3xl">
            {group.event}
          </Heading>
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {group.shots.map((shot) => (
              <button
                key={shot.src}
                type="button"
                onClick={() => setActive(shot)}
                className={`reveal group relative min-h-[280px] overflow-hidden text-left ${
                  shot.wide ? 'col-span-1 lg:col-span-2' : ''
                }`}
              >
                <img
                  src={shot.src}
                  alt={t('shotAlt', { event: shot.event, credit: shot.credit })}
                  loading="lazy"
                  className="h-full min-h-[280px] w-full object-cover transition-[transform,filter] duration-500 ease-out [filter:contrast(1.08)_saturate(0.8)] group-hover:scale-[1.02] group-hover:[filter:contrast(1.15)_saturate(0.6)]"
                />
                <span className="absolute bottom-3 left-3 flex flex-col font-mono text-xs uppercase tracking-widest [text-shadow:0_1px_8px_var(--color-bg)]">
                  {shot.event}
                  <em className="not-italic opacity-70">{shot.credit}</em>
                </span>
              </button>
            ))}
          </div>
        </section>
      ))}

      {active && (
        <Portal>
          <div
            role="presentation"
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex cursor-zoom-out flex-col items-center justify-center bg-overlay p-10"
          >
            <img
              src={active.src}
              alt=""
              className="max-h-[82vh] max-w-[92vw] object-contain"
            />
            <p className="mt-4 font-mono text-xs uppercase tracking-widest">
              {active.event} · {tCommon('photoBy', { credit: active.credit })}
            </p>
          </div>
        </Portal>
      )}
    </>
  )
}
