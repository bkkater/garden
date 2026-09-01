import { bandaMedia } from '@features/band'

// Home = vitrine. Uma linha por seção, cada uma linkando para a página cheia.
// Rótulo, chamada e teaser vêm de "home.sections.<key>" no dicionário.
export const homeSections = [
  { to: '/banda', index: '01', key: 'band', image: bandaMedia.hero.src },
  { to: '/shows', index: '02', key: 'shows', image: '/posters/weird-party-4.jpg' },
  { to: '/sons', index: '03', key: 'music', image: '/covers/dbawot.jpg' },
  { to: '/contato', index: '04', key: 'contact', image: '/live/weird-party-3/hyakuya-01.jpg' },
]
