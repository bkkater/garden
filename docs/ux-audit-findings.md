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
| 6 | Mobile | ✅ concluída |
| 7 | Performance aprofundada | ✅ concluída |
| 8 | Consolidação | ✅ concluída |

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

Método: emulação (Playwright, `isMobile` + touch) em 390, 320 (SE), 768
(tablet) e 844×390 (landscape); overflow horizontal + culpado, altura da
página em telas, alvos de toque, nav, lightbox. Sem dispositivo físico — os
números de FPS/bateria do shader ficam para a etapa 7.

### Overflow horizontal

| Rota | 390 | 320 | landscape | tablet 768 |
| --- | --- | --- | --- | --- |
| `/` | ⚠️ 402>375 | ⚠️ 402>320 | ⚠️ 870>844 | ⚠️ 793>768 |
| `/banda` | ok | ⚠️ 339>320 | ok | ok |
| `/ao-vivo` | ok | ⚠️ 362>320 | ok | ok |
| `/sons` | ⚠️ 395>390 | ⚠️ 395>320 | ok | ok |
| `/contato` | ok | ok | ok | ok |

Causa: **`overflow-x: hidden` está só no `body`, não no `html`** — o
`document.documentElement` continua rolando na horizontal. O conteúdo que
estoura (título display `clamp(…,11–12vw,140px)`, nav — ver abaixo) infla os
elementos `fixed inset-0` (shader wrapper, `<canvas>`, `.video-scrim`,
`.grain`, `<header>`), que passam todos a reportar 402px num viewport de 375.

### Nav mobile

| | |
| --- | --- |
| Altura | 68px (a `pt-28`/112px da Home limpa) |
| Links | 4 links (~284px) num espaço de ~190px após o brand → **overflow com scroll oculto** |
| Efeito visível | no mobile ≤~400px o **último item ("Contato") fica fora da tela**, sem nenhuma indicação de que a barra rola |
| Alvo de toque | **todos os 4 links = ~65–81 × 33px** — 33px de altura reprova o mínimo de 44px |

### Altura das páginas (scroll)

| Rota | 390px | 320px | landscape |
| --- | --- | --- | --- |
| `/` | 1 tela | — | 1,3 |
| `/contato` | 1,3 | 1,9 | 4,1 |
| `/sons` | 2,3 | 3,1 | 5,6 |
| `/banda` | **5** | 6,2 | 7,6 |
| `/ao-vivo` | **11,1** | **14,6** | **29,3** |

`/ao-vivo`: 52 fotos a `min-h-[280px]` em 2 colunas + eventos + pôsteres. Sem
marcos internos, sem "voltar ao topo", sem índice das galerias. O grid de
integrantes da `/banda` (2 col × `h-[58vh]`, 3 linhas) é o segundo maior peso.

### Lightbox mobile

| | |
| --- | --- |
| Área da imagem | 359×238 = **26% da viewport** (`p-10` + legenda + `object-contain`) |
| Botão de fechar | **não existe** |
| `Esc` fecha | **não** |
| Scroll do fundo | **não travado** — dá para rolar a página atrás do modal |
| Swipe / próxima foto | não |

### Positivos

- **Pinch-zoom permitido** — `<meta viewport>` sem `user-scalable=no` nem
  `maximum-scale` (padrão do Next). ✅
- Landscape: as subpáginas cabem (46vh de shader + conteúdo).
- `body { overflow-x: hidden }` existe — só falta estender ao `html`.
- `prefers-reduced-motion` no mobile: o shader não monta (verificado).

### Achados

| id | eixo | onde | descrição | sev. | esforço |
| --- | --- | --- | --- | --- | --- |
| **F31** | mobile | `Navigation` | No mobile ≤~400px o **último item da nav ("Contato") fica fora da tela**, sem affordance de scroll. `<header class="flex">` + `<nav class="flex-1 overflow-x-auto">` com 4 links que não cabem. Um visitante mobile não acha o link de contato. | **alto** | S |
| **F32** | mobile / a11y | `globals.css` | `overflow-x: hidden` só no `body`; o `html` ainda rola horizontalmente. `/` e `/sons` rolam a 390px; 4/5 rotas a 320px; `/` no tablet e no landscape. | alto | XS |
| **F33** | mobile / toque | `Navigation`, `/sons` | Os 4 links da nav têm 33px de altura no mobile (`py-2` + 11px) — reprova o alvo de 44px. "Ouvir no Spotify" 42px. | alto | S |
| **F34** | mobile | `/ao-vivo`, `/banda` | Páginas longuíssimas: `/ao-vivo` = 11 telas a 390px, 29 em landscape; `/banda` = 5 telas. Sem marcos, sem "voltar ao topo", sem índice/filtro de galerias. | médio | M |
| **F35** | mobile | `/banda` integrantes | Grid 2 col × `h-[58vh]` — cada linha ≈ 1,2 tela. Confirma **S6**; considerar `aspect-[3/4]` fixo em vez de `vh`. | médio | S |
| **F36** | mobile / a11y | `LiveGallery` | Lightbox: imagem ocupa só 26% da tela no mobile; **sem botão de fechar**, **`Esc` não fecha**, **scroll do fundo não travado**, sem swipe. Confirma e amplia **S4**. | **alto** | M |
| **F37** | mobile | `/`, `/sons` | Título "Psychedelia" / "Dbawot" toca ou excede a borda direita — é o gatilho do overflow (junto com a nav). Parte do **F17**. | médio | S |

