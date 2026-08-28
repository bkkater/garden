import Link from 'next/link'

// Bloco de prévia de uma seção na Home. O card inteiro é um link.
export default function SectionPreview({ index, label, teaser, image, to, flip }) {
  return (
    <Link
      href={to}
      className="group grid grid-cols-1 items-center gap-6 border-t border-line py-10 md:grid-cols-2 md:gap-12"
    >
      <div className={`overflow-hidden ${flip ? 'md:order-2' : ''}`}>
        <img
          src={image}
          alt=""
          className="aspect-[4/3] w-full object-cover transition duration-700 [filter:contrast(1.08)_saturate(0.85)] group-hover:scale-[1.03] group-hover:[filter:contrast(1.15)_saturate(0.7)]"
        />
      </div>

      <div className={flip ? 'md:order-1' : ''}>
        <p className="font-mono text-xs tracking-widest text-muted">{index}</p>
        <h2 className="mt-1 font-extrabold tracking-tighter text-4xl md:text-5xl group-hover:text-accent">
          {label}
        </h2>
        <p className="mt-3 max-w-prose text-lg leading-relaxed text-copy">
          {teaser}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest group-hover:text-accent">
          Abrir <span aria-hidden="true">↗</span>
        </span>
      </div>
    </Link>
  )
}
