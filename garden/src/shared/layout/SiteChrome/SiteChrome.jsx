import { Navigation } from '@shared/layout/Navigation'
import { Footer } from '@shared/layout/Footer'
import { LoadingScreen } from '@shared/layout/LoadingScreen'
// Transição: o shader vira feature própria em P4 e passa a entrar por slot.
import ShaderVideo from '@/components/ShaderVideoClient'

// Chrome comum a todas as rotas: fundo com shader, navegação, rodapé e grão.
// O player global entra pelo slot `player` — assim shared/ não depende de
// features/.
export function SiteChrome({ player, children }) {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <ShaderVideo />
      </div>

      <div className="video-scrim" aria-hidden="true" />

      <Navigation />

      <main className="relative z-[2]">{children}</main>

      <Footer />

      <div className="grain" aria-hidden="true" />

      {/* Player flutuante — z-50, acima do grain (z-6) */}
      {player}

      <LoadingScreen />
    </div>
  )
}
