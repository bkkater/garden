# design-sync — notas

- **Este repo nao e um design system.** E o site (app Next.js `private`) da
  banda Garden Psychedelia. O `/design-sync` foi rodado como **sync leve
  off-script** a pedido explicito da usuaria (3x).
- **Sem conversor.** Nao ha `dist/` de componentes nem Storybook. O bundle
  (`ds-bundle/`) foi montado a mao:
  - `_ds_bundle.js` compilado de `scratchpad/ds-src/bundle.jsx` com esbuild
    (IIFE, global `GardenPsychedelia`, React externo via alias -> `window.React`).
  - `_vendor/react.js` = React 19.2.8 + ReactDOM empacotados (esbuild).
  - Verificacao: `scratchpad/ds-verify.mjs` + `ds-foundations.mjs` (Playwright,
    render + screenshot). Nao ha `package-validate.mjs`.
- **Escopo:** so o sistema visual — 7 cores x 2 temas, 3 familias de fonte,
  3 blocos de layout (Kicker, PageHead, Hero) + 2 fundacoes (Palette,
  Typography). Nav, shader de video e galeria do site NAO entram (sao
  especificos demais).
- **Fontes** carregadas de `fonts.googleapis.com` via `@import` em `styles.css`
  (nao os woff2 do next/font — sao 19 fragmentos de subset dificeis de casar).
- **Sem `_ds_sync.json`.** Off-script, sem recipe confiavel. Todo re-sync
  re-verifica tudo — correto.
- **Re-sync:** reconstruir `ds-bundle/` com os scripts do scratchpad, ou
  regerar. `ds-bundle/` esta no .gitignore.
- Projeto: https://claude.ai/design/p/4e74ad25-0fe5-4da8-bbb1-cf4506a4b515
