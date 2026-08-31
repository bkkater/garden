// Envelope das subpáginas: uma faixa curta de shader no topo como respiro,
// depois fundo sólido com um fade. O offset é pequeno o bastante para o
// cabeçalho da página (eyebrow + <h1>) já aparecer sem scroll.
export function PageShell({ children }) {
  return (
    <div className="relative z-[2] mt-[24vh] bg-bg sm:mt-[28vh]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-transparent to-bg"
      />
      <div className="px-4 pt-10 pb-28 motion-safe:animate-rise lg:px-8">
        {children}
      </div>
    </div>
  )
}
