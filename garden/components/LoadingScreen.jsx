'use client'

import { useEffect, useState } from 'react'
import { logos } from '@/lib/media'

const MIN_VISIBLE = 650 // ms — evita o "pisca" em cargas rápidas
const FAILSAFE = 4500 // ms — nunca prende o usuário

// Tela de carregamento no estilo linkinpark.com: fundo escuro, uma marca
// centralizada respirando, sem porcentagem nem barra. Some quando o documento
// e as fontes terminam de carregar.
export default function LoadingScreen() {
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
        <div className="animate-mark-spin motion-reduce:animate-none">
          <img
            src={logos.badge}
            alt=""
            width={96}
            height={96}
            className="h-24 w-24 rounded-full animate-mark-breathe motion-reduce:animate-none"
          />
        </div>
      </div>
    </>
  )
}
