// URL de produção do site. Defina NEXT_PUBLIC_SITE_URL no ambiente de deploy;
// o fallback existe só para o build local não quebrar.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://gardenpsychedelia.com'
).replace(/\/$/, '')