### Atualização de suspeitas

- **S4** → confirmada e ampliada (F36).
- **S6** → confirmada (F35), mas `/ao-vivo` (F34) é o problema de scroll maior.
- **S7** → o e-mail quebrado é a válvula que faz a `/contato` ser a única rota
  **sem** overflow (F32).

## Etapa 7 — Performance aprofundada

Método: trace de rede por rota (bytes por tipo), trace de CPU do CDP com a
página parada, cabeçalhos de cache, dimensões reais de vídeo/imagem, teste em
`prefers-reduced-motion`. Build de produção.

### Peso total por rota

| Rota | Total | vídeo | imagens | script | fontes | css |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | **15,9 MB** | 9,0 (2×) | 5,2 (16 img) | 1,3 | 0,13 | 0,03 |
| `/banda` | 11,4 MB | 4,5 | 5,2 (16) | 1,3 | | |
| `/ao-vivo` | **19,9 MB** | 9,0 (2×) | 9,2 (32) | 1,3 | | |
| `/sons` | 11,3 MB | 4,5 | 5,2 (16) | 1,3 | | |
| `/contato` | 11,3 MB | 4,5 | 5,2 (16) | 1,3 | | |

**Toda rota baixa 11–20 MB.** A `/contato` — que mostra 1 logo e um bloco de
texto — baixa **5,2 MB de imagens de outras rotas** (integrantes, pôsteres,
galeria) via prefetch dos `<Link>`, + 4,5 MB de vídeo + 1,3 MB de JS.

### Detalhamento

**Vídeo** — `garden-live.mp4`: **1280×720, H.264, 2054 kbps, 18 s, 4,6 MB**.
- 720p é mais do que o halftone (grade de 72 células) precisa — 480–540p + CRF
  + uma fonte `<source>` WebM/AV1 cortaria para ~1,5–2 MB.
- Em `/` e `/ao-vivo` são **2 requests** (~9 MB): provável combinação de
  `Cache-Control: max-age=0` + `<video>` no SSR + refetch quando o
  `ShaderVideo` client monta a `THREE.VideoTexture`.
- **`prefers-reduced-motion`: 0 requests de vídeo** — quando o shader não
  monta, o `<video>` nem é renderizado. ✅ O modo econômico funciona.

**Imagens** — dimensões reais vs. exibição:

| Asset | Real | Exibido | Peso | Sobredim. |
| --- | --- | --- | --- | --- |
| `members/*.jpg` | 1400×930 | ~180–270px | 144 KB | ~5–8× |
| `covers/dbawot.jpg` | 1400×1400 | ~350–600px | 456 KB | ~2–4× |
| `posters/*.jpg` | 1080×1350 | ~180–330px | **596 KB** | ~3–6× |
| `live/**/*.jpg` | 1800×… | ~180–680px | ~260 KB | ~3–10× |
| `logos/logo-badge.png` | **4096×4096** | 44–96px | 528 KB | ~90× |
| `logos/logo-red.png` | **4096×4096** | ~200–400px | 712 KB | ~10× |

`import-photos.py` fixa `MAX_SIDE = 1800` — grande demais para thumbnail. Sem
`next/image`, sem `srcset`.

**JavaScript** — `script` = 1,3 MB em toda rota (o chunk do `three` +
`@react-three/fiber`, ~880 KB, + runtime). Pré-hidratação: **0 script
bloqueante** no HTML inicial → o FCP não espera JS (bate com FCP 0,2–0,8 s da
etapa 2). O `three` carrega **depois** da hidratação, mas em **toda** rota.

**CPU do shader (parado)** — desktop, sem throttle, 5 s de janela:

