// Config e identidade do site.

// URL de produção. Defina NEXT_PUBLIC_SITE_URL no ambiente de deploy;
// o fallback existe só para o build local não quebrar.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://gardenpsychedelia.vercel.app'
).replace(/\/$/, '')

// Ano da agenda em aberto — aparece em várias páginas ("Agenda 2026 aberta").
// Vira o único lugar para virar o ano.
export const AGENDA_YEAR = 2026

// Identidade e contato da banda — o que o chrome (nav, footer) e as páginas
// precisam. O texto editorial da banda vive em features/band.
export const contact = {
  name: 'Garden Psychedelia',
  since: 2019,
  city: 'Campos dos Goytacazes',
  state: 'RJ',
  email: 'talktogarden@gmail.com',
  instagram: 'https://www.instagram.com/gardenpsychedelia',
  spotify: 'https://open.spotify.com/intl-pt/artist/2Gz78gC3i0E5nLHKwzfGGh',
  youtube: 'https://www.youtube.com/channel/UC6rGfPAbTqQWj3DCwdwvaDw',
  tiktok: 'https://www.tiktok.com/@gardenpsyched',
}

// Alias — a maioria dos consumidores só quer os campos de identidade.
export const band = contact

export const logo = {
  badge: '/logos/logo-badge.png',
  red: '/logos/logo-red.png',
}

export const navItems = [
  { to: '/banda', index: '01', label: 'A banda' },
  { to: '/shows', index: '02', label: 'Shows' },
  { to: '/sons', index: '03', label: 'Nossas músicas' },
  { to: '/contato', index: '04', label: 'Contato' },
]
