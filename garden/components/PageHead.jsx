// Cabeçalho padrão das subpáginas: eyebrow em mono + headline grande.
export default function PageHead({ eyebrow, children }) {
  return (
    <header className="mb-12 max-w-[920px]">
      <p className="kicker">{eyebrow}</p>
      <h1 className="mt-4 font-extrabold leading-[0.92] tracking-[-0.05em] text-[clamp(40px,7vw,92px)]">
        {children}
      </h1>
    </header>
  )
}
