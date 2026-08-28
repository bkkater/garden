# Melhorias de design/UX — plano por etapas

Feedback da Bianca (2026-08-28) organizado em 6 etapas sequenciadas. A ordem
segue dependência: tipografia primeiro (quase tudo mexe em texto), depois
layout, depois conteúdo.

Cada etapa referencia os achados da [auditoria](ux-audit-findings.md) que ela
fecha.

---

## Etapa 1 — Sistema de tipografia (fundação) ✅

> "É um site pequeno pra ter tantas variações de fontes, a legibilidade não
> está boa. Os tamanhos de fontes estão muito personalizados, não dá pra
> aproveitar os tamanhos padrões do Tailwind?"

### Objetivo

Trocar toda a tipografia arbitrária (`text-[clamp(...)]`, `text-[11px]`,
`text-[9px]`…) pela **escala padrão do Tailwind** e reduzir o número de
tamanhos e (opcionalmente) de famílias.

### O que muda

- **Escala** — mapear cada uso para a escala padrão:

  | hoje | vira |
  | --- | --- |
  | `text-[9px]` / `text-[10px]` / `text-[11px]` (labels, eyebrows, créditos, roles) | `text-xs` (12px) |
  | `text-[14px]`, valores da tabela de facts | `text-sm` (14px) |
  | corpo 16px | `text-base` |
  | lead / citação-corpo 18px | `text-lg` |
  | h2 de evento (24px) | `text-2xl` |
  | h3 de release (28px) | `text-3xl` |
  | "No estúdio" (36px), h2 de integrantes | `text-4xl` |
  | h2 de galeria, citação display (`clamp(26–48)`) | `text-4xl md:text-5xl` |
  | `PageHead` h1 (`clamp(40,7vw,92)`) | `text-5xl md:text-6xl lg:text-7xl` |
  | Home hero (`clamp(42,11vw,140)`) | `text-6xl md:text-8xl lg:text-9xl` |
  | "Dbawot" / featured (`clamp(48,8vw,110)`) | `text-6xl lg:text-8xl` |

  → some **todo `clamp()`** e todo px arbitrário; responsividade via
  `md:`/`lg:` em vez de `vw`.

- **Piso de legibilidade** — nada abaixo de 12px (`text-xs`). Corpo continua
  ≥ 16px.
- **`letter-spacing`** — manter só em rótulo curto (`tracking-wider`/
  `tracking-[0.16em]` no `kicker`); tirar de frases uppercase de 3+ palavras.
- **Famílias — DECIDIDO: reduzir para 2.** Syne (display + corpo) + IBM Plex
  Mono (rótulos). **Aposentar a Fraunces.** As citações (`.quote`,
  "psicodelia como referência", notas de release) passam a usar Syne — em
  itálico ou peso normal, a definir no passe. Remove o import da Fraunces em
  `layout.jsx` e o token `--font-serif` (ou re-aponta para Syne).

### Fecha

F16 (texto 9–12px), F18 (linhas longas — revisar `max-w` no mesmo passe),
F19 (tracking em frases). Prepara F17.

### Escopo

`app/globals.css` (`@theme` — remover `--text-*` custom se a opção 2; ajustar
`kicker`), `PageHead.jsx`, `page.jsx` (Home), `banda/`, `sons/`, `ao-vivo/`,
`contato/`, `components/LiveGallery.jsx`. `app/layout.jsx` se mexer nas fontes.

---

## Etapa 2 — Título das subpáginas visível sem scroll ✅

> "Os textos do título das páginas só pegam metade da tela, tem que scrollar
> pra ver. ex 'Alternativo por natureza. Sério por escolha.'"

### Objetivo

O `<h1>` de cada subpágina precisa estar **acima da dobra** ao abrir a página.

### Causa

`components/PageShell.jsx` empurra o conteúdo `mt-[46vh]` para o shader
aparecer no topo. Com o `<h1>` grande logo abaixo, ele nasce cortado.

### O que muda

- Reduzir o offset: `mt-[46vh]` → algo entre `mt-24` e `mt-[28vh]`, ou
  **remover** e deixar o shader aparecer *atrás* do cabeçalho (o véu já dá
  contraste).
- Alternativa: manter uma faixa de shader menor no topo (uns 20–25vh) só como
  "respiro", com o `PageHead` já visível abaixo dela.
- Revalidar com a tipografia da Etapa 1 (títulos menores ajudam sozinhos).

### Fecha

Parte de F17 e F37 (o título não deve mais tocar/estourar depois da Etapa 1).

### Escopo

`components/PageShell.jsx`, `components/PageHead.jsx`.

---

## Etapa 3 — Repensar a Home (`/`)

> "A / é uma página sem scroll. Cada seção do site tem sua página, mas não
> deveria ter o foco central da banda ou apenas uma prévia do conteúdo na
> página principal?"
> "Não gosto dessa quantidade de texto abaixo do nome da banda, não deveria
> ter tanto texto logo de cara."

### Objetivo

A Home deixa de ser um splash institucional e passa a **fazer alguma coisa** —
ou um foco único forte, ou uma vitrine que dá prévia de cada seção.

### DECIDIDO: B — Vitrine com prévia (com scroll)

A Home vira uma página **com scroll**: hero curto + um bloco resumido por
seção (Banda / Ao vivo / Sons / Contato), cada um linkando para a página
cheia. Funciona como landing.

### O que muda

- **Cortar a quote longa** abaixo do nome. Trocar por: nada, ou uma linha
  (ex. "Psicodelia como referência." — 3 palavras), ou mover a quote inteira
  para `/banda` (onde já existe quase igual).
