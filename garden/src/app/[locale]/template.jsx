'use client'

// Recria-se a cada navegação, então o fade toca em toda troca de rota.
// Substitui a transição dithered (canvas Bayer) da versão Vite.
export default function Template({ children }) {
  return (
    <div className="motion-safe:animate-fadein">{children}</div>
  )
}
