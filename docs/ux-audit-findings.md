# Auditoria UX/UI — achados

Execução do [plano de análise](ux-audit-plan.md). Documento vivo — preenchido
etapa a etapa.

Status por etapa:

| # | Etapa | Status |
| --- | --- | --- |
| 1 | Setup | ✅ concluída |
| 2 | Varredura automática (Lighthouse + axe) | ✅ concluída |
| 3 | Contraste + leitura sobre o vídeo | ✅ concluída |
| 4 | Hierarquia + tipografia | ✅ concluída |
| 5 | CTAs | ✅ concluída |
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

Ferramentas: Lighthouse 13.4.1 (5 rotas × mobile/desktop) + axe-core 4.13
(5 rotas × 2 breakpoints + lightbox aberto). Build de produção, porta 4700.
JSONs em `scratchpad/lh/`.

### Lighthouse — pontuações

| Rota | Perf mob | Perf desk | A11y | BP | SEO | LCP mob | LCP desk | CLS | TBT mob |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | **59** | 84 | 100 | 100 | 100 | **16.4 s** | 2.9 s | 0 | 660 ms |
| `/banda` | 75 | 85 | 100 | 100 | 100 | **15.7 s** | 2.7 s | 0 | 50 ms |
| `/ao-vivo` | 75 | 79 | 96 | 100 | 100 | **23.3 s** | 4.1 s | 0 | 50 ms |
| `/sons` | 75 | 85 | 96 | 100 | 100 | **13.7 s** | 2.7 s | 0 | 40 ms |
| `/contato` | 75 | 85 | 100 | 100 | 100 | **10.2 s** | 2.7 s | 0 | 40 ms |

**Bom:** SEO e Best Practices 100 em tudo; **CLS 0** em tudo (fontes/shader não
causam salto); FCP 0.2 s desktop / 0.8 s mobile (SSR + `next/font` funcionando);
a11y 96–100.

**Ruim:** **LCP mobile de 10 a 23 segundos** (alvo < 2.5 s). Desktop 2.7–4.1 s
também acima do alvo. Perf mobile 59–79.

### axe — violações (só o que a varredura automática pega)

| Regra | Impacto | Onde | Nós |
| --- | --- | --- | --- |
| `color-contrast` | **serious** | `/ao-vivo` (local dos eventos, `text-accent` 11px ×3), `/sons` (".plays", `text-accent` 12px) | 11 |
| `region` | moderate | wrapper do shader (`div.z-0` no `SiteChrome`) fora de landmark — todas as rotas | 11 |

axe **não** acusou: ordem de headings, `alt`, `lang`, nome de botão/link,
`aria` — todos ok. (Lightbox sem teclado, skip-link, foco visível e alvo de
toque **não são pegos por varredura** — ficam para as etapas 4/6.)

### Achados

