/**
 * Tema — Garden Psychedelia
 *
 * Só o que a versão Next precisa em JS:
 *  - a paleta de cores das duas variações (usada pelo shader do vídeo);
 *  - os parâmetros do shader por tema.
 *
 * As cores para CSS/Tailwind vivem em app/globals.css (@theme + [data-theme]).
 * Espaçamento, grids e tamanhos de mídia foram descartados na migração —
 * o layout usa a escala padrão do Tailwind.
 *
 * Para trocar o visual: mude ACTIVE_THEME. app/layout.jsx aplica isso no
 * <html data-theme>, e o shader lê via getShaderSettings().
 */

export const ACTIVE_THEME = 'night'

export const themes = {
  night: {
    colors: {
      bg: '#080808',
      accent: '#e31b23',
    },
    shader: {
      gridSize: 72,
      dotSize: 0.42,
      contrast: 1.4,
      brightness: 0.08,
      effectStrength: 0.82,
    },
  },
  ember: {
    colors: {
      bg: '#0c0706',
      accent: '#ff4d1a',
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

export function hexToRgb(hex) {
  const raw = hex.replace('#', '')
  const value =
    raw.length === 3
      ? raw
          .split('')
          .map((char) => char + char)
          .join('')
      : raw
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
    color: hexToRgb(theme.colors.accent),
    clearColor: theme.colors.bg,
  }
}
