import ShaderVideo from './ShaderVideoClient'
import Navigation from './Navigation'
import Footer from './Footer'
import LoadingScreen from './LoadingScreen'
import GlobalPlayer from './GlobalPlayer'
import { PlayerProvider } from '@/lib/PlayerContext'

// Chrome comum a todas as rotas: fundo com shader, navegação, rodapé e grão.
export default function SiteChrome({ children }) {
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
