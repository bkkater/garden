// Equalizer: barrinhas ao lado do nome da faixa. Sempre visível quando há
// faixa no player; a animação congela quando pausado.
export function EqBars({ playing = true, className = '' }) {
  return (
    <span
      className={`flex shrink-0 items-end gap-[2px] ${className}`}
      aria-hidden="true"
    >
      {[0, 0.2, 0.1].map((delay, i) => (
        <span
          key={i}
          style={{
            display: 'block',
            width: '2.5px',
            height: '4px',
            borderRadius: '2px',
            background: 'var(--color-accent)',
            opacity: playing ? 1 : 0.4,
            animation: `eqBar 0.8s ease-in-out ${delay}s infinite alternate`,
            animationPlayState: playing ? 'running' : 'paused',
          }}
        />
      ))}
      <style>{`@keyframes eqBar { from { height: 4px } to { height: 13px } }`}</style>
    </span>
  )
}
