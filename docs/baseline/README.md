# Baseline visual — antes da migração Next + Tailwind

Capturado em 2026-08-27, branch `next-tailwind-improvements`, a partir do build Vite
atual (`npm run build` + `npm run preview`).

Servem de referência de regressão visual para comparar contra a versão Next durante
e ao fim da migração (Fase 11 do plano).

## Como foram tiradas

- Playwright / Chromium headless, `fullPage`, `deviceScaleFactor: 2`.
- Espera de 1,8s por rota (assentar shader do vídeo + animação `rise`).
- Desktop: viewport 1440×900. Mobile: viewport 390×844.
- JPEG quality 55 (originais PNG descartados por peso).

## Rotas

| Arquivo | Rota |
|---|---|
| `home-{desktop,mobile}.jpg` | `/` |
| `banda-{desktop,mobile}.jpg` | `/banda` |
| `ao-vivo-{desktop,mobile}.jpg` | `/ao-vivo` |
| `sons-{desktop,mobile}.jpg` | `/sons` |
| `contato-{desktop,mobile}.jpg` | `/contato` |

## Métricas do build Vite atual (para comparar depois)

| Artefato | Tamanho | Gzip |
|---|---|---|
| `dist/assets/index-*.js` | 1.144,72 kB | 316,59 kB |
| `dist/assets/index-*.css` | 11,95 kB | 3,11 kB |
| `dist/index.html` | 0,84 kB | 0,46 kB |
| `dist/` total (com assets em public) | ~28 MB | — |

Observações:
- Bundle único, sem code-splitting — `three` + `@react-three/fiber` entram no JS de entrada.
- HTML de entrada é só `<div id="root">` (0,84 kB) — nada de conteúdo/SEO no HTML.
- Sem meta tags por rota, sem OpenGraph, sem sitemap.
- Fontes carregadas do CDN do Google (render-blocking).

## Notas visuais a preservar

- Shader halftone/dithering cobrindo o topo (hero) em todas as rotas.
- Subpáginas: conteúdo sobe sobre o vídeo com gradiente para preto (`main.is-page`, offset ~46vh).
- Nav com `mix-blend-mode: difference` no desktop; vira barra sólida com gradiente no mobile.
- Título "Psychedelia" em vermelho accent com `mix-blend-mode: screen`.
- Grão (grain SVG) sobre tudo, `mix-blend-mode: overlay`, opacidade 0.09.
- Hover de fotos: `scale(1.04)` + aumento de contraste / queda de saturação.
