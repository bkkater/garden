'use client'

import { useState } from 'react'

// Galerias por evento + lightbox. Recebe os grupos já montados do Server Component.
export default function LiveGallery({ groups }) {
  const [active, setActive] = useState(null)

  return (
    <>
      {groups.map((group) => (
        <section key={group.event} className="mb-14">
          <p className="kicker">{group.shots.length} fotos</p>
          <h2 className="my-2 font-extrabold tracking-tighter text-3xl md:text-4xl">
            {group.event}
          </h2>
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
                  alt={`${shot.event}, foto ${shot.credit}`}
                  loading="lazy"
                  className="h-full min-h-[280px] w-full object-cover transition-[transform,filter] duration-700 [filter:contrast(1.08)_saturate(0.8)] group-hover:scale-[1.04] group-hover:[filter:contrast(1.25)_saturate(0.4)]"
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
        <div
          role="presentation"
          onClick={() => setActive(null)}
          className="fixed inset-0 z-30 flex cursor-zoom-out flex-col items-center justify-center bg-overlay p-10"
        >
          <img
            src={active.src}
            alt=""
            className="max-h-[82vh] max-w-[92vw] object-contain"
          />
          <p className="mt-4 font-mono text-xs uppercase tracking-widest">
            {active.event} · foto {active.credit}
          </p>
        </div>
      )}
    </>
  )
}
