# Plano de análise UX/UI — site Garden Psychedelia

Plano para auditar o site (Next 16 + Tailwind, `garden/`) em 7 eixos:
hierarquia de conteúdo, tipografia/legibilidade, leitura sobre o vídeo,
contraste/acessibilidade, CTAs, experiência mobile e performance.

O objetivo é **diagnóstico** — cada eixo produz uma lista de achados
priorizados (severidade + esforço), não correções. As correções entram num
segundo plano, depois que a Bianca decidir o que atacar.

---

## 0. Preparação

### Ferramentas

| Ferramenta | Uso |
| --- | --- |
| Lighthouse (Chrome DevTools ou `npx lighthouse`) | Performance, acessibilidade, SEO, best practices — mobile e desktop |
| axe DevTools / `@axe-core/playwright` | Violações WCAG programáticas por rota |
| WebAIM Contrast Checker / DevTools "Contrast" | Razão de contraste texto/fundo |
| Chrome DevTools > Rendering | Emular `prefers-reduced-motion`, `prefers-contrast`, visão de cores, "Paint flashing", FPS meter |
| DevTools > Network (throttling "Slow 4G" + "Fast 4G") | Comportamento em conexão real |
| Teclado + leitor de tela (VoiceOver no macOS: ⌘F5) | Navegação sem mouse, ordem de foco, rótulos |
| `docs/baseline/` | Referência visual das 5 rotas (desktop + mobile) |
| Dispositivo real (um Android intermediário + um iPhone) | Toque, scroll, teclado virtual, `100vh` |

### Escopo

5 rotas × 2 breakpoints (mobile 390px, desktop 1440px) + 1 estado de erro (`/404`):

```
/            Home
/banda       Banda
/ao-vivo     Ao vivo   (inclui lightbox da galeria)
/sons        Sons
/contato     Contato
/naoexiste   not-found
```

Testar em **3 condições de motion/tema**:
1. Padrão
2. `prefers-reduced-motion: reduce`
3. Tela de carregamento (recarregar com cache limpo)

### Como rodar

```bash
cd garden && npm run dev        # http://localhost:3000
```

Auditar a build de produção para números de performance:

```bash
cd garden && npm run build && npm run start
npx lighthouse http://localhost:3000 --preset=desktop --view
npx lighthouse http://localhost:3000 --view      # mobile (padrão)
```

### Formato do achado

Cada achado registra: `[eixo] rota/componente — descrição — evidência (print/medição) — severidade (crítico/alto/médio/baixo) — esforço estimado`.

Severidade:
- **Crítico**: bloqueia uso ou reprova WCAG A em fluxo essencial (contato, navegação).
- **Alto**: prejudica compreensão/leitura para parte relevante dos visitantes.
- **Médio**: fricção perceptível, contornável.
- **Baixo**: polimento.

---

## 1. Hierarquia de conteúdo e textos

### O que verificar

- **Ordem de leitura por rota**: o que a pessoa vê primeiro bate com a
  prioridade do negócio? (Home: nome da banda → identidade → onde ouvir/agenda.
  Contato: e-mail acima de tudo.)
- **Um `<h1>` por página**, `<h2>`/`<h3>` sem pular nível. Hoje:
  `components/PageHead.jsx` emite o `<h1>`; conferir Home (`app/page.jsx` tem
  `<h1>` próprio) e as seções internas de `banda`/`sons`/`ao-vivo`.
- **Eyebrow "01 — Banda" etc.**: é decorativo ou informativo? Se decorativo,
  não deveria competir visualmente com o `<h1>`.
- **Densidade**: blocos de texto corrido (`band.about`, `band.manifesto`,
  notas de release) — comprimento de linha, quantidade, se há resumo/gancho
  antes do parágrafo longo.
- **Conteúdo redundante**: a Home repete cidade/ano no kicker e na quote;
  `banda` repete "alternativo por natureza / sério por escolha" no `<h1>` e na
  quote logo abaixo. Mapear repetições e decidir se são reforço ou ruído.