| id | eixo | rota/componente | descrição | evidência | sev. | esforço |
| --- | --- | --- | --- | --- | --- | --- |
| **F1** | perf / vídeo | `ShaderVideo.jsx` / todas as rotas | `garden-live.mp4` (**4,5 MB**) é baixado **inteiro** em toda rota apesar de `preload="metadata"` — `autoPlay` + `.play()` forçam o buffer completo. É a causa direta do LCP mobile de 10–23 s (o `<canvas>` do shader é o elemento LCP e só pinta depois do vídeo). | Lighthouse network: `video/mp4 4527 KB`; LCP mob 16–23 s | **crítico** | M |
| **F2** | perf | `Navigation.jsx` / Home | Cair na Home dispara o **prefetch dos `<Link>` da nav** e a página baixa **~4 MB de imagens de outras rotas** que não exibe: 5 fotos de integrantes, 4 pôsteres, capa `dbawot`, fotos de festival. | trace de rede da Home: 15 imagens, nenhuma renderizada na Home | **crítico** | S–M |
| **F3** | perf | `ShaderVideoClient.jsx` / todas | O chunk do `three` + `@react-three/fiber` (**~880 KB**) é baixado logo após a hidratação em **toda** rota, porque o `ShaderVideo` monta sempre. Não bloqueia o FCP, mas é o "Reduce unused JavaScript ~750 ms" do Lighthouse. | chunk `1j-octc786eb5.js` 880 KB na Home; opp. LH 750 ms | alto | M |
| **F4** | perf | `public/logos/` | Logos PNG gigantes para o uso: `logo-badge.png` **528 KB** (exibido a 44px na nav, 96px no loading), `logo-red.png` **710 KB** (`/contato`). São PNGs 4096×4096. | Lighthouse network | alto | S |
| **F5** | perf | todas as `<img>` | Nenhuma imagem usa `next/image` nem `srcset`. Fotos de galeria/pôster de 250–600 KB exibidas a 180–350px. `import-photos.py` gera 1800px para thumbnails pequenos. `/contato` tem 1 imagem sem `width`/`height`. | LH `unsized-images` (contato); tamanhos de `public/` | alto | M |
| **F6** | contraste / a11y | `/ao-vivo`, `/sons` | `text-accent` (#e31b23) sobre `#080808` = **4,24:1** — reprova WCAG AA (mín. 4,5:1) para texto normal. Usado em: local dos eventos (`/ao-vivo`, 11px), "N.NNN plays" (`/sons`, 12px). Provável também em `role` dos integrantes e créditos de foto. Confirma **S1**. | axe serious; a11y LH 96 nessas rotas | **sério** | S |
| **F7** | a11y | `components/SiteChrome.jsx` | O `<div className="fixed inset-0 z-0">` do shader não está dentro de nenhum landmark → axe `region`. É decorativo; falta `aria-hidden="true"` (que também tira o `<canvas>` da árvore de acessibilidade). | axe moderate ×11 | médio | XS |

### Confirmações / atualizações das suspeitas

- **S1** → confirmada e quantificada (F6): 4,24:1.
- **S8** → confirmada e ampliada (F1, F4, F5): não é só o peso, é o vídeo baixar
  inteiro + imagens de rotas não visitadas.
- **S9** (CSS 12→32 KB) → **não é problema**: 32 KB não comprimido, ~7 KB
  gzip, e o Lighthouse não reclamou. Rebaixada para "não priorizar".
- **S2, S3, S4, S5, S6, S7** → fora do alcance da varredura automática; seguem
  para as etapas 3–6.

### Nota metodológica

O Lighthouse mobile simula 4G lento + CPU 4×. Os 10–23 s de LCP são desse
cenário; num Wi-Fi rápido o vídeo ainda baixa inteiro, mas em ~1–2 s. O achado
**F1 vale nos dois casos** — 4,5 MB por visita é desperdício mesmo em conexão
boa, e é o teto de melhoria de performance do site.

## Etapa 3 — Contraste + leitura sobre o vídeo ✅



### Correção já aplicada — véu sob o conteúdo (a pedido)

`components/SiteChrome.jsx` + `.video-scrim` em `globals.css`: gradiente vertical
de `var(--color-bg)` entre o shader (z-0) e o `<main>` (z-2) — ~88% opaco no
topo (nav + kicker), ~40% no meio (o shader continua visível atrás do título),
~84% no rodapé (quote da Home). `pointer-events: none`, theme-aware via
`color-mix`, não afeta o texto (fica atrás do `<main>`) nem o modo
`prefers-reduced-motion` (sobre `bg` sólido o `color-mix` resulta em `bg`).

De quebra, o wrapper do shader ganhou `aria-hidden="true"` → **resolve F7**
(axe `region`).

Ainda a medir na etapa 3: o contraste real do kicker (`text-muted`) e da nav
(`mix-blend-difference`) sobre o shader já escurecido, frame a frame.

### Método

- **Fundo sólido:** cálculo determinístico (relative luminance + WCAG ratio)
  de cada token de cor sobre `#080808` (night) e `#0c0706` (ember).
- **Sobre o vídeo:** Playwright na build de produção — para cada texto-chave,
  esconde o elemento (`visibility:hidden`), tira 4–10 screenshots do recorte do
  fundo ao longo de ~3 s (o shader anima), mede a luminância mínima/máxima do
  fundo e calcula o contraste do texto contra o **pior frame**.
- Estados: padrão, `prefers-reduced-motion: reduce`, `prefers-contrast: more`.

### Contraste sobre fundo sólido (fora do vídeo)

| Token | Contraste vs `#080808` | Texto normal (AA 4.5:1) |
| --- | --- | --- |
| `--color-fg` `#eadcc4` | 14.81:1 | ✅ AAA |
| `--color-copy` `#d8ccb8` | 12.64:1 | ✅ AAA |
| `--color-muted` `#9a8f82` | **6.32:1** | ✅ AA (não AAA) |
| `--color-accent` `#e31b23` | **4.24:1** | ❌ **reprova** (passa só como "large" ≥ 24px / 18.7px bold) |
| `--color-line` (composto `#312e2a`) | **1.48:1** | ❌ reprova WCAG 1.4.11 (não-textual precisa 3:1) |

`ember` é melhor: accent `#ff4d1a` = 6.03:1 (passa AA). O problema do accent é
específico do tema **night** (padrão).

### Contraste sobre o shader + `.video-scrim` (pior frame)

| Elemento | Cor | Tam. | Pior contraste | Verdict |
| --- | --- | --- | --- | --- |
| Home — kicker "DESDE 2019…" | muted | 11px | **3.75:1** | ❌ reprova AA |
| Home — título "Garden" | fg | ~130px | 3.15:1 | ⚠️ passa AA-large (≥3), marginal |
| Home — "Psychedelia" (`mix-blend-screen`) | accent | ~130px | **1.18:1** | ❌ **reprova até como large** — some sobre o halftone claro |
| Home — quote | fg | 18px | 8.02:1 | ✅ AA |
| Home — nav "BANDA" (`mix-blend-difference`) | fg efetivo | 11px | **3.15:1** (pior de 10 frames) | ❌ reprova AA (o scrim reduziu, não eliminou) |
| Home — brand "GARDEN" | fg | 13px | 13.75:1 | ✅ |
| `/banda` — eyebrow "01 — Banda" (a 46vh) | muted | 11px | 6.31:1 | ✅ AA |
| `/banda` — `<h1>` (a 46vh) | fg | ~72px | 14.80:1 | ✅ |

O véu resolveu as subpáginas (o conteúdo entra onde o shader já está escuro) e
a quote. Sobra o **topo da Home** — kicker, título e nav — onde o shader é mais
claro e o scrim é mais fino (~40%).

### Estados

- **`prefers-reduced-motion: reduce`** — o shader **não monta** (canvas ausente
  confirmado); tudo cai sobre `#080808` sólido. É o "modo legível". Único
  problema que sobra: accent como texto pequeno (não ocorre na Home).
- **`prefers-contrast: more`** — o site **não tem nenhuma regra**
  `@media (prefers-contrast)`. Não é falha, é oportunidade.

### Achados

| id | eixo | onde | descrição | pior contraste | sev. | esforço |
| --- | --- | --- | --- | --- | --- | --- |
| **F6** (atualizado) | contraste | todo `text-accent` pequeno | `#e31b23` sobre `#080808` = 4.24:1 reprova AA para < 24px. Ocorrências: local dos eventos (`/ao-vivo`), "plays" (`/sons`), `role` dos integrantes (`/banda`), créditos de foto, notas de evento. | 4.24:1 | **sério** | S–M |
| **F8** | contraste não-textual | `--color-line` | bordas de tabela (`.facts`), divisores (`.release-list`), topo de card, sublinhado de links sociais, borda dos chips de demo — todos a 1.48:1, quase invisíveis. Reprova WCAG 1.4.11. | 1.48:1 | médio | XS |
| **F9** | contraste | botões hover | estado hover `bg-accent` + `text-bg`: `#080808` sobre `#e31b23` = 4.24:1 — o rótulo do botão reprova AA no hover. "Ouvir no Spotify", link do featured. | 4.24:1 | médio | S |
| **F10** | leitura sobre vídeo | Home — kicker | `text-muted` 11px sobre o shader claro = 3.75:1. A linha "DESDE 2019 · CAMPOS… · AGENDA 2026" fica fraca. | 3.75:1 | alto | S |
| **F11** | leitura sobre vídeo | Home — título "Psychedelia" | o `mix-blend-screen` + accent sobre o halftone claro derruba para 1.18:1 — o título principal do site **desaparece** em alguns frames. "Garden" (3.15:1) fica marginal. | 1.18:1 | **alto** | S–M |
| **F12** | leitura sobre vídeo | Navigation — links (desktop) | `mix-blend-difference` sobre o shader: pior frame 3.15:1 (11px) → reprova AA. O véu ajudou mas o blend depende do frame. A abordagem do mobile (gradiente + `mix-blend-normal`) é mais estável. | 3.15:1 | alto | S |

### Recomendações (para o plano de correção)

- **F10/F12** — engrossar a faixa superior do `.video-scrim` (de ~88% para
  ~95% nos primeiros ~12vh) **ou** dar `text-shadow` sutil ao kicker e à nav,
  **ou** adotar no desktop o mesmo tratamento do mobile (gradiente sólido +
  `mix-blend-normal` na nav).
- **F11** — `text-shadow` no `<h1>` da Home, ou uma tarja escura localizada
  atrás do título, ou remover o `mix-blend-screen` e usar um vermelho um pouco
  mais claro só no título.
- **F6** — subir a luminância do accent no tema night (mirar ~4.5–6:1, como o
  ember já tem) **ou** reservar o accent para texto grande/decorativo e usar
  `fg`/`copy` nos rótulos pequenos.
- **F8** — subir o alfa de `--color-line` de `.18` para ~`.35–.40`.
- **F9** — no hover, usar `text-fg` em vez de `text-bg` sobre o accent, ou
  escurecer o accent do hover.
- Considerar tornar o **modo sem shader** (hoje só em `prefers-reduced-motion`)
  acessível por um controle visível de pausar/ocultar o vídeo (WCAG 2.2.2).

## Etapa 4 — Hierarquia + tipografia

Método: extração automática (Playwright) da árvore de headings e das métricas
de cada texto-folha (px / line-height / tracking / família / transform /
caracteres por linha) nas 5 rotas em 1440px, + teste de zoom 200%, + leitura
manual do conteúdo.

### Árvore de headings

| Rota | Estrutura | Observação |
| --- | --- | --- |
| `/` | H1 | 1 h1 (hero). ok |
| `/banda` | H1 → H2 "Integrantes" | o bloco de bio (quote + about + facts) e a tira de fotos **não têm heading** |
| `/ao-vivo` | H1 → **9× H2** | "Festival Troque o Disco" aparece **2×**; os h2 da lista de eventos (24px) vêm antes dos h2 das galerias (48px) — ordem no DOM invertida em relação ao tamanho; sem heading agrupador |
| `/sons` | H1 → H2 "Dbawot" → H3×3 → H2 "No estúdio" | "Dbawot" (h2, **110px**) e "No estúdio" (h2, **36px**) — mesmo nível, tamanhos muito diferentes |
| `/contato` | H1 | simples. ok |

Nível de heading sem salto em todas (h1→h2→h3 correto). **Um h1 por rota.**

### Inventário tipográfico

| px | Onde | Nota |
| --- | --- | --- |
| **9** | índices "01–04" da nav (desktop) | abaixo de qualquer mínimo razoável |
| **10** | créditos de foto na galeria ("Hyakuya"…), uppercase + tracking | 10px mono caixa-alta sobre foto |
| **11** | kicker, "Booking", eyebrow, labels da tabela de facts, `role` dos integrantes, local dos eventos, "N fotos", figcaptions, meta dos releases | **~15 usos** — é o tamanho-padrão de rótulo e está 3–5px abaixo do confortável |
| **12** | chips de demo, botão "Ouvir no Spotify", "N.NNN plays" | |
| **13** | brand "Garden" na nav | |
| **14** | valores da tabela de facts ("2019", "Cinco integrantes") | limítrofe ok |
| **16** | notas de release, notas de evento, copy do contato | mínimo aceitável de corpo |
| **18** | about da `/banda`, quote da Home, eyebrow serif da Home | bom |
| 24–140 | headings display | |

**Corpo de texto nunca abaixo de 16px (bom).** O problema é o **volume de
rótulo/legenda em 9–12px**, agravado por caixa-alta + tracking largo.

### Line-height / tracking

- h1 em `leading-[0.92]`; "Dbawot" em `leading-[0.85]`. Em pt-BR o h1 da
  `/banda` quebra em 3 linhas ("Alternativo por / natureza. Sério por /
  escolha.") — os acentos (é, ç) da linha seguinte quase encostam. Apertado,
  mas aceitável para display.
- corpo em `leading-relaxed` (~1.63) — bom.
- tracking 0.1–0.16em aplicado a **frases** uppercase de 3–4 palavras
  ("Campos dos Goytacazes — RJ", "Tales Tabacaria · R. Saldanha Marinho,
  264") — tracking ajuda rótulo curto, atrapalha frase.

### Comprimento de linha (alvo 45–75 caracteres)

| Rota | Bloco | ch/linha |
| --- | --- | --- |
| `/` | intro | ~45 ✅ |
| `/banda` | about | ~74 ⚠️ no limite |
| `/banda` | quote | ~36 ✅ |
| `/ao-vivo` | notas de evento | ~49–54 ✅ |
| `/sons` | nota do featured | **~84** ❌ |
| `/sons` | "Demos em processo…" (sem `max-width`) | **~172** ❌ |
| `/contato` | copy | **~83** ❌ |

### Zoom 200% (WCAG 1.4.4 / 1.4.10 reflow)

| Rota | scrollWidth vs viewport (1280) | |
| --- | --- | --- |
| `/` | **2638** | ❌ scroll horizontal |
| `/banda` | 1512 | ❌ |
| `/ao-vivo` | 1616 | ❌ |
| `/sons` | 1943 | ❌ |
| `/contato` | 1280 | ✅ |

Os títulos display (`clamp(…, 11vw, 140px)`, "Dbawot" 110px) não encolhem no
zoom e o `overflow-x: hidden` do `body` **corta** o conteúdo em vez de refluir.
(medido com `body { zoom: 2 }` — confirmar com zoom real do navegador, mas a
direção é clara: é a mesma causa do overflow já visto no mobile.)

### Achados

| id | eixo | onde | descrição | sev. | esforço |
| --- | --- | --- | --- | --- | --- |
| **F13** | hierarquia | `/ao-vivo` | 9 h2 numa página; "Festival Troque o Disco" duplicado (lista de eventos + galeria); h2 pequenos (eventos, 24px) antes dos h2 grandes (galerias, 48px); sem heading agrupando "Eventos" vs "Galeria". Navegação por headings fica confusa. | alto | M |
| **F14** | hierarquia / conteúdo | `/banda`, `/ao-vivo`, `/sons` | Os h1 das subpáginas são **slogans poéticos** ("Alternativo por natureza…", "O trabalho desses anos…", "Discos, singles e o que ainda está germinando."), não rótulos funcionais. Quem escaneia não identifica "página da banda / dos shows / da música". O `<title>` é funcional, o h1 não. | alto | S |
| **F15** | hierarquia | `/banda`, `/sons` | `/banda`: bloco de bio e tira de fotos sem heading (só "Integrantes" é h2). `/sons`: "Dbawot" (h2 110px) e "No estúdio" (h2 36px) — mesmo nível, tamanhos díspares. | médio | S |
| **F16** | tipografia | global | ~20 elementos de texto entre 9 e 12px (nav índices, créditos, kicker, labels, roles, places, chips). Caixa-alta + tracking largo somam à dificuldade. | alto | M |
| **F17** | tipografia / a11y | global | Zoom 200% gera scroll horizontal em 4 de 5 rotas — os títulos display não refluem e o `overflow-x: hidden` corta o conteúdo. Reprova WCAG 1.4.10. | alto | M |
| **F18** | tipografia | `/sons`, `/contato`, `/banda` | Parágrafos acima de 75 caracteres/linha; "Demos em processo…" sem `max-width` chega a ~172. | médio | XS |
| **F19** | tipografia | global | `letter-spacing` 0.1–0.16em em frases uppercase de 3–4 palavras — prejudica a leitura do rótulo. | baixo | XS |
| **F20** | microcopy | Navigation | "Booking" (inglês) num site pt-BR. | baixo | XS |
| **F21** | conteúdo | `/`, `/banda` | Redundância literal: Home — eyebrow "psicodelia como referência" repete no começo da quote. `/banda` — h1 repete o fim da quote ("alternativo por natureza e sério por escolha"). | baixo | XS |

### Positivos

- 1 h1 por rota, sem salto de nível de heading.
- **CLS 0** — `next/font` com métricas de fallback funciona, sem jank de troca
  de fonte.
- Corpo 16–18px, `line-height` 1.45–1.63 — leitura confortável onde importa.
- Eyebrow corretamente subordinado (11px muted vs h1 display).
- Escala de display coerente entre rotas (PageHead sempre `clamp(40,7vw,92)`).

### Atualização de suspeitas

- **S7** (e-mail quebra) → é um sintoma de **F17** (o `break-words` no e-mail é
  o que impede a `/contato` de estourar no zoom; as outras rotas não têm essa
  válvula).

## Etapa 5 — CTAs

Método: extração de todo elemento interativo por rota (texto, destino, posição,
tratamento visual, acima/abaixo da dobra, alvo de toque, estado de foco) +
percurso de teclado + três testes de tarefa raciocinados.

### Inventário por rota

| Rota | CTAs (além da nav) | Destino | Tratamento | Dobra (1440×900) |
| --- | --- | --- | --- | --- |
| `/` | **nenhum** | — | — | — |
| `/banda` | **nenhum** | — | — | — |
| `/ao-vivo` | ~50 `<button>` (abre lightbox) | — | sem estilo de botão | abaixo |
| `/sons` | **1** — "Ouvir no Spotify" | Spotify **do artista** (não da faixa) | outline 12px, sem preenchimento | **abaixo** (y≈1383) |
| `/contato` | e-mail (72px) + Instagram + Spotify | `mailto:` / externos | e-mail sem sublinhado; sociais com `border-b` (o `border-line` de 1.48:1) | e-mail acima; sociais abaixo |

Persistente em todas: "Booking" (nav, 11px, inglês) → `mailto:` cru.
Externos: `target="_blank"` **com** `rel="noreferrer"` ✅, mas **sem indicação
visual** de "abre em nova aba".

### Testes de tarefa

| Tarefa | Caminho | Resultado |
| --- | --- | --- |
| "Ouça a música mais recente" | Home (sem CTA) → nav "Sons" → rolar até o botão → Spotify | **falha parcial**: botão abaixo da dobra, 12px; leva à **página do artista**, não a "Dbawot"; os outros 3 releases não têm link nenhum; sem player embed |
| "Como contratar a banda" | "Booking" (nav) ou nav "Contato" → e-mail | **ok com atrito**: "Booking" é jargão em inglês; `mailto:` abre o cliente de e-mail sem assunto/corpo; a `/contato` resolve bem |
| "Ver os próximos shows / agenda" | Home diz "Agenda 2026 aberta" (não é link) → nav "Ao vivo" | **falha**: `/ao-vivo` só tem shows **passados**; não existe agenda/próximas datas em lugar nenhum |

### Foco (teclado)

`outline: 1px auto rgb(0, 95, 204)` em todos os interativos — é o **anel padrão
do Chrome**, não removido pelo reset do Tailwind. Existe, mas: 1px, azul
off-brand, o estilo `auto` varia entre navegadores e, sobre a nav com
`mix-blend-difference`, o anel é **misturado** e vira um traço quase invisível
(confirmado visualmente). Nenhum `:focus-visible` customizado. **Skip-link
continua ausente** (o primeiro Tab vai para o brand).

### Achados

| id | eixo | onde | descrição | sev. | esforço |
| --- | --- | --- | --- | --- | --- |
| **F22** | CTA | `/`, `/banda` | Nenhum call-to-action. A página institucional e a da banda não levam a nenhuma ação (ouvir, ver shows, contratar). Confirma e amplia **S3**. | alto | M |
| **F23** | CTA | `/sons` | "Ouça a música" é o pior fluxo do site: único botão abaixo da dobra (12px, outline), aponta para a **página do artista** no Spotify em vez da faixa, e os outros 3 releases + as demos **não têm link nenhum**. Sem player embutido. | alto | M |
| **F24** | CTA / conteúdo | `/` (kicker), `/contato` | "Agenda 2026 aberta" é afirmado 2× mas **não existe agenda** — `/ao-vivo` só mostra o passado. Promessa sem conteúdo nem CTA. | médio | M |
| **F25** | CTA / microcopy | `Navigation` | "Booking" — único CTA de contato persistente, em inglês, 11px, dispara `mailto:` sem assunto/corpo pré-preenchidos. | médio | S |
| **F26** | CTA | `/sons`, `/contato` | Afordância fraca: "Ouvir no Spotify" é só um contorno de 12px; o e-mail gigante da `/contato` não tem sublinhado em repouso (`no-underline`) — no mobile parece um título, não um link. | médio | S |
| **F27** | CTA / a11y | links externos | Sem ícone/aviso de "abre em nova aba". | baixo | XS |
| **F28** | a11y | `/ao-vivo` | Os ~50 botões da galeria têm nome acessível ruim: `"Festival Troque o DiscoHyakuya"` (evento + crédito colados, sem espaço, sem verbo). Um leitor de tela anuncia 50 botões quase idênticos e sem sentido. | médio | S |
| **F29** | a11y | global | Indicador de foco = anel padrão do Chrome (1px, azul, `auto`), sem `:focus-visible` próprio; sobre a nav (`mix-blend-difference`) fica ilegível. **Skip-link ausente** (S5). | médio | S |
| **F30** | mobile / toque | `Navigation` "Booking" (33px alt.), `/sons` botão (42px alt.) | Abaixo dos 44×44px recomendados. | baixo | XS |

### Positivos

- `/contato` faz CTA bem: e-mail em destaque, primeiro, com copy que
  contextualiza ("Shows, festivais, Weird Parties e o corre do ao vivo").
- `rel="noreferrer"` em **todos** os links externos.
- Alvos de toque da nav principal: 46px de altura — acima de 44px ✅.
- Há um indicador de foco (mesmo que fraco) — o reset do Tailwind não o apagou.

### Atualização de suspeitas

- **S3** → confirmada (F22).
- **S5** → parcialmente: o foco **existe** (default do browser), mas não é
  estilizado e some sobre a nav; o skip-link continua faltando.

## Etapa 6 — Mobile

_pendente_

## Etapa 7 — Performance aprofundada

_pendente_

## Etapa 8 — Consolidação

_pendente_
