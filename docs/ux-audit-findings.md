# Auditoria UX/UI — achados

Execução do [plano de análise](ux-audit-plan.md). Documento vivo — preenchido
etapa a etapa.

Status por etapa:

| # | Etapa | Status |
| --- | --- | --- |
| 1 | Setup | ✅ concluída |
| 2 | Varredura automática (Lighthouse + axe) | ⬜ pendente |
| 3 | Contraste + leitura sobre o vídeo | ⬜ pendente |
| 4 | Hierarquia + tipografia | ⬜ pendente |
| 5 | CTAs | ⬜ pendente |
| 6 | Mobile | ⬜ pendente |
| 7 | Performance aprofundada | ⬜ pendente |
| 8 | Consolidação | ⬜ pendente |

---

## Etapa 1 — Setup

### Ambiente

| Item | Valor |
| --- | --- |
| Build | `npm run build` (Next 16.3.3, Turbopack), `output: standalone` |
| Servidor de teste | `npm run start` — produção, porta local |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:8080` (só afeta metadata absoluta) |
| Rotas (HTTP) | `/` 200 · `/banda` 200 · `/ao-vivo` 200 · `/sons` 200 · `/contato` 200 · `/naoexiste` **404** |
| Data da coleta | 2026-08-27 |

### Ferramentas instaladas (em `scratchpad/`, fora do repo)

| Pacote | Versão |
| --- | --- |
| `lighthouse` | 13.4.1 |
| `axe-core` | 4.13.0 |
| `@axe-core/playwright` | 4.13.x |
| `playwright` (chromium) | 1.62.1 |

Comandos de referência:

```bash
# produção
cd garden && npm run build && PORT=4700 npm run start

# lighthouse
npx lighthouse http://localhost:4700/         --view
npx lighthouse http://localhost:4700/         --preset=desktop --view
npx lighthouse http://localhost:4700/ao-vivo  --view      # rota mais pesada
```

### Baseline de peso (build de produção)

| Artefato | Tamanho (não comprimido) | Observação |
| --- | --- | --- |
| Maior chunk JS | **880 KB** | provável `three` + `@react-three/fiber` — **a confirmar na etapa 2 que NÃO está no first-load** (deve ser lazy via `dynamic({ ssr: false })`) |
| 2º/3º chunks | 224 KB · 164 KB | framework / react |
| CSS total | **32 KB** | Tailwind v4 (era 12 KB no Vite — o arbitrário inflou; investigar na etapa 7) |
| `.next/static` total | 1.8 MB | |
| `public/video/garden-live.mp4` | **4.4 MB** | maior asset único do site |
| `public/live/` (52 fotos de galeria) | **13 MB** | ~250 KB/foto, exibidas a ~180–350px |
| `public/posters/` | 1.3 MB | |
| `public/members/` | 1.0 MB | |
| `public/covers/` | 456 KB | |
| **Total de imagens** | **~16 MB** | sem `next/image`, sem `srcset` |

### Matriz de teste

5 rotas × 2 breakpoints (390 / 1440) × 3 condições:
1. padrão
2. `prefers-reduced-motion: reduce`
3. primeira carga (cache limpo — tela de loading)

+ estado do lightbox aberto em `/ao-vivo`.

### Planilha de achados

Formato de cada linha:

| id | eixo | rota/componente | descrição | evidência | severidade | esforço |
| --- | --- | --- | --- | --- | --- | --- |

Severidade: **crítico** (bloqueia uso / reprova WCAG A em fluxo essencial) ·
**alto** (prejudica leitura/compreensão para parcela relevante) · **médio**
(fricção contornável) · **baixo** (polimento).

### Suspeitas levantadas antes da auditoria

Anotadas durante a migração; a confirmar/quantificar nas próximas etapas.

- **S1** — `text-accent` (#e31b23) e `text-muted` (#9a8f82) usados em textos de
  11px reprovam contraste AA sobre `#080808`. [eixo 4]
- **S2** — kicker da Home (`text-muted`) e nav (`mix-blend-difference`) ficam
  sobre o shader animado, sem scrim/`text-shadow` — contraste variável. [eixo 3]
- **S3** — Home não tem nenhum CTA. [eixo 5]
- **S4** — lightbox da galeria sem `Esc`, foco preso, `role="dialog"` nem
  devolução de foco. [eixo 4/6]
- **S5** — sem skip-link; `:focus-visible` não estilizado. [eixo 4]
- **S6** — grid de integrantes 2 colunas × `58vh` no mobile = ~4,5 telas de
  scroll. [eixo 6]
- **S7** — e-mail em `/contato` quebra no meio da palavra no mobile. [eixo 2]
- **S8** — vídeo 4,4 MB + 16 MB de imagens sem `next/image`/`srcset`. [eixo 7]
- **S9** — CSS cresceu de 12 KB (Vite) para 32 KB. [eixo 7]

---

## Etapa 2 — Varredura automática

_pendente_

## Etapa 3 — Contraste + leitura sobre o vídeo

_pendente_

## Etapa 4 — Hierarquia + tipografia

_pendente_

## Etapa 5 — CTAs

_pendente_

## Etapa 6 — Mobile

_pendente_

## Etapa 7 — Performance aprofundada

_pendente_

## Etapa 8 — Consolidação

_pendente_
