/**
 * Design system — Garden Psychedelia
 *
 * Cores: mude ACTIVE_THEME ('night' | 'ember') ou edite `themes`.
 * Layout: edite `layout` (grids, tamanhos de foto, posição do menu da home).
 * Imagens: edite src/data/media.js
 */

export const ACTIVE_THEME = 'night'

export const themes = {
  night: {
    colors: {
      bg: '#080808',
      fg: '#eadcc4',
      accent: '#e31b23',
      muted: '#9a8f82',
      line: 'rgba(234, 220, 196, 0.18)',
      copy: '#d8ccb8',
      overlay: 'rgba(8, 8, 8, 0.92)',
    },
    fonts: {
      display: "'Syne', sans-serif",
      serif: "'Fraunces', serif",
      mono: "'IBM Plex Mono', monospace",
    },
    effects: {
      grainOpacity: '0.09',
      navBlend: 'difference',
    },
    shader: {
      gridSize: 72,
      dotSize: 0.55,
      contrast: 1.4,
      brightness: 0.08,
      effectStrength: 0.82,
    },
  },
  ember: {
    colors: {
      bg: '#0c0706',
      fg: '#f3d7b0',
      accent: '#ff4d1a',
      muted: '#a88972',
      line: 'rgba(243, 215, 176, 0.18)',
      copy: '#e4c9a6',
      overlay: 'rgba(12, 7, 6, 0.92)',
    },
    fonts: {
      display: "'Syne', sans-serif",
      serif: "'Fraunces', serif",
      mono: "'IBM Plex Mono', monospace",
    },
    effects: {
      grainOpacity: '0.11',
      navBlend: 'difference',
    },
    shader: {
      gridSize: 64,
      dotSize: 0.5,
      contrast: 1.35,
      brightness: 0.1,
      effectStrength: 0.88,
    },
  },
}

export const layout = {
  home: {
    // 'top' | 'bottom-right' | 'header'
    menu: 'top',
  },
  space: {
    pageX: '32px',
    pageXMobile: '16px',
    pageTop: '48px',
    pageBottom: '120px',
    navY: '22px',
    navX: '32px',
    homeTop: '110px',
    homeBottom: '36px',
  },
  grids: {
    banda: '1.1fr 0.9fr',
    members: 'repeat(5, 1fr)',
    strip: 'repeat(3, 1fr)',
    events: 'repeat(3, 1fr)',
    posters: 'repeat(4, 1fr)',
    gallery: 'repeat(4, 1fr)',
    featured: '0.9fr 1.1fr',
    contato: '1fr 320px',
    homeFoot: 'minmax(0, 520px) 1fr',
    compact: '1fr 1fr',
  },
  media: {
    bandaHeroHeight: '70vh',
    memberHeight: '58vh',
    memberPosition: 'center 18%',
    stripHeight: '280px',
    shotMinHeight: '280px',
    pageOffset: '46vh',
  },
}

export function hexToRgb(hex) {
  const raw = hex.replace('#', '')
  const value = raw.length === 3 ? raw.split('').map((char) => char + char).join('') : raw
  const int = parseInt(value, 16)
  return [(int >> 16) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255]
}

export function getTheme(name = ACTIVE_THEME) {
  return themes[name] ?? themes.night
}

export function getShaderSettings(name = ACTIVE_THEME) {
  const theme = getTheme(name)
  return {
    ...theme.shader,
    color: theme.shader.color ?? hexToRgb(theme.colors.accent),
    clearColor: theme.colors.bg,
  }
}

export function applyTheme(name = ACTIVE_THEME) {
  const theme = getTheme(name)
  const root = document.documentElement
  const { colors, fonts, effects } = theme

  root.dataset.theme = name

  root.style.setProperty('--color-bg', colors.bg)
  root.style.setProperty('--color-fg', colors.fg)
  root.style.setProperty('--color-accent', colors.accent)
  root.style.setProperty('--color-muted', colors.muted)
  root.style.setProperty('--color-line', colors.line)
  root.style.setProperty('--color-copy', colors.copy)
  root.style.setProperty('--color-overlay', colors.overlay)

  root.style.setProperty('--font-display', fonts.display)
  root.style.setProperty('--font-serif', fonts.serif)
  root.style.setProperty('--font-mono', fonts.mono)

  root.style.setProperty('--grain-opacity', effects.grainOpacity)
  root.style.setProperty('--nav-blend', effects.navBlend)

  root.style.setProperty('--space-page-x', layout.space.pageX)
  root.style.setProperty('--space-page-x-sm', layout.space.pageXMobile)
  root.style.setProperty('--space-page-top', layout.space.pageTop)
  root.style.setProperty('--space-page-bottom', layout.space.pageBottom)
  root.style.setProperty('--space-nav-y', layout.space.navY)
  root.style.setProperty('--space-nav-x', layout.space.navX)
  root.style.setProperty('--space-home-top', layout.space.homeTop)
  root.style.setProperty('--space-home-bottom', layout.space.homeBottom)

  root.style.setProperty('--layout-banda', layout.grids.banda)
  root.style.setProperty('--layout-members', layout.grids.members)
  root.style.setProperty('--layout-strip', layout.grids.strip)
  root.style.setProperty('--layout-events', layout.grids.events)
  root.style.setProperty('--layout-posters', layout.grids.posters)
  root.style.setProperty('--layout-gallery', layout.grids.gallery)
  root.style.setProperty('--layout-featured', layout.grids.featured)
  root.style.setProperty('--layout-contato', layout.grids.contato)
  root.style.setProperty('--layout-home-foot', layout.grids.homeFoot)

  root.style.setProperty('--media-banda-hero-h', layout.media.bandaHeroHeight)
  root.style.setProperty('--media-member-h', layout.media.memberHeight)
  root.style.setProperty('--media-member-pos', layout.media.memberPosition)
  root.style.setProperty('--media-strip-h', layout.media.stripHeight)
  root.style.setProperty('--media-shot-min-h', layout.media.shotMinHeight)
  root.style.setProperty('--page-main-offset', layout.media.pageOffset)
}
