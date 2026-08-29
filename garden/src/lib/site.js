// Config do site.

// URL de produção. Defina NEXT_PUBLIC_SITE_URL no ambiente de deploy;
// o fallback existe só para o build local não quebrar.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://gardenpsychedelia.vercel.app'
).replace(/\/$/, '');

// Ano da agenda em aberto — aparece em várias páginas ("Agenda 2026 aberta").
// Vira o único lugar para virar o ano.
export const AGENDA_YEAR = 2026;
