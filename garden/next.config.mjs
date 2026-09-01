import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 'standalone' é só para o deploy self-hosted (Docker). Na Vercel o empacotamento
  // é gerenciado por ela, e 'standalone' + Turbopack quebra a coleta de trace
  // (ENOENT .next/next-server.js.nft.json). VERCEL=1 é definido em todo build lá.
  output: process.env.VERCEL ? undefined : 'standalone',
  reactStrictMode: true,
}

export default withNextIntl(nextConfig)
