import {
  covers,
  liveGallery,
  livePhotos,
  memberPhotos,
  memberSlides,
  posterFiles,
} from './media';
import { AGENDA_YEAR } from '@shared/lib/site';

export const band = {
  name: 'Garden Psychedelia',
  since: 2019,
  city: 'Campos dos Goytacazes',
  state: 'RJ',
  email: 'talktogarden@gmail.com',
  instagram: 'https://www.instagram.com/gardenpsychedelia',
  spotify: 'https://open.spotify.com/intl-pt/artist/2Gz78gC3i0E5nLHKwzfGGh',
  youtube: 'https://www.youtube.com/channel/UC6rGfPAbTqQWj3DCwdwvaDw',
  tiktok: 'https://www.tiktok.com/@gardenpsyched',
  monthlyListeners: 60,
  followers: 438,
  quote:
    'A apoteose da amizade. A explosão energética gerada por estética e demanda. A Garden existe para suprir a necessidade da expressão genuína.',
  about:
    'Desde 2019, por amigos e para todos. Nossa base é Rock and Roll, mas nossas referências são maiores que os nossos rótulos. Vivemos a produção, mas namoramos a plateia. Queremos te provocar, queremos te impressionar. Agenda sempre aberta.',
  live:
    'Com cinco shows em diferentes espaços e encontros, 2025 foi um ano de expansão e consolidação da Garden nos palcos, fortalecendo a conexão entre sua música autoral e a comunidade que movimenta a cultura independente da cidade. Em 2026, a Garden abre um novo capítulo com o single “DBAWOT” e a chegada de um novo EP,',
};

export const members = [
  { name: 'Milton', role: 'Vocal', image: memberPhotos.milton, images: memberSlides.milton },
  { name: 'Gabriel', role: 'Guitarra', image: memberPhotos.gabriel, images: memberSlides.gabriel },
  { name: 'Matheus', role: 'Guitarra', image: memberPhotos.matheus, images: memberSlides.matheus },
  { name: 'Bianca', role: 'Bateria', image: memberPhotos.bianca, images: memberSlides.bianca },
  { name: 'Bob', role: 'Baixo', image: memberPhotos.bob, images: memberSlides.bob },
];

export const navItems = [
  { to: '/banda', index: '01', label: 'A banda' },
  { to: '/shows', index: '02', label: 'Shows' },
  { to: '/sons', index: '03', label: 'Nossas músicas' },
  { to: '/contato', index: '04', label: 'Contato' },
];

// Home = vitrine. Uma linha por seção, cada uma linkando para a página cheia.
export const homeIntro =
  'Psicodelia como referência. Alternativo por natureza.';

export const homeSections = [
  {
    to: '/banda',
    index: '01',
    label: 'Banda',
    cta: 'Conhecer a banda',
    teaser: 'Cinco amigos em Campos dos Goytacazes, na cena do rock alternativo desde 2019.',
    image: livePhotos.festivalBand,
  },
  {
    to: '/shows',
    index: '02',
    label: 'Shows',
    cta: 'Ver a agenda',
    teaser: 'Festival Troque o Disco, as Weird Parties e próximos shows.',
    image: posterFiles.weirdParty4,
  },
  {
    to: '/sons',
    index: '03',
    label: 'Sons',
    cta: 'Ouvir a Garden',
    teaser: 'Dbawot é o lançamento mais recente e marca a volta da Garden.',
    image: covers.dbawot,
  },
  {
    to: '/contato',
    index: '04',
    label: 'Contato',
    cta: 'Falar com a Garden',
    teaser:
      'talktogarden@gmail.com — para shows, festivais e o corre do ao vivo.',
    image: livePhotos.wp3Milton,
  },
];

// Estado da agenda em aberto. O ano vem de AGENDA_YEAR (lib/site.js).
export const agenda = {
  year: AGENDA_YEAR,
  status: `A agenda ${AGENDA_YEAR} está aberta.`,
  detail: 'Ainda sem datas confirmadas. ',
  upcoming: [],
};

// Já rolou — retrospectiva (2019–2024).
export const events = [
  {
    title: 'Festival Troque o Disco',
    note: 'Performance ao vivo na III edição do maior festival de música de Campos dos Goytacazes.',
  },
  {
    title: 'Weird Party 1–4',
    note: 'Série de noites da Garden: set ao vivo, DJs, exposição e casa lotada.',
  },
];

export const posters = [
  { src: posterFiles.weirdParty1, title: 'Weird Party 1' },
  { src: posterFiles.weirdParty2, title: 'Weird Party 2' },
  { src: posterFiles.weirdParty3, title: 'Weird Party 3' },
  { src: posterFiles.weirdParty4, title: 'Weird Xmas Party' },
];

export const gallery = liveGallery;

// Redes — usado na /contato e no footer. `key` casa com o ícone em SocialLinks.
export const socials = [
  {
    key: 'instagram',
    label: 'Instagram',
    handle: '@gardenpsychedelia',
    url: band.instagram,
  },
  {
    key: 'youtube',
    label: 'YouTube',
    handle: 'Garden Psychedelia',
    url: band.youtube,
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    handle: '@gardenpsyched',
    url: band.tiktok,
  },
  {
    key: 'spotify',
    label: 'Spotify',
    handle: 'Garden Psychedelia',
    url: band.spotify,
  },
];
