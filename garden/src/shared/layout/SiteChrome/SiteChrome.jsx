import { Navigation } from '@shared/layout/Navigation'
import { Footer } from '@shared/layout/Footer'
import { LoadingScreen } from '@shared/layout/LoadingScreen'

// Chrome comum a todas as rotas: fundo com shader, navegação, rodapé e grão.
// O fundo e o player entram por slot — assim shared/ não depende de features/.
export function SiteChrome({ background, player, children }) {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 z-0" aria-hidden="true">
        {background}
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
