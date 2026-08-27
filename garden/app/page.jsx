import { band } from '@/lib/content'

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col justify-between px-4 pt-28 pb-10 lg:px-8">
      <p className="kicker flex flex-wrap gap-7">
        <span>Desde {band.since}</span>
        <span>
          {band.city} — {band.state}
        </span>
        <span>Agenda 2026 aberta</span>
      </p>

      <div>
        <p className="mb-3 font-serif text-lg italic">psicodelia como referência</p>
        <h1 className="font-extrabold leading-[0.92] tracking-[-0.05em] text-[clamp(52px,12vw,140px)]">
          Garden
          <span className="block not-italic text-accent mix-blend-screen">
            Psychedelia
          </span>
        </h1>
      </div>

      <p className="max-w-[34ch] font-serif text-lg leading-[1.45]">{band.quote}</p>
    </section>
  )
}
