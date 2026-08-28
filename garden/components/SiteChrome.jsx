import ShaderVideo from './ShaderVideoClient'
import Navigation from './Navigation'
import LoadingScreen from './LoadingScreen'

// Chrome comum a todas as rotas: fundo com shader, navegação e grão.
export default function SiteChrome({ children }) {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <ShaderVideo />
      </div>

      <div className="video-scrim" aria-hidden="true" />

      <Navigation />

      <main className="relative z-[2]">{children}</main>

      <div className="grain" aria-hidden="true" />

      <LoadingScreen />
    </div>
  )
}
