import './globals.css'

export const metadata = {
  title: 'Garden Psychedelia',
  description:
    'Garden Psychedelia — banda de psicodelia de Campos dos Goytacazes (RJ), ativa desde 2019.',
}

// Fontes (next/font) e o chrome do site (nav, shader, grão) entram nas Fases 2 e 6.
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" data-theme="night">
      <body>{children}</body>
    </html>
  )
}