- **CTA ausente na Home**: a Home institucional não leva a lugar nenhum além
  da nav — falta um destino claro ("ouça", "agenda", "assista").
- **Escaneabilidade**: títulos de seção (`Integrantes`, `No estúdio`,
  `Weird Party N`) são suficientes para navegar a página batendo o olho?
- **Microcopy**: "Booking", "↗", "N fotos", "plays" — consistência de tom
  (pt-BR vs. inglês), clareza para quem não é fã.

### Como

- Screenshot de cada rota, marcar a sequência de fixação visual esperada vs.
  a hierarquia tipográfica real.
- Extrair a árvore de headings: DevTools > acessibilidade, ou
  `document.querySelectorAll('h1,h2,h3,h4')` no console de cada rota.
- Teste dos 5 segundos: mostrar a Home a alguém de fora por 5s e perguntar "o
  que é isso? o que dá pra fazer aqui?".

### Critérios

- Exatamente 1 `<h1>` por rota; sem salto de nível de heading.
- Toda rota tem um próximo passo óbvio (CTA) acima da dobra.
- Nenhum parágrafo com mais de ~4 linhas sem subtítulo/quebra.

---

## 2. Tipografia e legibilidade

### O que verificar

- **Tamanhos mínimos**: o site usa muito `text-[11px]`, `text-[10px]`,
  `text-[9px]` (kickers, índices da nav, créditos de foto, chips de demo).
  Auditar cada ocorrência — corpo de texto abaixo de 14px e rótulos abaixo de
  12px são suspeitos, ainda mais em mono com `letter-spacing` alto.
- **Comprimento de linha**: alvo 45–75 caracteres. Hoje há `max-w-[34ch]` na
  Home (ok) e `max-w-[920px]` no `PageHead` (pode passar de 90 caracteres em
  desktop). Medir os parágrafos de `banda` e as notas de `sons`.
- **Altura de linha**: corpo em `leading-relaxed`/`leading-[1.45]` (ok);
  conferir os `<h1>` em `leading-[0.92]`/`leading-[0.85]` — apertado demais faz
  descendentes/acentos (ção, ã, é) colidirem com a linha seguinte. Testar com
  as strings reais em pt-BR.
- **`clamp()` dos títulos**: `clamp(42px,11vw,140px)` (Home),
  `clamp(40px,7vw,92px)` (PageHead) etc. Verificar nos extremos (320px, 768px,
  1024px, 1440px, 1920px) se algum título estoura a largura ou fica pequeno
  demais no tablet.
- **Fraunces (serif) em itálico** para citações e "psicodelia como referência":
  em corpo pequeno + fundo escuro + shader, o itálico fino perde traço. Checar
  peso (500) vs. legibilidade.
- **`letter-spacing` alto em caixa alta** (`tracking-[0.14em]`,
  `tracking-[0.18em]`): ajuda em rótulos curtos, atrapalha se aplicado a texto
  com mais de ~3 palavras.
- **Quebra de palavra**: o e-mail em `/contato` quebra no meio
  (`talktogarden@g / mail.com`) no mobile — `break-words` numa string longa.
  Avaliar `word-break` vs. reduzir o `clamp` vs. `hyphens`.
- **Antialiasing / peso**: Syne 800 em corpo grande sobre preto pode "encher"
  (halação). Ver se `-webkit-font-smoothing` ajuda.
- **FOUT/FOIT**: `next/font` com `display: 'swap'` — medir o salto de layout
  quando Fraunces/Syne trocam da fallback (`size-adjust`? checar CLS).

### Como

- Planilha de todos os pares (elemento → font-size / line-height / tracking /
  max-width / peso), destacando os fora de faixa.
- Zoom do navegador a 200% (requisito WCAG 1.4.4) em cada rota: nada pode
  sumir, sobrepor ou exigir scroll horizontal.
- Testar com "Aumentar só o tamanho da fonte" (Firefox) — pega tamanhos em
  `px` que não escalam.

