// mm:ss — '0:00' para valores inválidos.
export function fmt(s) {
  if (!s || Number.isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, '0')
  return `${m}:${sec}`
}