| Métrica | Valor |
| --- | --- |
| TaskDuration | 1,94 s = **~39% de 1 core, contínuo** |
| ScriptDuration | 0,28 s (o resto é render/composição WebGL) |
| com `document.hidden` | Task cai para 0,06 s ✅ |

O cap de 30 fps ajuda, mas o loop roda sempre. **Não há `IntersectionObserver`**
— o shader é `position: fixed`, "sempre visível", e continua renderizando a
todo vapor mesmo em `/ao-vivo` (11 telas), atrás de conteúdo sólido.
`document.hidden` (trocar de aba) pausa corretamente.

**Cache**:

| Recurso | `Cache-Control` |
| --- | --- |
| `/_next/static/*` | `public, max-age=31536000, immutable` ✅ |
| `public/*` (vídeo, imagens) | **`public, max-age=0`** ❌ revalida a cada navegação |

**Terceiros**: nenhum (sem analytics, sem CDN de fonte). ✅

**CSS**: 32 KB cru / **6,4 KB gzip** / 355 regras. Valores arbitrários todos de
uso único e razoáveis. **S9 é não-problema** — 6,4 KB é irrelevante ao lado de
15 MB de mídia.

### Achados

| id | eixo | onde | descrição | sev. | esforço |
| --- | --- | --- | --- | --- | --- |
| **F2** (ampliado) | perf | `Navigation` / **todas as rotas** | O prefetch dos `<Link>` da nav faz **cada rota** baixar **5–9 MB de imagens das outras rotas**. Não é só a Home — `/contato` (1 logo visível) baixa 5,2 MB de fotos de integrantes/pôsteres/galeria. | **crítico** | S |
| **F38** | perf | deploy / `public/` | `public/*` servido com `max-age=0` — vídeo (4,6 MB) e imagens revalidam a cada navegação. Fix: regra de CDN/proxy para `/video` e `/live` etc., ou importar imagens como módulos (hasheadas), ou `next/image`. | alto | S |
| **F39** | perf | `ShaderVideo.jsx` | O shader consome **~39% de 1 core continuamente** enquanto a aba está aberta (mesmo parado, mesmo com conteúdo sólido por cima). Falta pausar quando rolado para fora de vista (só `document.hidden` pausa hoje). | alto | S |
| **F40** | perf | `ShaderVideo.jsx` | O `garden-live.mp4` é baixado 2× em `/` e `/ao-vivo` (~9 MB de vídeo numa carga). | médio | S |
| **F42** | perf | `public/video`, `import-photos.py` | Vídeo 720p/2 Mbps (cabe 480–540p); `MAX_SIDE=1800` no script de fotos gera thumbnails 3–10× maiores que o exibido; logos PNG 4096² (F4). | alto | M |

### Positivos

- **Pré-hidratação sem JS bloqueante** — FCP 0,2–0,8 s.
- **`prefers-reduced-motion` não baixa o vídeo** — modo econômico real.
- `document.hidden` pausa o shader.
- `/_next/static` com cache imutável correto.
- Fontes 134 KB / 5 `.woff2` — ok.
- **Zero terceiros.**
- CSS 6,4 KB gzip.
- CLS 0 (etapa 2).

### Atualização de suspeitas

- **S8** → totalmente confirmada e pior que o previsto (F2 ampliado, F38, F42).
- **S9** → **descartada** — CSS gzip é irrelevante.

## Etapa 8 — Consolidação

### Sumário executivo

O site tem uma **fundação técnica muito boa** — SSR com FCP de 0,2–0,8 s, CLS 0,
SEO e Best Practices 100, `next/font` self-hosted, zero terceiros, cache
imutável no bundle, semântica limpa (1 `<h1>`/rota, sem salto de heading,
`alt`/`lang`/nomes ok), `prefers-reduced-motion` que realmente desliga o shader
e nem baixa o vídeo.

E uma **entrega problemática** em cima dela: **cada rota transfere 11–20 MB**
(vídeo de 4,5 MB baixado inteiro — às vezes 2× — + 5–9 MB de imagens de rotas
que o visitante não abriu, via prefetch), o **LCP mobile fica entre 10 e 23 s**,
o **texto sobre o vídeo** só ficou legível depois do véu desta auditoria (e o
título "Psychedelia" ainda some em alguns frames), a **navegação mobile
esconde o link de Contato**, o **lightbox não fecha por teclado nem por botão**,
e **Home e /banda não têm nenhum call-to-action**.

### Nota por eixo

