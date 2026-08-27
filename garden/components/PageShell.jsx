// Envelope das subpáginas: o conteúdo desce ~46vh para o shader aparecer no
// topo, depois entra em fundo sólido com um fade a partir do vídeo.
export default function PageShell({ children }) {
  return (
    <div className="relative z-[2] mt-[46vh] bg-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-32 h-32 bg-gradient-to-b from-transparent to-bg"
      />
      <div className="px-4 pt-12 pb-28 motion-safe:animate-[rise_0.8s_ease_both] lg:px-8">
        {children}
      </div>
    </div>
  )
}
