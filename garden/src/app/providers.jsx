import { PlayerProvider } from '@features/player'

// Composição de providers do app. Domínio (player) entra aqui, na camada
// app — shared/ não pode depender de features/.
export function AppProviders({ children }) {
  return <PlayerProvider>{children}</PlayerProvider>
}
