// Cabeçalho padrão das subpáginas: eyebrow em mono + headline grande.
export function PageHead({ eyebrow, children }) {
  return (
    <header className="mb-12 max-w-4xl">
      <p className="kicker">{eyebrow}</p>
      <h1 className="mt-4 font-extrabold leading-none tracking-tighter text-4xl sm:text-5xl lg:text-6xl">
        {children}
      </h1>
    </header>
  )
}