### Critérios

- Corpo de texto ≥ 16px; rótulos/legendas ≥ 12px (idealmente 13–14).
- Nenhum bloco de leitura acima de ~75 caracteres/linha.
- Zoom 200% sem perda de conteúdo nem scroll horizontal.
- CLS < 0.1 atribuível a fontes.

---

## 3. Leitura sobre o background de vídeo

Este é o eixo mais crítico do site — o shader (`components/ShaderVideo.jsx`)
cobre o topo de todas as rotas (`SiteChrome` → `fixed inset-0 z-0`), e o
conteúdo passa por cima nos primeiros ~46vh (`PageShell` `mt-[46vh]`; a Home
inteira fica sobre ele).

### O que verificar

- **Contraste dinâmico**: o vídeo é animado e vai de quase-preto a rosa/branco
  claro. Texto claro sobre o frame claro do halftone pode cair para 2:1.
  Amostrar vários frames (pausar o vídeo em pontos diferentes) e medir o
  contraste do texto que fica sobre ele: kicker da Home, `<h1>`, quote,
  eyebrow "01 — Banda", nav.
- **Nav com `mix-blend-difference`** (desktop): a cor final depende do que
  está atrás. Sobre áreas médias do shader o texto pode ficar cinza-sujo,
  quase invisível. No mobile já usa gradiente + `mix-blend-normal` — comparar.
- **Ausência de camada de proteção**: hoje não há scrim (overlay escuro
  semitransparente) nem `text-shadow` no conteúdo sobre o vídeo, só o grão.
  Avaliar: `text-shadow` sutil, um gradiente `from-bg` atrás do bloco de
  texto, ou reduzir `uEffectStrength`/brilho do shader na região do texto.
