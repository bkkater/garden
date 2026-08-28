# Garden Psychedelia — site

Site da **Garden Psychedelia**, banda de Campos dos Goytacazes (RJ), ativa desde
2019. Apresentação da banda, discografia, registros ao vivo e contato.

## O que é

- **App**: Next.js 16 (App Router) + React 19, estilizado com Tailwind CSS v4.
- **Visual**: efeito de vídeo com shader via `three` / `@react-three/fiber`
  (Client Component, carregado fora do bundle de entrada), transição de rota em
  fade, tipografia self-hosted via `next/font` (Fraunces, Syne, IBM Plex Mono).
- **Idioma**: pt-BR. Conteúdo editorial fica em [`garden/lib/`](garden/lib/)
  (`content.js`, `media.js`, `gallery.json`).
- **Renderização**: páginas estáticas (SSG) com metadata/OpenGraph por rota,
  `sitemap.xml`, `robots.txt` e JSON-LD `MusicGroup`.
- **Deploy**: container Node rodando `next start` (build `output: 'standalone'`).

### Estrutura do repositório

```
.
├── Dockerfile            # multi-stage: deps -> build (next) -> runner (node server.js)
├── docker-compose.yml    # serviços "garden" (produção) e "garden-dev" (dev)
└── garden/               # a aplicação Next
    ├── app/              # rotas (page.jsx), layout, template, sitemap, robots, not-found
    ├── components/       # SiteChrome, Navigation, ShaderVideo(+Client), LiveGallery, PageShell, PageHead
    ├── lib/              # content.js, media.js, gallery.json, theme.js, site.js
    ├── shaders/          # shader do vídeo de fundo
    ├── public/           # imagens, capas, pôsteres, vídeo
    └── scripts/          # import-photos.py (processamento do acervo de fotos)
```

### Rotas

| Caminho    | Página  |
| ---------- | ------- |
| `/`        | Home    |
| `/banda`   | Banda   |
| `/ao-vivo` | Ao vivo |
| `/sons`    | Sons    |
| `/contato` | Contato |

Qualquer outra rota cai em `app/not-found.jsx` (HTTP 404, com link para a Home).

## Como rodar

### Local (Node)

Requisitos: **Node 22+** e npm.

```bash
cd garden
npm install
npm run dev
```

Abre em `http://localhost:3000`.

Outros scripts (dentro de `garden/`):

```bash
npm run build   # next build (gera .next/ e .next/standalone/)
npm run start   # serve o build de produção
npm run lint    # oxlint
```

### Docker (produção)

Requisitos: Docker + Docker Compose.

```bash
docker compose up --build
```

Sobe o container `garden`: `next build` roda no estágio de build e o estágio
runner executa `node server.js` (output standalone) em `http://localhost:8080`.

### Docker (desenvolvimento com hot reload)

```bash
docker compose --profile dev up garden-dev
```

Monta `./garden` em `node:22-alpine`, roda `npm ci` + `next dev` e expõe
`http://localhost:3000` (`WATCHPACK_POLLING` liga o watch dentro do container).

## Variáveis de ambiente

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Domínio público, usado em metadata (OpenGraph, canonical), `sitemap.xml` e `robots.txt`. **É embutido em build** — no Docker entra como build arg (ver `docker-compose.yml`). Sem barra final. |

Ver [`garden/.env.example`](garden/.env.example).

## Detalhes do build Docker

O [`Dockerfile`](Dockerfile) tem três estágios (contexto de build: `./garden`):

1. **deps** (`node:22-alpine`): `npm ci`.
2. **build**: `npm run build` com `NEXT_PUBLIC_SITE_URL` vindo de `ARG`.
3. **runner**: copia `.next/standalone` + `.next/static` + `public` e roda
   `node server.js` como usuário não-root na porta 3000.

## Temas

[`garden/lib/theme.js`](garden/lib/theme.js) tem `ACTIVE_THEME` (`night` | `ember`).
Trocar o valor muda as cores do site (via `@theme` / `[data-theme]` em
`app/globals.css`) e os parâmetros do shader do vídeo ao mesmo tempo.

## Script de fotos

[`garden/scripts/import-photos.py`](garden/scripts/import-photos.py) é um utilitário
pontual (Python + Pillow) que redimensiona e seleciona fotos do acervo da banda,
copia para `garden/public/live/` e regenera `garden/lib/gallery.json`. Os caminhos
de origem/destino são fixos para a máquina onde foi usado — ajuste as constantes
`SRC` e `DEST` antes de rodar (e o destino do JSON, hoje `src/data/`).
