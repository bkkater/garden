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
  { name: 'Milton', role: 'Vocal', image: '/members/milton-vocalista.jpg' },
  { name: 'Gabriel', role: 'Guitarra', image: '/members/gabriel-guitarrista.jpg' },
  { name: 'Matheus', role: 'Guitarra', image: '/members/matheus-guitarrista.jpg' },
  { name: 'Bob', role: 'Baixo', image: '/members/bob-baixista.jpg' },
  { name: 'Bianca', role: 'Bateria', image: '/members/bianca-baterista.jpg' },
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
    cover: '/images/dbawot.jpg',
    note: 'Lançamento mais recente. Capa orgânica, vinhas e figuras — o jardim como corpo.',
  },
  {
    title: 'We Again',
    year: 2019,
    type: 'Single',
    plays: '19.614',
    featured: false,
    cover: '/images/live-duo.jpg',
    note: 'Faixa mais ouvida. O começo da Garden em disco.',
  },
  {
    title: 'Shell',
    year: 2019,
    type: 'Single',
    plays: '13.310',
    featured: false,
    cover: '/images/live-bob.jpg',
    note: 'Casca, eco e guitarra. Ainda 2019, ainda o primeiro fôlego.',
  },
  {
    title: 'Madman',
    year: 2020,
    type: 'Single',
    plays: '6.544',
    featured: false,
    cover: '/images/live-gabriel.jpg',
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
    title: 'Weird Party',
    place: 'Tales Tabacaria · R. Saldanha Marinho, 264',
    note: 'Série de noites da Garden: set ao vivo, DJs, exposição e a casa lotada.',
  },
  {
    title: 'Kasick Tropical',
    place: 'Dezembro 2024',
    note: 'Morning Riser e Go Away registrados ao vivo.',
  },
]

export const posters = [
  { src: '/posters/weird-party-1.jpg', title: 'Weird Party 1' },
  { src: '/posters/weird-party-2.jpg', title: 'Weird Party 2' },
  { src: '/posters/weird-party-3.jpg', title: 'Weird Party Halloween' },
]

export const gallery = [
  { src: '/images/live-duo.jpg', event: 'Festival Troque o Disco', credit: 'Hyakuya', wide: true },
  { src: '/images/live-gabriel.jpg', event: 'Festival Troque o Disco', credit: 'Maurinho', wide: false },
  { src: '/images/live-bass.jpg', event: 'Festival Troque o Disco', credit: 'Maurinho', wide: false },
  { src: '/images/live-guitars.jpg', event: 'Festival Troque o Disco', credit: 'Hyakuya', wide: false },
  { src: '/images/wp4-gabriel.jpg', event: 'Weird Party 4', credit: 'Hyakuya', wide: false },
  { src: '/images/wp4-milton.jpg', event: 'Weird Party 4', credit: 'Hyakuya', wide: true },
  { src: '/images/wp1-milton.jpg', event: 'Weird Party 1', credit: 'Hyakuya', wide: false },
  { src: '/images/wp3-gabriel.jpg', event: 'Weird Party 3', credit: 'Hyakuya', wide: false },
  { src: '/images/live-bob.jpg', event: 'Festival Troque o Disco', credit: 'Min', wide: false },
  { src: '/images/live-motion.jpg', event: 'Festival Troque o Disco', credit: 'Maurinho', wide: true },
  { src: '/images/live-milton-bob.jpg', event: 'Festival Troque o Disco', credit: 'Min', wide: false },
  { src: '/images/live-milton-stage.jpg', event: 'Festival Troque o Disco', credit: 'Hyakuya', wide: false },
]
