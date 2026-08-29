'use client'

import { useEffect, useState } from 'react'

const MIN_VISIBLE = 650 // ms — evita o "pisca" em cargas rápidas
const FAILSAFE = 4500 // ms — nunca prende o usuário

function Vinyl() {
  return (
    <svg
      className="sound-vinyl motion-reduce:animate-none"
      width={72}
      height={72}
      viewBox="0 0 72 72"
      fill="none"
      stroke="currentColor"
    >
      <circle cx={36} cy={36} r={32} strokeWidth={2.5} />
      <circle cx={36} cy={36} r={24} strokeWidth={1} opacity={0.5} />
      <circle
        cx={36}
        cy={36}
        r={17}
        strokeWidth={1.5}
        stroke="var(--color-accent)"
      />
      <circle cx={36} cy={36} r={9} fill="currentColor" stroke="none" />
      <circle cx={36} cy={36} r={2.5} fill="var(--color-bg)" stroke="none" />
      <path d="M36 4 A32 32 0 0 1 61 17" strokeWidth={4} strokeLinecap="round" />
    </svg>
  )
}

// Tela de carregamento no estilo linkinpark.com: fundo escuro, um vinil creme
// girando com um sulco em vermelho. Some quando o documento e as fontes
// terminam de carregar.
export function LoadingScreen() {
  const [dismissed, setDismissed] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const start = performance.now()

    const finish = () => {
      const wait = Math.max(0, MIN_VISIBLE - (performance.now() - start))
      window.setTimeout(() => setDismissed(true), wait)
    }

    const docReady =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise((resolve) =>
            window.addEventListener('load', resolve, { once: true }),
          )
    const fontsReady = document.fonts
      ? document.fonts.ready.catch(() => {})
      : Promise.resolve()

    Promise.all([docReady, fontsReady]).then(finish)

    const failsafe = window.setTimeout(() => setDismissed(true), FAILSAFE)
    return () => window.clearTimeout(failsafe)
  }, [])

  useEffect(() => {
    if (!dismissed) return
    const t = window.setTimeout(() => setGone(true), 600)
    return () => window.clearTimeout(t)
  }, [dismissed])

  if (gone) return null

  return (
    <>
      <noscript>
        {/* Sem JS a marca não some sozinha — esconde de imediato. */}
        <style>{`.loading-screen{display:none!important}`}</style>
      </noscript>

      <div
        aria-hidden="true"
        className={`loading-screen fixed inset-0 z-[100] grid place-items-center bg-bg transition-opacity duration-500 ${
          dismissed ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <div className="text-fg">
          <Vinyl />
        </div>
      </div>
    </>
  )
}
