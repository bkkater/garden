# Plano de migração — Vite SPA → Next.js + Tailwind

## Decisões fixadas

| Tema | Decisão |
|---|---|
| Linguagem | **JavaScript** (`.jsx` / `.js`) — sem TypeScript |
| Framework | **Next.js 15** (App Router) |
| CSS | **Tailwind CSS v4** |
| Deploy | **Runtime Node** — `next start`, `output: 'standalone'`, container Node (sem Nginx) |
| Transição de página | **Simplificar** — fade via `template.jsx` / View Transitions API. Remove o `PageTransition` (canvas Bayer) |
| Espaçamento | **Não** portar tokens de espaçamento/layout. Usa a escala padrão do Tailwind. Só ratios de grid triviais viram utilitários padrão |
| Cores | **Manter** as duas paletas (`night`, `ember`) |
| Tipografia | **Manter** Fraunces / Syne / IBM Plex Mono (via `next/font`) |

---

## O que fica, o que sai

### Mantém (com adaptação)
- `src/data/content.js`, `src/data/media.js`, `src/data/gallery.json` — praticamente intactos (só ajuste de import de assets, ver Fase 4).
- `src/shaders/videoShader.js` — intacto.
- `src/components/ShaderVideo.jsx` — vira Client Component + import dinâmico.
- Paleta de cores (7 cores × 2 temas) e a função de troca de tema.
- Parâmetros do shader por tema (`gridSize`, `dotSize`, `contrast`, `brightness`, `effectStrength`).
- Grão (grain SVG), `mix-blend-mode` do nav, filtros de imagem (`contrast`/`saturate`/`grayscale`).

### Sai
- `vite.config.js`, `index.html` — substituídos pelo Next.
- `src/main.jsx`, `src/App.jsx` (`BrowserRouter`/`Routes`) — substituídos por App Router.
- `react-router-dom` — trocado por `next/link` + `next/navigation`.
- `src/components/PageTransition.jsx` — removido.
- `src/components/Layout.jsx` — vira `app/layout.jsx` + `app/(site)/layout.jsx`.
- **Tokens de espaçamento/layout/media** do `tokens.js` e do `:root` (`--space-*`, `--layout-*`, `--media-*`, `--page-main-offset`).
- Quase todo o `src/index.css` (870 linhas) — reescrito como classes Tailwind nos componentes + um `globals.css` mínimo.
- A media query única `@media (max-width: 900px)` — vira prefixos responsivos do Tailwind (`lg:`).

---

## Estrutura alvo

```
garden/
├── next.config.mjs           # output: 'standalone'
├── jsconfig.json             # paths @/*
├── postcss.config.mjs        # @tailwindcss/postcss
├── .oxlintrc.json            # mantém
├── app/
│   ├── layout.jsx            # <html>, fontes, <body>, metadata base, tema
│   ├── globals.css           # @import "tailwindcss" + @theme + camada base
│   ├── page.jsx              # Home  (/)
│   ├── template.jsx          # fade entre rotas
│   ├── not-found.jsx         # redireciona / equivalente ao Navigate "*"
│   ├── banda/page.jsx
│   ├── ao-vivo/page.jsx
│   ├── sons/page.jsx
│   ├── contato/page.jsx
│   ├── sitemap.js
│   └── robots.js
├── components/
│   ├── SiteChrome.jsx        # <- ex-Layout: stage + nav + main + grain
│   ├── Navigation.jsx        # next/link, usePathname
│   ├── ShaderVideo.jsx       # 'use client'
│   ├── ShaderVideo.client.jsx# wrapper com next/dynamic ssr:false
│   ├── Lightbox.jsx          # 'use client' (extraído do AoVivo)
│   └── ThemeInit.jsx         # 'use client' — aplica data-theme + vars
├── lib/
│   ├── theme.js              # <- ex-tokens.js, só cores + fontes + shader
│   └── content.js, media.js, gallery.json   (movidos de src/data)
├── shaders/videoShader.js
├── public/                   # imagens/vídeo — sem mudança
└── package.json
```

