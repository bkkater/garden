/**
 * Catálogo de imagens, logos e vídeo.
 * Fotos ao vivo: src/data/gallery.json (regenera com scripts/import-photos.py)
 */

import gallery from './gallery.json'

export const logos = {
  badge: '/logos/logo-badge.png',
  red: '/logos/logo-red.png',
}

export const video = {
  background: '/video/garden-live.mp4',
}

export const covers = {
  dbawot: '/covers/dbawot.jpg',
}

export const posterFiles = {
  weirdParty1: '/posters/weird-party-1.jpg',
  weirdParty2: '/posters/weird-party-2.jpg',
  weirdParty3: '/posters/weird-party-3.jpg',
  weirdParty4: '/posters/weird-party-4.jpg',
}

export const memberPhotos = {
  milton: '/members/milton-vocalista.jpg',
  gabriel: '/members/gabriel-guitarrista.jpg',
  matheus: '/members/matheus-guitarrista.jpg',
  bob: '/members/bob-baixista.jpg',
  bianca: '/members/bianca-baterista.jpg',
}

export const livePhotos = {
  festivalGabriel: '/live/festival/hyakuya-01.jpg',
  festivalMilton: '/live/festival/hyakuya-02.jpg',
  festivalBand: '/live/festival/hyakuya-03.jpg',
  festivalCrowd: '/live/festival/maurinho-01.jpg',
  festivalSmile: '/live/festival/min-01.jpg',
  wp1Bianca: '/live/weird-party-1/hyakuya-01.jpg',
  wp2Bianca: '/live/weird-party-2/hyakuya-01.jpg',
  wp3Milton: '/live/weird-party-3/hyakuya-01.jpg',
  wp4Milton: '/live/weird-party-4/hyakuya-01.jpg',
  wp4Matheus: '/live/weird-party-4/waguin-01.jpg',
}

export const bandaMedia = {
  hero: {
    src: livePhotos.festivalBand,
    alt: 'Garden Psychedelia no Festival Troque o Disco',
    caption: 'Festival Troque o Disco · foto Hyakuya',
  },
}

export const ep1Media = [
  { src: '/ep1/ep1-01.jpg', alt: 'A Garden caminhando à beira da represa, uma placa escrita DBAWOT' },
  { src: '/ep1/ep1-02.jpg', alt: 'A banda em volta de uma manta com instrumentos, tintas e um cavalete' },
  { src: '/ep1/ep1-03.jpg', alt: 'Os cinco integrantes vistos de baixo, cabeças formando um círculo' },
  { src: '/ep1/ep1-04.jpg', alt: 'A Garden em pé no meio do mato, luz de fim de tarde' },
  { src: '/ep1/ep1-05.jpg', alt: 'Retrato da banda no campo, olhando para a câmera' },
  { src: '/ep1/ep1-06.jpg', alt: 'Duas guitarras e baquetas largadas na grama' },
]

export const contatoMedia = {
  figure: {
    src: logos.badge,
    alt: 'Selo Garden Psychedelia',
  },
}

export const liveGallery = gallery.map(({ src, event, credit, wide }) => ({
  src,
  event,
  credit,
  wide,
}))

export function galleryByEvent(items = liveGallery) {
  const order = []
  const groups = new Map()

  items.forEach((shot) => {
    if (!groups.has(shot.event)) {
      groups.set(shot.event, [])
      order.push(shot.event)
    }
    groups.get(shot.event).push(shot)
  })

  return order.map((event) => ({ event, shots: groups.get(event) }))
}