- Adicionar **pelo menos 1 CTA** na Home (hoje tem zero).
- Blocos de prévia:
  - "Banda": foto + 1 frase + link.
  - "Ao vivo": última/próxima data + link.
  - "Sons": capa do lançamento mais recente + "Ouvir" + link.
  - "Contato": e-mail + redes.
- Reaproveita os blocos do design system (`Hero`, `PageHead`, `Kicker`).

### Fecha

F21 (redundância eyebrow/quote), F22 (Home sem CTA), F24 parcial (se B mostrar
a agenda), F14 parcial.

### Escopo

`app/page.jsx`, `lib/content.js` (textos curtos novos), possíveis componentes
de "bloco de seção".

---

## Etapa 4 — Página de Contato

> "A imagem está muito grande, ela deveria ser um círculo e não um quadrado."
> "Falta as redes sociais da banda: YouTube, Instagram e TikTok."

### Objetivo

Imagem menor e circular; lista de redes completa.

### O que muda

- **Imagem** (`contatoMedia.figure` → hoje `logo-red.png`, 4096², 712 KB):
  - Reduzir o tamanho de exibição (voltar a coluna estreita, tipo
    `lg:grid-cols-[1fr_16rem]` em vez do 50/50 atual).
  - Circular: usar `logo-orb.png` (que **já é um círculo** — o orbe marmorizado)
    **ou** `logo-badge.png` com `rounded-full` **ou** mascarar `logo-red` num
    círculo (corta parte do lettering — menos ideal).
  - Recomendação: **`logo-orb.png`** — é literalmente um círculo e bem
    psicodélico. (E reexportar num tamanho menor — ver F4.)
- **Redes** — hoje `content.js` só tem `instagram` + `spotify`. Adicionar:
  - `youtube` → `https://www.youtube.com/channel/UC6rGfPAbTqQWj3DCwdwvaDw`
  - `tiktok` → `https://www.tiktok.com/@gardenpsyched`
  - `instagram` (já existe: `https://www.instagram.com/gardenpsychedelia`)
  - manter `spotify`
  - Renderizar como lista com **ícone + label** (SVGs de Instagram / YouTube /
    TikTok / Spotify — inline, sem dependência).

### Fecha

F4 parcial (logo menor), F27 (indicar link externo com o ícone).

### Escopo

`lib/content.js` (`band.youtube`, `band.tiktok`), `lib/media.js`
(`contatoMedia.figure` → orb), `app/contato/page.jsx`, novos SVGs de ícone
(`components/icons/` ou inline).

---

## Etapa 5 — Redes sociais no site inteiro

> (mesmo item — presença além do /contato)

### Objetivo

As redes não deveriam viver só em `/contato`.

### Decisão aberta

- **Footer persistente** (aparece em todas as rotas, abaixo do `<main>`) com
  os 4 ícones + e-mail. É o padrão para site de banda.
- Ou um bloco de redes no rodapé de cada página.
- Ou nada além do /contato (status quo) — menos recomendado.

Recomendação: **footer persistente** no `SiteChrome`, discreto, com os ícones.

### Fecha

Reforça F22/F25 (contato acessível de qualquer página), F30 (alvo de toque dos
ícones ≥ 44px).

### Escopo

`components/SiteChrome.jsx` (novo `<Footer>`), `components/Footer.jsx`,
`lib/content.js`.

---

## Etapa 6 — Efeitos de entrada das fotos no scroll

> "Sinto falta de efeitos das fotos aparecendo enquanto scrollo."

### Objetivo

Imagens (galeria, integrantes, pôsteres, strip, capas) entram com um fade +
leve deslocamento conforme entram na viewport.

### O que muda

- **CSS puro com `animation-timeline: view()`** (scroll-driven animations,
  suportado nos navegadores atuais) — sem JS, sem `IntersectionObserver`.
  Fallback: sem timeline, a imagem aparece normal (sem animação).
- Ou `IntersectionObserver` + classe `.is-visible` se precisar de suporte mais
  amplo.
- **`prefers-reduced-motion`** — desliga tudo (via `motion-safe:` ou
  `@media`).
- Bônus: o mesmo `IntersectionObserver` pode pausar o shader quando rolado
  para fora de vista (**F39** — shader consome ~39% de CPU contínuo).

### Fecha

Item de feedback + F39 (se usar `IntersectionObserver`).

### Escopo

`app/globals.css` (keyframes + utility `reveal`), `components/LiveGallery.jsx`,
`app/banda/page.jsx`, `app/sons/page.jsx`, `app/ao-vivo/page.jsx`.
Possível `components/Reveal.jsx` wrapper.

---

## Decisões

- ✅ Etapa 1 — **2 famílias** (Syne + IBM Plex Mono), Fraunces aposentada.
- ✅ Etapa 3 — Home vira **vitrine com prévia** das seções, com scroll.
- ✅ Etapa 4 — redes: YouTube `youtube.com/channel/UC6rGfPAbTqQWj3DCwdwvaDw`,
  TikTok `tiktok.com/@gardenpsyched`, Instagram `instagram.com/gardenpsychedelia`,
  Spotify (já em `content.js`).
- ⬜ Etapa 5 — footer persistente com as redes: confirmar.

## Ordem de execução

1 → 2 → 3 são a espinha (tipografia → layout → conteúdo). 4, 5, 6 são
independentes entre si e podem entrar em qualquer ordem depois. Cada etapa
fecha com `npm run build` + revisão visual contra `docs/baseline/`.