---

## Fases

### Fase 0 — Branch e baseline
1. `git checkout -b next-tailwind-migration`.
2. Rodar `npm run build` atual e tirar screenshots das 5 rotas (desktop + mobile) como referência visual de regressão.

### Fase 1 — Esqueleto Next
1. Instalar: `next react react-dom` (atualizar), remover `react-router-dom`, `@vitejs/plugin-react`, `vite`.
2. Instalar Tailwind v4: `tailwindcss @tailwindcss/postcss postcss`.
3. Criar `next.config.mjs`:
   ```js
   const nextConfig = { output: 'standalone', reactStrictMode: true }
   export default nextConfig
   ```
4. `package.json` scripts: `dev: next dev`, `build: next build`, `start: next start`, `lint: oxlint` (mantém).
5. `jsconfig.json` com `paths: { "@/*": ["./*"] }`.
6. `app/globals.css`:
   ```css
   @import "tailwindcss";

   @theme {
     --color-bg: #080808;
     --color-fg: #eadcc4;
     --color-accent: #e31b23;
     --color-muted: #9a8f82;
     --color-line: rgba(234, 220, 196, 0.18);
     --color-copy: #d8ccb8;
     --color-overlay: rgba(8, 8, 8, 0.92);
     --font-display: var(--font-syne);
     --font-serif: var(--font-fraunces);
     --font-mono: var(--font-plex-mono);
   }

   /* tema ember sobrescreve as vars quando data-theme="ember" */
   [data-theme="ember"] {
     --color-bg: #0c0706;
     --color-fg: #f3d7b0;
     --color-accent: #ff4d1a;
     --color-muted: #a88972;
     --color-line: rgba(243, 215, 176, 0.18);
     --color-copy: #e4c9a6;
     --color-overlay: rgba(12, 7, 6, 0.92);
   }
   ```
   Assim `bg-bg`, `text-fg`, `text-accent`, `border-line`, `font-serif` etc. já existem como utilitários e trocam com o tema.
7. Camada base no `globals.css` (o que a preflight do Tailwind não cobre):
   ```css
   @layer base {
     body { @apply bg-bg text-fg font-display; overflow-x: hidden; }
     .grain { /* fixed inset-0 z-[6] pointer-events-none, background-image SVG, opacity .09, mix-blend-overlay */ }
   }
   ```

### Fase 2 — Fontes (`next/font`)
Em `app/layout.jsx`:
```js
import { Fraunces, Syne, IBM_Plex_Mono } from 'next/font/google'
const fraunces = Fraunces({ subsets: ['latin'], style: ['normal','italic'], weight: ['500','600'], variable: '--font-fraunces' })
const syne = Syne({ subsets: ['latin'], weight: ['400','700','800'], variable: '--font-syne' })
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400','500'], variable: '--font-plex-mono' })
```
`<html className={`${fraunces.variable} ${syne.variable} ${plexMono.variable}`} lang="pt-BR">`.
Remove os `<link>` de Google Fonts do HTML (self-host automático, sem render-blocking).

### Fase 3 — `lib/theme.js` enxuto
Do `tokens.js` atual, manter **apenas**:
- `ACTIVE_THEME`
- `themes[name].colors` (7 cores)
- `themes[name].fonts` (mantido para o shader, se precisar; senão remover)
- `themes[name].effects` (`grainOpacity`, `navBlend`)
- `themes[name].shader` (todos os números)
- `hexToRgb`, `getTheme`, `getShaderSettings`
Remover: `layout` inteiro (`space`, `grids`, `media`), e todas as linhas de `applyTheme` que setam `--space-*`, `--layout-*`, `--media-*`, `--page-main-offset`.
Novo `applyTheme` reduzido: só seta `data-theme` + (opcional) as vars de cor/efeito que o shader/canvas leem via `getComputedStyle`. Como as cores agora vêm do `@theme` + `[data-theme]` no CSS, `applyTheme` pode virar só `root.dataset.theme = name`.

