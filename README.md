# Garden Psychedelia — site

Site da **Garden Psychedelia**, banda de Campos dos Goytacazes (RJ), ativa desde 2019. Uma single-page application com apresentação da
banda, discografia, registros ao vivo e contato.

## O que é

- **App**: React 19 + React Router 7, empacotado com Vite 8.
- **Visual**: efeito de vídeo com shader via `three` / `@react-three/fiber`,
  transições de página customizadas, tipografia do Google Fonts (Fraunces, Syne,
  IBM Plex Mono).
- **Idioma**: pt-BR. Conteúdo editorial fica em [`garden/src/data/`](garden/src/data/)
  (`content.js`, `media.js`, `gallery.json`).
- **Deploy**: build estático servido por Nginx dentro de um container Docker.

### Estrutura do repositório

```
.
├── Dockerfile            # build multi-stage: Node (Vite) -> Nginx
├── docker-compose.yml    # serviços "garden" (produção) e "garden-dev" (dev)
├── nginx.conf            # config do Nginx (SPA fallback + cache de assets)
└── garden/               # a aplicação React/Vite
    ├── src/
    │   ├── pages/         # Home, Banda, AoVivo, Sons, Contato
    │   ├── components/    # Layout, Navigation, PageTransition, ShaderVideo
    │   ├── data/          # conteúdo textual, mídia e galeria
    │   ├── shaders/       # shader do vídeo
    │   └── design/        # design tokens
    ├── public/            # imagens, capas, pôsteres, vídeos
    └── scripts/           # import-photos.py (processamento do acervo de fotos)
```

### Rotas

| Caminho    | Página  |
| ---------- | ------- |
| `/`        | Home    |
| `/banda`   | Banda   |
| `/ao-vivo` | Ao vivo |
| `/sons`    | Sons    |
| `/contato` | Contato |

Qualquer outra rota redireciona para `/`.

## Como rodar

### Opção 1 — Local (Node)

Requisitos: **Node 22+** e npm.

```bash
cd garden
npm install
npm run dev
```

Abre em `http://localhost:5173`.

Outros scripts (dentro de `garden/`):

```bash
npm run build     # gera o bundle de produção em garden/dist
npm run preview   # serve o build de produção localmente
npm run lint      # oxlint
```

### Opção 2 — Docker (produção)

Requisitos: Docker + Docker Compose.

```bash
docker compose up --build
```

Sobe o container `garden`: Vite faz o build e o Nginx serve os arquivos
estáticos em `http://localhost:8080`.

### Opção 3 — Docker (desenvolvimento com hot reload)

```bash
docker compose --profile dev up garden-dev
```

Monta `./garden` no container `node:22-alpine`, roda `npm ci` + `npm run dev` e
expõe o Vite em `http://localhost:5173` (com polling de arquivos habilitado para
o watch funcionar dentro do container).

## Detalhes do build Docker

O [`Dockerfile`](Dockerfile) tem dois estágios:

1. **build** (`node:22-alpine`): instala dependências com `npm ci` e roda
   `npm run build`.
2. **production** (`nginx:1.27-alpine`): copia `dist/` para o Nginx e o
   `nginx.conf` (que vem de um contexto adicional `infra`, definido no
   `docker-compose.yml` como a raiz do repositório).

O `nginx.conf` faz o _fallback_ de SPA (`try_files ... /index.html`), habilita
gzip e aplica cache de 7 dias para assets estáticos.

## Script de fotos

[`garden/scripts/import-photos.py`](garden/scripts/import-photos.py) é um utilitário
pontual (Python + Pillow) que redimensiona e seleciona fotos do acervo da banda,
copia para `garden/public/live/` e regenera `garden/src/data/gallery.json`. Os
caminhos de origem/destino são fixos para a máquina onde foi usado — ajuste as
constantes `SRC` e `DEST` antes de rodar.
