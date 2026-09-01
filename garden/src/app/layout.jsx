// Só existe porque o Next exige um layout raiz quando há app/not-found.jsx.
// Repassa os filhos: quem monta o documento é app/[locale]/layout.jsx (ou o
// próprio not-found), para que trocar de idioma recrie a árvore inteira.
export default function RootLayout({ children }) {
  return children
}