### Fase 4 — Dados e assets
1. Mover `src/data/*` → `lib/`. Ajustar imports.
2. `media.js`: os caminhos já são strings absolutas (`/video/garden-live.mp4`, `/members/...`) servidas de `public/` — **funcionam igual no Next**. Nenhuma mudança de path necessária.
3. `src/assets/hero.png` (import via bundler) → mover para `public/` e referenciar por string, ou manter import estático (Next aceita import de imagem em `public`? não — usar `import hero from '@/public/hero.png'` com `next/image`, ou string `/hero.png`). Verificar onde `hero.png` é usado (hoje não aparece nas páginas lidas — pode estar órfão; confirmar e possivelmente deletar).

### Fase 5 — `ShaderVideo` (Client Component)
1. `components/ShaderVideo.jsx`: adicionar `'use client'` no topo. Código do composer/`useFrame` praticamente intacto.
2. Criar `components/ShaderVideo.client.jsx`:
   ```js
   'use client'
   import dynamic from 'next/dynamic'
   export default dynamic(() => import('./ShaderVideo'), { ssr: false })
   ```
   Isso tira `three` + `@react-three/fiber` (~150KB gzip) do bundle de entrada e do SSR.
3. Classes: `.shader-video` e filhos viram utilitários (`relative w-full h-full`, `<video>` → `absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none`, `<canvas>` → `block w-full! h-full!`).
4. **Melhorias de perf a incluir de brinde** (baixo custo, alto retorno — ver seção final):
   - pausar `useFrame` quando fora da viewport (`IntersectionObserver`) e em `document.hidden`.
   - `preload="metadata"` em vez de `auto`.
   - não montar se `prefers-reduced-motion` → fallback `bg-bg`.

### Fase 6 — Chrome do site (ex-Layout + Navigation)
1. `app/layout.jsx` (Server Component): `<html>`, fontes, `<body>`, `<ThemeInit />`, `metadata` base (título, descrição, OpenGraph, `metadataBase`).
2. `components/SiteChrome.jsx` (Server, ou Client se precisar de `usePathname` para o estado home/página — provavelmente Client leve):
   ```
   <div class="min-h-screen">
     <div class="fixed inset-0 z-0"><ShaderVideoClient /></div>
     <Navigation />
     <main class="relative z-[2]">{children}</main>
     <div class="grain" aria-hidden />
   </div>
   ```
   O offset de `main.is-page` (`margin-top: 46vh` + gradiente) hoje depende da rota. Recriar com: cada `page.jsx` de subpágina envolve o conteúdo numa `<section class="relative z-[2] bg-bg mt-[46vh] ...">` própria, ou um componente `<PageShell>`. `46vh` é layout — como a regra manda largar espaçamento custom, substituir por um valor padrão (`mt-[50vh]` arbitrário aceitável, ou repensar o hero para não precisar de offset).
3. `components/Navigation.jsx` (`'use client'`): `usePathname()` no lugar de `useLocation()`, `<Link href>` no lugar de `goTo`. `navItems` de `lib/content.js` intacto. Classes:
   - `.site-nav` → `fixed inset-x-0 top-0 z-[8] grid grid-cols-[auto_1fr_auto] gap-6 items-center px-8 py-5 mix-blend-difference lg:mix-blend-difference` — **mas** px-8/py-5 é espaçamento custom; usar escala Tailwind (`px-6 py-4` etc.).
   - mobile (`@media max-width:900px`) → base mobile-first: `grid-cols-1 mix-blend-normal bg-gradient-to-b from-bg to-transparent`, e `lg:` restaura desktop.
   - `.nav-mail` some no mobile → `hidden lg:block`.
   - hover accent → `hover:text-accent`.

