import { band } from '@/lib/content'

// Placeholder — a Home real é reconstruída na Fase 7 do plano de migração.
export default function Home() {
  return (
    <section className="flex min-h-screen flex-col justify-center gap-4 px-4 py-24 lg:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
        Migração Next + Tailwind em andamento
      </p>
      <h1 className="text-[clamp(48px,10vw,120px)] font-extrabold leading-[0.9] tracking-[-0.05em]">
        {band.name.split(' ')[0]}
        <span className="block text-accent mix-blend-screen">
          {band.name.split(' ')[1]}
        </span>
      </h1>
      <p className="max-w-[34ch] font-serif text-lg leading-relaxed text-copy">
        {band.about}
      </p>
    </section>
  )
}
