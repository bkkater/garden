import { getLocale, getMessages } from 'next-intl/server'
import { SiteDocument } from '@app/_components/SiteDocument'
import { NotFoundPage } from '@app/_components/NotFoundPage'

// 404 de URL desconhecida: cai aqui porque nenhuma rota casa, o que preserva o
// status 404 e a renderização no servidor. O idioma vem do proxy.
export default async function NotFound() {
  const locale = await getLocale()
  const messages = await getMessages({ locale })

  return (
    <SiteDocument locale={locale} messages={messages}>
      <NotFoundPage />
    </SiteDocument>
  )
}