### Fase 7 — Páginas (reescrita de CSS → Tailwind)
Para cada página, converter as classes semânticas do `index.css` em utilitários inline. Regras de conversão:

| Padrão atual | Vira |
|---|---|
| `grid-template-columns: repeat(5,1fr)` (`--layout-members`) | `grid grid-cols-2 lg:grid-cols-5` |
| `repeat(3,1fr)` (strip, events) | `grid grid-cols-2 lg:grid-cols-3` |
| `repeat(4,1fr)` (posters, gallery) | `grid grid-cols-2 lg:grid-cols-4` |
| `1.1fr 0.9fr`, `0.9fr 1.1fr`, `1fr 320px` | `grid grid-cols-1 lg:grid-cols-2` (larga o ratio custom) |
| `clamp(40px,7vw,92px)` etc. (tipografia) | **mantém** como `text-[clamp(40px,7vw,92px)]` |
| `font-family: var(--font-mono)` + `letter-spacing` + `uppercase` (o "kicker"/tag repetido) | componente `<Kicker>` ou `@utility kicker` no globals.css |
| `border-top/bottom: 1px solid var(--color-line)` | `border-t border-line` |
| `filter: contrast(1.12) saturate(0.85)` | `[filter:contrast(1.12)_saturate(.85)]` (arbitrário — é tratamento visual, não espaçamento) |
| `animation: rise .8s` | `motion-safe:animate-[rise_.8s_ease_both]` + `@keyframes rise` no globals.css |
| `mix-blend-mode: screen/difference/overlay` | `mix-blend-screen` / `mix-blend-difference` / `mix-blend-overlay` |
| paddings de página (`--space-page-*`) | escala padrão: `px-4 lg:px-8 pt-12 pb-28` (valores padrão, não os 32/48/120 originais) |

Ordem sugerida: `Home` → `Contato` (mais simples) → `Sons` → `Banda` → `AoVivo` (tem lightbox com estado).

- **Home** (`app/page.jsx`): Server Component. Só os botões de nav são `<Link>`. Remove a lógica `layout.home.menu` (era config de espaçamento) — fixa no layout "top".
- **AoVivo**: extrair o lightbox para `components/Lightbox.jsx` (`'use client'`, `useState`). O resto da página pode ser Server Component passando `groups` como prop para um `<Gallery>` client.
- **Contato / Sons / Banda**: 100% Server Components (sem estado/efeito).

### Fase 8 — Transição de rota (simplificada)
`app/template.jsx`:
```js
'use client'
export default function Template({ children }) {
  return <div className="motion-safe:animate-[fadein_.4s_ease]">{children}</div>
}
```
`@keyframes fadein` no globals.css. (Opcional: adotar a View Transitions API do Next quando estabilizar.)
Remove `PageTransition.jsx` e o `key={location.pathname}` no `<main>`.

### Fase 9 — SEO (ganho da migração — aproveitar)
1. `metadata` base em `app/layout.jsx` (`metadataBase`, `title.template`, `description`, `openGraph`, `twitter`, `icons`).
2. `export const metadata` por página (`/banda`, `/ao-vivo`, `/sons`, `/contato`, `/`) com título e descrição próprios + `openGraph.images` (usar um poster ou a `covers.dbawot`).
3. `app/sitemap.js` e `app/robots.js`.
4. JSON-LD `MusicGroup` em `app/page.jsx` (`<script type="application/ld+json">`), com nome, `sameAs` (Instagram, Spotify), `foundingLocation`.
5. `app/not-found.jsx` — equivalente ao antigo `<Route path="*" element={<Navigate to="/">}`.

