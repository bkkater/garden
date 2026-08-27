import { memberPhotos, covers, posterFiles, livePhotos, liveGallery } from './media'

export const band = {
  name: 'Garden Psychedelia',
  since: 2019,
  city: 'Campos dos Goytacazes',
  state: 'RJ',
  email: 'talktogarden@gmail.com',
  instagram: 'https://www.instagram.com/gardenpsychedelia',
  spotify: 'https://open.spotify.com/intl-pt/artist/2Gz78gC3i0E5nLHKwzfGGh',
  monthlyListeners: 60,
  followers: 438,
  quote:
    'O ponto de partida para o nascimento da Garden foi a necessidade de escutar algo diferente, algo que não esperávamos escutar. Psicodelia como referência, alternativo por natureza e sério por escolha.',
  manifesto:
    'Ecléticos, porém seletivos. Tudo é referência, não tem menção específica, mas a base é rock and roll.',
  about:
    'Desde 2019, um grupo de amigos em Campos dos Goytacazes faz um som fino, de qualidade e com muita psicodelia. As apresentações recentes são explosivas — a Garden namora o palco ao vivo e segue com agenda 2026 aberta.',
}

export const members = [
  { name: 'Milton', role: 'Vocal', image: memberPhotos.milton },
  { name: 'Gabriel', role: 'Guitarra', image: memberPhotos.gabriel },
  { name: 'Matheus', role: 'Guitarra', image: memberPhotos.matheus },
  { name: 'Bob', role: 'Baixo', image: memberPhotos.bob },
  { name: 'Bianca', role: 'Bateria', image: memberPhotos.bianca },
]

export const navItems = [
  { to: '/banda', index: '01', label: 'Banda' },
  { to: '/ao-vivo', index: '02', label: 'Ao vivo' },
  { to: '/sons', index: '03', label: 'Sons' },
  { to: '/contato', index: '04', label: 'Contato' },
]

export const releases = [
  {
    title: 'Dbawot',
    year: 2026,
    type: 'Single / Album',
    plays: '2.198',
    featured: true,
    cover: covers.dbawot,
    note: 'Lançamento mais recente. Capa orgânica, vinhas e figuras — o jardim como corpo.',
  },
  {
    title: 'We Again',
    year: 2019,
    type: 'Single',
    plays: '19.614',
    featured: false,
    cover: livePhotos.festivalBand,
    note: 'Faixa mais ouvida. O começo da Garden em disco.',
  },
  {
    title: 'Shell',
    year: 2019,
    type: 'Single',
    plays: '13.310',
    featured: false,
    cover: livePhotos.wp4Matheus,
    note: 'Casca, eco e guitarra. Ainda 2019, ainda o primeiro fôlego.',
  },
  {
    title: 'Madman',
    year: 2020,
    type: 'Single',
    plays: '6.544',
    featured: false,
    cover: livePhotos.festivalGabriel,
    note: 'O segundo ano. Mais denso, mais perto do palco.',
  },
]

export const demos = [
  'Morning Riser',
  'Éter',
  "Cos I Lov U",
  "Don't Waste My Time",
  "Don't Be",
  'Go Away',
]

export const events = [
  {
    title: 'Festival Troque o Disco',
    place: 'Campos dos Goytacazes — RJ',
    note: 'Performance ao vivo na III edição. Palco, luz e o vocal de Milton.',
  },
  {
    title: 'Weird Party 1–3',
    place: 'Tales Tabacaria · R. Saldanha Marinho, 264',
    note: 'Série de noites da Garden: set ao vivo, DJs, exposição e a casa lotada.',
  },
  {
    title: 'Weird Party 4 · Kasick Tropical',
    place: 'Dezembro 2024',
    note: 'XMAS party + Morning Riser e Go Away registrados ao vivo.',
  },
]

export const posters = [
  { src: posterFiles.weirdParty1, title: 'Weird Party 1' },
  { src: posterFiles.weirdParty2, title: 'Weird Party 2' },
  { src: posterFiles.weirdParty3, title: 'Weird Party Halloween' },
  { src: posterFiles.weirdParty4, title: 'Weird Xmas Party' },
]

export const gallery = liveGallery
