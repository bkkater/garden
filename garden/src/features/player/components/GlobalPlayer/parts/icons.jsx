// Ícones inline do player (sem dependência extra).

export function IconPlay({ size = 14 }) {
  const h = Math.round((size * 16) / 14)
  return (
    <svg width={size} height={h} viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
      <path d="M0 0l14 8L0 16V0z" />
    </svg>
  )
}

export function IconPause({ size = 14 }) {
  const h = Math.round((size * 16) / 14)
  return (
    <svg width={size} height={h} viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
      <rect x="0" y="0" width="4" height="16" rx="1.5" />
      <rect x="10" y="0" width="4" height="16" rx="1.5" />
    </svg>
  )
}

export function IconVolume({ muted }) {
  return muted ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

export function IconMaximize() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  )
}

export function IconMinimize() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export function IconClose({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}
