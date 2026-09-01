import raw from './gallery.json'

// Fotos ao vivo (regenera com scripts/import-photos.py).
export const liveGallery = raw.map(({ src, event, credit, wide }) => ({
  src,
  event,
  credit,
  wide,
}))

// Agrupa as fotos por evento, preservando a ordem de aparição.
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