| Eixo | Nota | Resumo |
| --- | --- | --- |
| 1. Hierarquia de conteúdo | **C** | Base semântica certa, mas os `<h1>` são slogans decorativos e `/ao-vivo` tem 9 `<h2>` sem ordem |
| 2. Tipografia / legibilidade | **C−** | Corpo ≥ 16px e CLS 0, mas ~20 elementos em 9–12px e zoom 200% quebra 4/5 rotas |
| 3. Leitura sobre o vídeo | **B−** (era D) | O véu desta auditoria trouxe kicker/título/nav/quote para AA; sobra "Psychedelia" (`mix-blend-screen`) |
| 4. Contraste / acessibilidade | **C−** | axe quase limpo e semântica boa, mas accent reprova AA, bordas invisíveis, foco fraco, sem skip-link, lightbox sem teclado |
| 5. CTAs | **D+** | `/contato` faz bem; o resto do site quase não tem ação, e "ouça a música" / "ver agenda" falham |
| 6. Experiência mobile | **D+** | pinch-zoom e landscape ok, mas nav esconde item, overflow horizontal, toque 33px, páginas de 11–29 telas, lightbox |
| 7. Performance | **D** (fundação B, entrega F) | SSR/cache-static/zero-terceiros excelentes; 11–20 MB/rota e LCP 10–23 s no mobile destroem a nota |

### Top 10 achados