- **`text-muted` (#9a8f82) sobre o shader**: kicker da Home e créditos —
  provavelmente reprova contraste mesmo sobre `#080808`, e muito mais sobre o
  vídeo. (já anotado no baseline da Fase 0)
- **Movimento atrás do texto**: ler enquanto algo pulsa/gira atrás cansa e
  atrapalha dislexia/TDAH. Ver o comportamento com `prefers-reduced-motion`
  (o shader não monta — vira `bg-bg` sólido: esse é o "modo legível", conferir
  se é bom o suficiente para virar padrão em telas de conteúdo).
- **Estado de carregamento do vídeo**: enquanto o shader não montou, o fundo é
  `bg-bg`. Há um "pulo" visual quando ele aparece? O texto fica ilegível só
  nesse intervalo?
- **Impressão / modo alto contraste do SO**: `prefers-contrast: more` —
  o site responde?

### Como

- Gravar 10s do shader, extrair 6–8 frames, sobrepor os textos reais (mesma
  posição/tamanho) e rodar o contrast checker em cada combinação.
- DevTools > Rendering > "Emulate vision deficiencies" com o vídeo rodando.
- Ler cada rota inteira em voz alta com o vídeo ativo — anotar onde a vista
  "escorrega".

### Critérios

- Todo texto sobre o vídeo mantém **≥ 4.5:1 no pior frame** (≥ 3:1 para texto
  grande ≥ 24px/18.66px bold).
- Nav legível em qualquer ponto do vídeo (testar rolando o shader por baixo).
- Existe um caminho de leitura sem movimento atrás do texto.

---

## 4. Contraste e acessibilidade (geral)

### O que verificar

**Contraste (sobre `#080808`, fora do vídeo):**

| Token | Hex | Uso | Suspeita |
| --- | --- | --- | --- |
| `--color-fg` | `#eadcc4` | corpo/títulos | ok (~15:1) |
| `--color-copy` | `#d8ccb8` | parágrafos | ok (~12:1) |
| `--color-muted` | `#9a8f82` | kickers, legendas, índices | **~5:1 — reprova para < 18px** |
| `--color-accent` | `#e31b23` | rótulos mono, links hover, títulos | **~4.4:1 — reprova AA para texto normal** |
| `--color-line` | `rgba(234,220,196,.18)` | bordas de tabela/card | verificar 3:1 para elementos não-textuais (WCAG 1.4.11) |

O `text-accent` aparece em `text-[11px]` (créditos de evento, "plays",
`role` dos integrantes) — provável reprovação sistemática.

**Teclado e foco:**
- Nenhum estilo de `:focus-visible` foi definido no `globals.css` — confirmar
  se o anel padrão do browser sobrevive ao reset do Tailwind e se é visível
  sobre fundo escuro/vídeo.
- Ordem de tabulação em cada rota (nav → conteúdo → footer/links).
- **Lightbox** (`components/LiveGallery.jsx`): abre com `onClick` num
  `<button>` (ok), mas fecha só por clique no fundo (`role="presentation"`).
  Faltam: fechar com `Esc`, foco preso dentro do modal, devolver o foco ao
  botão de origem, `role="dialog"` + `aria-modal` + `aria-label`, impedir
  scroll do fundo.
- `<a href="mailto:">` e links externos (`target="_blank"` já tem
  `rel="noreferrer"` — ok) são alcançáveis e anunciados.

**Semântica / leitor de tela:**
- `alt` das imagens: fotos de galeria têm `alt` descritivo (bom); conferir
  logos (`alt=""` decorativo em `SiteChrome`/nav — ok) e capas de release.
- `aria-hidden="true"` no grão e no wrapper do shader — conferir que nada
  focável fica escondido dentro.
- `<nav>`, `<main>`, `<header>`, `<footer>` presentes e únicos onde faz
  sentido. Falta **skip-link** ("pular para o conteúdo") — a nav é fixa e vem
  antes do `<main>` em toda navegação.
- Estado ativo da nav: hoje é só cor (`text-accent`) + `aria-current="page"`
  (bom) — a cor sozinha não basta, mas o `aria-current` cobre o leitor de
  tela; conferir se há indicação visual não-cromática (sublinhado, ponto).
- `lang="pt-BR"` no `<html>` (ok). Trechos em inglês ("We Again", "Morning
  Riser", "Booking") não precisam de `lang` mas vale checar como o VoiceOver
  pt lê.
- Título da aba por rota (já implementado via `title.template` — validar).

**Movimento:**
- `prefers-reduced-motion`: shader não monta (ok), `PageShell` `animate-rise`
  e `template` `animate-fadein` usam `motion-safe:` (ok), loading screen
  desliga spin/breathe (ok). Auditar se sobrou alguma animação sem guarda
  (hover `scale-[1.04]` nas fotos, por exemplo — transform em hover geralmente
  é tolerável, mas confirmar).

**Alvos de toque:** links da nav mobile (`px-3 py-2` ≈ 34px de altura) —
abaixo dos 44×44px recomendados. Chips de demo, links de rede social.

### Como

- `npx @axe-core/playwright` ou axe DevTools em cada rota + estado do lightbox
  aberto.
- Lighthouse "Accessibility" (mira ≥ 95, mas ler os itens manuais).
- Percorrer cada rota **só com Tab/Shift+Tab/Enter/Esc**.
- VoiceOver: ler a Home e a `/contato` de cima a baixo; abrir e fechar o
  lightbox.
- Checklist WCAG 2.2 AA (foco visível 2.4.7/2.4.11, target size 2.5.8,
  contraste 1.4.3/1.4.11, reflow 1.4.10, movimento 2.3.3).

### Critérios

- Zero violação axe de nível "serious"/"critical".
- Todo texto ≥ AA (4.5:1 / 3:1). Se um token reprovar, ou muda o token ou o
  uso.
- Foco visível (≥ 3:1 contra o entorno) em 100% dos interativos.
- Lightbox operável e fechável por teclado, com foco gerenciado.
- Skip-link presente.

---

## 5. CTAs

### O que verificar

- **Inventário**: listar todo call-to-action e seu destino —
  nav (Banda/Ao vivo/Sons/Contato), "Booking" (mailto), "Ouvir no Spotify"
  (`/sons`), links de Instagram/Spotify (`/contato`), e-mail gigante
  (`/contato`). A **Home não tem nenhum**.
- **Hierarquia visual**: qual é o CTA primário de cada página? Hoje "Ouvir no
  Spotify" e o e-mail têm tratamento de botão/link grande; o resto é texto.
  Existe um primário claro por rota?
- **Estilo de botão**: `border border-fg px-4 py-3 ... hover:bg-accent
  hover:text-bg` — só outline, sem preenchimento no estado padrão. Contraste
  da borda (`--color-fg` sobre fundo) e do texto ok? O estado hover inverte
  para `bg-accent` (`#e31b23`) + `text-bg` — medir contraste
  `#080808`/`#e31b23` ≈ 4.4:1 (borderline).
- **Affordance**: parece clicável sem hover? No mobile não há hover — o estado
  de repouso precisa se sustentar sozinho.
- **Texto do CTA**: "Booking" (jargão), "↗" sozinho, "Ouvir no Spotify" (bom,
  específico). Verbo + resultado.
- **Posição**: o e-mail em `/contato` está acima; "Ouvir no Spotify" está no
  bloco do featured, longe do topo — e a lista de releases não tem link
  individual pra ouvir.
- **Destinos externos**: abrem em nova aba? Sinalizam isso? (hoje
  `target="_blank"` sem ícone/aviso).
- **Estados**: focus, active, visited (para os externos), e o que acontece no
  toque (delay de 300ms? feedback?).
- **Oportunidades**: player embed do Spotify na Home/Sons; botão "ver agenda"
  / "chamar pra tocar" mais proeminente; link direto pra cada faixa.

### Como

- Mapa de CTAs por rota numa tabela (rótulo, tipo, destino, prioridade,
  tratamento visual, acima/abaixo da dobra).
- Teste de tarefa com alguém de fora: "ouça a música mais recente da banda" /
  "descubra como contratar a banda" — cronometrar e anotar hesitações.

### Critérios

- Todo rota tem 1 CTA primário inequívoco, acima da dobra, com contraste AA
  nos estados de repouso e hover/focus.
- Ação externa/nova aba sinalizada.
- Texto do CTA descreve o resultado.

---

## 6. Experiência mobile

Breakpoint de referência: 390px (e checar 320px e 768px).

### O que verificar

- **Nav fixa** (`components/Navigation.jsx`): no mobile é `flex` com scroll
  horizontal dos links. Verificar: os 4 links cabem sem scroll oculto? o
  scroll horizontal é descobrível? "Booking" some (`hidden lg:block`) — o
  contato fica só via item de menu, ok? A barra cobre conteúdo ao rolar?
- **`pt-28` da Home vs. altura da nav**: já ajustado, mas revalidar em 320px e
  com fonte aumentada — o kicker não pode ficar embaixo da nav.
- **`46vh` do `PageShell` no mobile**: em telas baixas (iPhone SE landscape,
  ou com teclado aberto), 46vh + nav pode empurrar o `<h1>` pra fora. Testar
  `100vh` vs. `100dvh` (barra de endereço do Safari).
- **Grid de integrantes** (`grid-cols-2 ... h-[58vh]`): 2 colunas × 58vh =
  ~1.5 tela por linha, 3 linhas → muito scroll. Baseline fazia 1 coluna.
  Avaliar `aspect-[3/4]` fixo em vez de `vh`.
- **Galeria `/ao-vivo`**: `grid-cols-2` com `min-h-[280px]` e itens `wide`
  em `col-span-1 lg:col-span-2` — no mobile todos viram 1 coluna? conferir.
  Quantidade de imagens (52) + `loading="lazy"` — scroll infinito pesado.
- **Lightbox no mobile**: `p-10` deixa a imagem pequena; fechar só por toque
  no fundo é difícil (a imagem ocupa quase tudo). Falta botão de fechar
  visível e swipe.
- **Alvos de toque**: ver eixo 4. Links de nav, chips, redes sociais, "↗".
- **Tipografia mobile**: os `clamp()` no piso (11–12vw) — títulos ainda
  legíveis? `text-[11px]` fica ainda menor proporcionalmente? Legendas de
  foto sobre imagem no mobile.
- **E-mail que quebra** (`/contato`) — ver eixo 2.
- **Vídeo/shader no mobile**: custo de bateria/GPU, aquecimento; o
  `dpr={[1,1.25]}` + cap 30fps ajuda — medir FPS real num Android médio.
  `preload="metadata"` evita baixar o `.mp4` inteiro no 4G (bom) — confirmar.
- **Orientação**: paisagem no celular — o `46vh` e os `h-[58vh]`/`h-[70vh]`
  ficam achatados?
- **Scroll horizontal acidental**: `body` tem `overflow-x: hidden` mascarando
  — procurar elementos que realmente vazam (títulos com `clamp` grande,
  `tracking` alto). Testar com o overflow visível temporariamente.
- **Zoom**: `<meta viewport>` permite pinch-zoom? (não pode ter
  `user-scalable=no` / `maximum-scale=1`). Checar o default do Next.

### Como

- DevTools device toolbar + **dispositivo real** (o emulador não pega
  toque/scroll/bateria/barra-de-endereço).
- Lighthouse mobile (throttle padrão).
- Gravar a tela do celular percorrendo as 5 rotas.
- `document.documentElement.scrollWidth > innerWidth`? em cada rota.

### Critérios

- Sem scroll horizontal em nenhuma rota (320–430px).
- Alvos de toque ≥ 44×44px (ou 24px com espaçamento, WCAG 2.5.8).
- Pinch-zoom habilitado.
- Nenhuma seção exige mais de ~2 telas de scroll sem um marco visual.
- FPS ≥ 30 estável com o shader no mobile; sem travar o scroll.

---

## 7. Performance

Medir sempre na **build de produção** (`npm run build && npm run start`), não
no dev.

### O que verificar

- **Core Web Vitals** (mobile, Slow/Fast 4G, CPU 4×):
  - LCP — provavelmente o `<h1>` da Home ou a primeira imagem. Alvo < 2.5s.
  - CLS — troca de fonte (`next/font swap`), o shader montando, o
    `PageShell` `animate-rise`. Alvo < 0.1.
  - INP — resposta ao toque na nav e no lightbox. Alvo < 200ms.
  - TTFB — SSG, deve ser baixo; confirmar headers de cache.
- **JS**:
  - Tamanho do bundle de entrada por rota (o `three`/`@react-three/fiber`
    está em chunk `dynamic ssr:false` — confirmar que **não** entra no
    first load JS). Baseline Vite: 316KB gz num bundle só.
  - `components/*` client vs. server — só `Navigation`, `ShaderVideo*`,
    `LiveGallery`, `LoadingScreen`, `template` deveriam ser client. Auditar.
  - Hidratação: quanto tempo até a nav responder.
- **Vídeo** (`public/video/garden-live.mp4`, ~4.6 MB):
  - É o maior asset. Resolução/bitrate atuais vs. necessário (o shader
    pixeliza numa grade de 72 — 720p ou até 540p bastam).
  - Oferecer `<source>` WebM/AV1 (corte estimado de 30–50%).
  - `preload="metadata"` (ok) — confirmar que não baixa tudo no load.
  - Quando o shader não monta (reduced-motion, mobile fraco), o `.mp4` ainda
    é baixado? Não deveria.
- **Imagens** (`public/`):
  - Hoje `<img>` puro, sem `next/image`. 52 fotos em `/ao-vivo`, capas,
    integrantes, pôsteres. Sem `srcset`, sem `sizes`, sem formato moderno
    automático, sem `width/height` na maioria (→ CLS).
  - `import-photos.py` já redimensiona para 1800px — grande demais para
    thumbnails de galeria exibidos a ~180–350px.
  - `loading="lazy"` só na galeria — e nas capas/integrantes/pôsteres?
  - Avaliar migrar para `next/image` (o deploy é Node, então o otimizador
    roda) ou pelo menos gerar `srcset` no script.
- **Fontes**: 3 famílias, ~5 pesos, `next/font` self-hosted (bom). Conferir
  `preload` dos arquivos críticos e `unicodeRange`/subset (`latin` já). Peso
  total dos `.woff2`.
- **CSS**: Tailwind v4 — tamanho do CSS gerado, se há utilitário arbitrário
  demais inflando.
- **Shader em runtime**: custo de GPU/CPU contínuo. Já tem cap 30fps + pausa
  em `document.hidden` + `IntersectionObserver`? (conferir
  `ShaderVideo.jsx` — hoje pausa em `hidden` e capa 30fps; **não** tem
  IntersectionObserver, mas o fundo é fixo/sempre visível). Medir uso de CPU
  parado na página.
- **Rede**: nº de requests por rota, waterfall, `Cache-Control` dos assets
  estáticos (o Next serve `/_next/static` com hash + imutável; `public/` só
  com `Last-Modified` — avaliar headers no proxy/CDN).
- **Terceiros**: hoje nenhum (bom — sem Google Fonts CDN, sem analytics).
  Se entrar analytics/embed, medir o impacto.
- **Lighthouse**: Performance mobile ≥ 90 como meta; ler cada oportunidade.

### Como

```bash
cd garden && npm run build          # ler o output: First Load JS por rota
npm run start
npx lighthouse http://localhost:3000 --view
npx lighthouse http://localhost:3000/ao-vivo --view   # rota mais pesada
```

- DevTools > Performance: gravar carga + 5s parado (ver custo do shader).
- DevTools > Network: throttle "Slow 4G", limpar cache, medir cada rota.
- `du -h public/video public/live` e comparar com o exibido.
- WebPageTest (se possível) para número de terceiro/real.

### Critérios

- Lighthouse Performance ≥ 90 (mobile) nas 5 rotas.
- LCP < 2.5s / CLS < 0.1 / INP < 200ms em Fast 4G + CPU 4×.
- First Load JS da rota sem `three`; `three` só carrega depois da hidratação.
- `garden-live.mp4` ≤ ~1.5 MB (reencode) ou com fonte alternativa menor.
- Imagens de galeria servidas em ~2× o tamanho de exibição, formato moderno,
  com `width`/`height`.
- Sem consumo de CPU perceptível com a aba aberta e parada.

---

## Ordem de execução sugerida

1. **Setup** (§0) — subir a build de produção, instalar axe, preparar
   planilha de achados.
2. **Varredura automática** — Lighthouse (×5 rotas ×2 formfactors) + axe
   (×5 rotas + lightbox). Gera a lista bruta.
3. **Contraste e vídeo** (§3 + §4) — o mais provável de gerar achados
   críticos; feito cedo para dimensionar o esforço.
4. **Hierarquia + tipografia** (§1 + §2) — leitura manual rota a rota.
5. **CTAs** (§5) — inventário + testes de tarefa.
6. **Mobile** (§6) — dispositivo real, as 5 rotas + lightbox + orientação.
7. **Performance aprofundada** (§7) — waterfall, vídeo, imagens, custo do
   shader.
8. **Consolidação** — achados priorizados (severidade × esforço) num único
   documento, com print/medição por item, agrupados por eixo e com um
   "top 10 primeiro".

## Entregável da análise

Um documento `docs/ux-audit-findings.md` com:
- Sumário executivo (nota por eixo + top 10 achados).
- Tabela de achados (id, eixo, rota/componente, severidade, esforço,
  evidência).
- Anexo de medições (Lighthouse JSON, contrastes, prints anotados).
- Recomendação de sequência de correção (o "plano 2").
