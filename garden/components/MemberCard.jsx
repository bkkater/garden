'use client'

import { useState, useEffect, useCallback } from 'react'

const SLIDE_INTERVAL = 4000 // ms entre trocas
const FADE_DURATION = 700   // ms da transição CSS

export default function MemberCard({ member }) {
  const images = member.images ?? [member.image]
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)
  const [fading, setFading] = useState(false)

  const advance = useCallback(() => {
    setFading(true)
    setPrev(current)

    setTimeout(() => {
      setCurrent((c) => (c + 1) % images.length)
      setFading(false)
      setPrev(null)
    }, FADE_DURATION)
  }, [current, images.length])

  useEffect(() => {
    if (images.length < 2) return
    const id = setInterval(advance, SLIDE_INTERVAL)
    return () => clearInterval(id)
  }, [advance, images.length])

  return (
    <figure className="reveal group relative overflow-hidden">
      {/* Imagem anterior (sai com fade-out) */}
      {prev !== null && (
        <img
          key={`prev-${prev}`}
          src={images[prev]}
          alt={`${member.name}, ${member.role}`}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center [filter:contrast(1.12)_saturate(0.82)]"
          style={{
            opacity: fading ? 0 : 1,
            transition: `opacity ${FADE_DURATION}ms ease-in-out`,
          }}
        />
      )}

      {/* Imagem atual (entra com fade-in) */}
      <img
        key={`curr-${current}`}
        src={images[current]}
        alt={`${member.name}, ${member.role}`}
        className="h-[58vh] w-full object-cover object-center transition-[transform,filter] duration-500 ease-out [filter:contrast(1.12)_saturate(0.82)] group-hover:scale-[1.02] group-hover:[filter:contrast(1.15)_saturate(0.65)]"
        style={{
          opacity: fading ? 0 : 1,
          transform: fading ? 'scale(1.03)' : 'scale(1)',
          transition: `opacity ${FADE_DURATION}ms ease-in-out, transform ${FADE_DURATION}ms ease-in-out`,
        }}
      />

      {/* Legenda */}
      <figcaption className="absolute inset-x-3 bottom-3 flex flex-col gap-1 [text-shadow:0_1px_10px_var(--color-bg)]">
        <strong className="text-xl tracking-tight">{member.name}</strong>
        <em className="font-mono text-xs not-italic uppercase tracking-widest text-accent">
          {member.role}
        </em>

        {/* Indicadores de slide */}
        {images.length > 1 && (
          <div className="mt-1.5 flex gap-1.5" aria-hidden="true">
            {images.map((_, i) => (
              <span
                key={i}
                className="block h-[2px] rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '18px' : '6px',
                  background: i === current ? 'var(--color-accent)' : 'rgba(255,255,255,0.35)',
                }}
              />
            ))}
          </div>
        )}
      </figcaption>
    </figure>
  )
}
