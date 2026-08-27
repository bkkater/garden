import { Fraunces, IBM_Plex_Mono, Syne } from 'next/font/google'
import { ACTIVE_THEME } from '@/lib/theme'
import './globals.css'

// Tipografia preservada da versão Vite, agora self-hosted via next/font
// (sem <link> render-blocking para o Google Fonts).
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['500', '600'],
  variable: '--font-fraunces',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata = {
  title: 'Garden Psychedelia',
  description:
    'Garden Psychedelia — banda de psicodelia de Campos dos Goytacazes (RJ), ativa desde 2019.',
}

// O chrome do site (nav, shader, grão) entra na Fase 6.
export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      data-theme={ACTIVE_THEME}
      className={`${syne.variable} ${fraunces.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