### Fase 10 — Docker
Novo `Dockerfile` (multi-stage, standalone):
```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY garden/package.json garden/package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY garden/ .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```
- `docker-compose.yml`: serviço `garden` passa a expor `3000`; porta host pode continuar `8080:3000`. Remove `additional_contexts: infra` e o estágio Nginx.
- **Deletar `nginx.conf`** (SPA fallback, gzip e cache passam a ser responsabilidade do Next / de um proxy à frente).
- `garden-dev` (profile dev): trocar comando para `npm run dev` na porta `3000`, remover `CHOKIDAR_USEPOLLING` (Next usa outro watcher; manter `WATCHPACK_POLLING=true` se o bind mount exigir).
- `.dockerignore`: adicionar `.next`.

### Fase 11 — Limpeza e verificação
1. Remover: `vite.config.js`, `index.html`, `src/` (após mover tudo), `@oxlint/` se não usado, deps Vite.
2. `.gitignore`: `dist` → `.next`, `out`.
3. `npm run build` + `npm run start`, conferir as 5 rotas contra os screenshots da Fase 0 (desktop + mobile).
4. Lighthouse antes/depois (esperado: grande salto em SEO e em "sem JS bloqueante"; FCP melhor por causa do SSR + fontes self-hosted).
5. Testar troca `ACTIVE_THEME = 'ember'` — cores do site e do shader devem mudar juntas.
6. Atualizar `README.md` (comandos `npm run dev`/`build`/`start`, portas, Docker).

---

## Riscos / pontos de atenção

| Risco | Mitigação |
|---|---|
| `mix-blend-mode: difference` no nav depende do que está atrás (shader). Com SSR o nav aparece antes do canvas montar → flash | `ThemeInit` + cor de fundo sólida no `<body>`; nav com `bg-gradient` de fallback no mobile já existe, estender leve no desktop |
| `three/addons/postprocessing` — paths de import podem exigir ajuste de bundler no Next (transpilePackages) | `next.config.mjs` → `transpilePackages: ['three']` se o build reclamar |
| Perda dos ratios de grid finos (`1.1fr 0.9fr`) muda levemente o layout | Aceito por decisão. Se algum ficar ruim, permitido `lg:grid-cols-[1.1fr_0.9fr]` pontual (é layout, não spacing de escala) |
| Offset `46vh` do `main.is-page` era peça central do efeito "conteúdo sobe sobre o vídeo" | Recriar com `<PageShell>` usando valor único; validar visualmente |
| `next/font` muda métrica das fontes vs. Google CDN | Diferença mínima; conferir os `clamp()` de título |
| Estado `useState(active)` do lightbox + SSR | Lightbox isolado como Client Component, resto da página fica Server |
| `hero.png` importado por bundler | Verificar uso; mover para `public/` ou `next/image` |

---

## Otimizações de perf incluídas na migração (independentes do framework, mas o momento é bom)

1. **Vídeo de fundo** — reencodar `public/video/garden-live.mp4` para ≤720p (o shader pixeliza em grade de 72, não precisa de mais), CRF alto, e adicionar `<source>` WebM/AV1. Maior ganho de peso disponível.
2. **Loop do shader** — pausar `useFrame`/`composer.render()` fora da viewport e com aba oculta; limitar a ~30fps com acumulador de `delta`.
3. **`dpr`** — `[1, 1.25]` em telas pequenas.
4. **`prefers-reduced-motion`** — não montar o canvas; mostrar `bg-bg`.
5. **`preload="metadata"`** no `<video>` em vez de `auto`.
6. **Imagens** — como o deploy é Node, usar `next/image` nas fotos das galerias/membros (`sizes` corretos, lazy, formatos modernos automáticos). Aposenta parte do trabalho manual do `import-photos.py`.

---

## Esforço estimado

| Fase | Escopo |
|---|---|
| 1–4 (esqueleto, tema, fontes, dados) | ~meio dia |
| 5–6 (shader, chrome, nav) | ~meio dia |
| 7 (5 páginas em Tailwind) | ~1–1,5 dia |
| 8–9 (transição, SEO) | ~meio dia |
| 10–11 (Docker, limpeza, QA visual) | ~meio dia |

Total: **~3–4 dias** de trabalho focado.
