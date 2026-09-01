import createMiddleware from 'next-intl/middleware'
import { routing } from './shared/i18n/routing'

// Negocia o idioma a cada request e grava a escolha no cookie NEXT_LOCALE.
export default createMiddleware(routing)

export const config = {
  // Tudo, menos api, arquivos internos do Next e assets (qualquer coisa com ponto).
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
