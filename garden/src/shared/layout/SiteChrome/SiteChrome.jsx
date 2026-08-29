import { Navigation } from '@shared/layout/Navigation'
import { Footer } from '@shared/layout/Footer'
import { LoadingScreen } from '@shared/layout/LoadingScreen'
// Transição: shader e player viram features próprias em P4/P2 e passam a
// entrar aqui por slot. Por ora seguem nos caminhos antigos.
import ShaderVideo from '@/components/ShaderVideoClient'
import GlobalPlayer from '@/components/GlobalPlayer'
import { PlayerProvider } from '@/lib/PlayerContext'

// Chrome comum a todas as rotas: fundo com shader, navegação, rodapé e grão.
export function SiteChrome({ children }) {
  return (
    <PlayerProvider>
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
        <GlobalPlayer />

        <LoadingScreen />
      </div>
    </PlayerProvider>
  )
}
