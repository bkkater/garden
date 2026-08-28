# Garden Psychedelia — sistema visual

Identidade do site da banda Garden Psychedelia (psicodelia, Campos dos
Goytacazes/RJ). **Sync leve**: tokens de cor + tipografia + 3 blocos de layout.
Não é a biblioteca de componentes completa do site (o site é um app Next.js —
nav, shader de vídeo e galeria não fazem parte deste sync).

## Setup

Envolva a tela num elemento **`.gp-root`** (ou aplique as regras no `<body>`):
ele define `background: var(--color-bg)`, `color: var(--color-fg)` e
`font-family: var(--font-display)`. Sem isso o layout fica com fundo branco e
sem a fonte display.

```jsx
import { Hero, PageHead, Kicker } from 'GardenPsychedelia'

<div className="gp-root" style={{ minHeight: '100vh', padding: '110px 32px 40px' }}>
  <PageHead eyebrow="02 — Ao vivo">Shows, festivais e Weird Parties</PageHead>
</div>
```

Temas: `data-theme="night"` (padrão) e `data-theme="ember"` num ancestral
trocam toda a paleta. Fontes vêm de `fonts.googleapis.com` (importadas em
`styles.css`).

## Idioma de estilo — tokens CSS, não classes utilitárias

Não há Tailwind neste bundle. Os componentes usam classes `.gp-*` fixas
(definidas em `_ds_bundle.css`); **o seu layout usa as variáveis** direto.

**Cores** (`var(--color-*)`):

| token | papel |
| --- | --- |
| `--color-bg` | fundo / superfície (o site é sempre escuro) |
| `--color-fg` | texto e títulos |
| `--color-copy` | parágrafos |
| `--color-muted` | rótulos, legendas, eyebrows |
| `--color-accent` | vermelho da marca — **1 destaque por tela**, nunca em bloco de texto |
| `--color-line` | filetes e divisores (`1px solid var(--color-line)`) |
| `--color-overlay` | fundo de modal / lightbox |

**Tipografia** (`var(--font-*)` + `var(--text-*)` + `var(--tracking-*)`):

| família | var | uso |
| --- | --- | --- |
| Syne 700/800 | `--font-display` | títulos, marca, botões |
| Fraunces | `--font-serif` | citações, intro editorial, itálico |
| IBM Plex Mono | `--font-mono` | rótulos, eyebrows, legendas — **sempre UPPERCASE + `letter-spacing: var(--tracking-label)`** |

Escala display fluida: `--text-hero` (título Home), `--text-h1` (headline de
página), `--text-h2`, `--text-quote`. Corpo: `--text-body` 16px,
`--text-lead` 18px, `--text-kicker` 12px. Títulos display usam
`letter-spacing: var(--tracking-tight)` e `line-height: var(--leading-tight)`.

## Onde está a verdade

- `styles.css` → importa `tokens/colors.css`, `tokens/typography.css`,
  `_ds_bundle.css`. Leia os três antes de estilizar.
- `components/<grupo>/<Nome>/<Nome>.prompt.md` → uso de cada componente.
- `components/foundations/Palette.html` e `Typography.html` → especímenes.

## Snippet idiomático

```jsx
import { PageHead, Kicker } from 'GardenPsychedelia'

<div className="gp-root" style={{ minHeight: '100vh', padding: '48px 32px 120px' }}>
  <PageHead eyebrow="03 — Sons">Discografia</PageHead>

  <section style={{ marginTop: 64, borderTop: '1px solid var(--color-line)', paddingTop: 24 }}>
    <Kicker>Lançamento mais recente</Kicker>
    <h2 style={{
      fontFamily: 'var(--font-display)', fontWeight: 800,
      fontSize: 'var(--text-h2)', letterSpacing: 'var(--tracking-tight)',
      color: 'var(--color-fg)', margin: '8px 0 0',
    }}>Dbawot</h2>
    <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lead)', color: 'var(--color-copy)', maxWidth: '34ch' }}>
      Capa orgânica, vinhas e figuras — o jardim como corpo.
    </p>
  </section>
</div>
```