| # | id | eixo | 1 linha |
| --- | --- | --- | --- |
| 1 | **F1** | perf | vídeo 4,5 MB baixado inteiro em toda rota → LCP mobile 10–23 s |
| 2 | **F2** | perf | prefetch dos `<Link>` faz cada rota baixar 5–9 MB de imagens de outras rotas |
| 3 | **F36** | a11y / mobile | lightbox: sem botão de fechar, `Esc` não fecha, scroll do fundo não travado, `role`/foco ausentes |
| 4 | **F31** | mobile | o último item da nav ("Contato") fica fora da tela no mobile, sem affordance |
| 5 | **F17** | tipografia / a11y | zoom 200% → scroll horizontal em 4/5 rotas (reprova WCAG 1.4.10) |
| 6 | **F6** | contraste | `text-accent` (#e31b23/#080808) = 4,24:1 reprova AA em texto pequeno (`/ao-vivo`, `/sons`, roles) |
| 7 | **F22 / F23** | CTA | Home e `/banda` sem CTA; "ouça a música" leva ao artista (não à faixa), 3/4 releases sem link |
| 8 | **F39** | perf | shader consome ~39% de 1 core continuamente; só pausa em `document.hidden` |
| 9 | **F33** | mobile | os 4 links da nav têm 33px de altura (< 44px de toque) |
| 10 | **F11** | leitura | título "Psychedelia" (`mix-blend-screen` + accent) some sobre o halftone claro (1,68:1 mesmo com o véu) |

### Todos os achados

| id | eixo | sev. | esforço | status |
| --- | --- | --- | --- | --- |
| F1 | perf/vídeo | crítico | M | aberto |
| F2 | perf | crítico | S | aberto |
| F3 | perf | alto | M | aberto |
| F4 | perf | alto | S | aberto |
| F5 | perf | alto | M | aberto |
| F6 | contraste | sério | S | aberto |
| F7 | a11y | médio | XS | **resolvido** (`aria-hidden` no wrapper do shader) |
| F8 | contraste | médio | XS | aberto |
| F9 | contraste | médio | S | aberto |
| F10 | leitura/vídeo | alto | S | **mitigado** (véu: 3,75→5,05:1) |
| F11 | leitura/vídeo | alto | S–M | **parcial** (véu: 1,18→1,68:1; ainda reprova) |
| F12 | leitura/vídeo | alto | S | **mitigado** (véu; falta padronizar com o mobile) |
| F13 | hierarquia | alto | M | aberto |
| F14 | hierarquia/conteúdo | alto | S | **parcial** (`/sons` editado p/ "Álbuns, EPs e singles") |
| F15 | hierarquia | médio | S | aberto |
| F16 | tipografia | alto | M | aberto |
| F17 | tipografia/a11y | alto | M | aberto |
| F18 | tipografia | médio | XS | aberto |
| F19 | tipografia | baixo | XS | aberto |
| F20 | microcopy | baixo | XS | aberto |
| F21 | conteúdo | baixo | XS | aberto |
| F22 | CTA | alto | M | aberto |
| F23 | CTA | alto | M | aberto |
| F24 | CTA/conteúdo | médio | M | aberto |
| F25 | CTA/microcopy | médio | S | aberto |
| F26 | CTA | médio | S | aberto |
| F27 | CTA/a11y | baixo | XS | aberto |
| F28 | a11y | médio | S | aberto |
| F29 | a11y | médio | S | aberto |
| F30 | mobile/toque | baixo | XS | aberto |
| F31 | mobile | alto | S | aberto |
| F32 | mobile/a11y | alto | XS | aberto |
| F33 | mobile/toque | alto | S | aberto |
| F34 | mobile | médio | M | aberto |
| F35 | mobile | médio | S | aberto |
| F36 | a11y/mobile | alto | M | aberto |
| F37 | mobile | médio | S | aberto |
| F38 | perf | alto | S | aberto |
| F39 | perf | alto | S | aberto |
| F40 | perf | médio | S | aberto |
| F42 | perf | alto | M | aberto |

Positivos (não são achados — o que **não** mexer): SSR sem JS bloqueante ·
CLS 0 · SEO/BP 100 · `prefers-reduced-motion` completo · `document.hidden`
pausa o shader · `/_next/static` imutável · zero terceiros · CSS 6,4 KB gz ·
1 `<h1>`/rota · pinch-zoom permitido · `rel="noreferrer"` nos externos ·
`next/font` self-hosted · `/contato` como referência de CTA.

### Sequência de correção sugerida (o "plano 2")

**Onda 1 — performance, muito impacto / pouco esforço.** Deve tirar o LCP
mobile de ~15 s para ~2–3 s e o peso de rota de ~15 MB para ~2 MB.

1. **F2** — `prefetch={false}` nos `<Link>` da nav (ou prefetch só no hover).
2. **F1 / F40** — `<video preload="none">`, montar a fonte em
   `requestIdleCallback`; não deixar o `<canvas>` ser o elemento LCP.
3. **F38** — `Cache-Control` longo para `/video` e as pastas de imagem
   (regra de proxy/CDN, ou importar imagens como módulos hasheados).
4. **F4 / F42** — logos → SVG (ou PNG 192px); vídeo → 540p + CRF + `<source>`
   WebM/AV1; `MAX_SIDE` do `import-photos.py` → ~900.
5. **F32** — `overflow-x: clip` também no `html` (hoje só `body`).

**Onda 2 — acessibilidade bloqueante.**

6. **F36** — lightbox: botão de fechar, `Esc`, foco preso, travar scroll do
   fundo, `role="dialog"` + `aria-modal` + `aria-label`, devolver o foco.
7. **F29** — `:focus-visible` estilizado (2px, cor da marca) + skip-link.
8. **F6 / F9 / F8** — subir a luminância do accent no tema night para ~4,5–6:1
   (o ember já está lá), ou reservá-lo para texto grande e usar `fg`/`copy`
   nos rótulos; `--color-line` de `.18` → `~.38`.
9. **F31 / F33** — nav mobile: caber os 4 links (ou menu), `py-3`/`min-h`
   para 44px de toque.

**Onda 3 — conteúdo e tipografia.**

10. **F16** — subir a escala de rótulo (11→12–13px, 9→11px).
11. **F17 / F37** — teto menor nos `clamp()` dos títulos; `overflow-wrap`.
12. **F14** — `<h1>` funcionais nas rotas restantes (`/banda`, `/ao-vivo`,
    `/contato`).
13. **F13** — reestruturar os headings de `/ao-vivo` (agrupar Eventos /
    Galeria, tirar a duplicata).
14. **F22–F24** — CTA por faixa em `/sons`, botão de contato claro (aposentar
    "Booking" cru), decidir o que é a "agenda 2026".
15. **F18 / F19 / F20 / F21** — polimento de texto.

**Onda 4 — performance estrutural.**

16. **F5** — `<img>` → `next/image` (o deploy é Node, o otimizador roda).
17. **F3** — manter o `three` fora do bundle das rotas e carregar sob demanda.
18. **F39** — pausar o shader quando rolado para fora de vista
    (`IntersectionObserver`), não só em `document.hidden`.
19. **F34 / F35** — paginar / filtrar as galerias de `/ao-vivo`;
    `aspect-[3/4]` fixo nos integrantes em vez de `vh`.

### Estado do repositório ao fim da auditoria

- Correções aplicadas durante a auditoria: `.video-scrim` (véu, 2 commits) +
  `aria-hidden` no wrapper do shader (F7).
- `garden/app/banda/page.jsx` e `garden/app/sons/page.jsx` com edições fora
  desta auditoria (reformatação + `/sons` com `<h1>` funcional) — **buildam**,
  ainda sem commit no fim desta etapa.
- Ferramentas de auditoria (`lighthouse`, `axe-core`, `playwright`) instaladas
  só no scratchpad, fora do repo.
