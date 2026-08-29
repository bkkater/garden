'use client'

import { useEffect, useRef, useState } from 'react'
import { usePlayer } from '../../hooks/usePlayer'
import { fmt } from '../GlobalPlayer/parts/format'

function VolumeIcon({ muted }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }
  return muted ? (
    <svg {...common}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  ) : (
    <svg {...common}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

export function TrackPlayButton({ track }) {
  const { state, play, promote, seek, setVolume } = usePlayer()

  const isThis = state.track?.slug === track.slug
  const isPlaying = isThis && state.isPlaying
  const progress = isThis ? Math.min(1, Math.max(0, state.progress)) : 0
  const duration = isThis ? state.duration : 0
  const muted = state.volume === 0

  const [volOpen, setVolOpen] = useState(false)
  const volWrapRef = useRef(null)
  const lastVol = useRef(0.8)

  // Chegou na página da faixa com a prévia da lista rolando → vira faixa
  // inteira e segue tocando de onde estava.
  useEffect(() => {
    if (isThis && state.previewLimit) promote()
  }, [isThis, state.previewLimit, promote])

  useEffect(() => {
    if (!volOpen) return
    const onDown = (e) => {
      if (!volWrapRef.current?.contains(e.target)) setVolOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [volOpen])

  const onScrub = (e) => {
    if (!isThis) return
    const rect = e.currentTarget.getBoundingClientRect()
    seek(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)))
  }

  const toggleMute = () => {
    if (muted) {
      setVolume(lastVol.current || 0.8)
    } else {
      lastVol.current = state.volume
      setVolume(0)
    }
  }

  return (
    <div className="flex w-full max-w-md items-center gap-4 rounded-full border border-line py-2 pl-2 pr-4 sm:w-[24rem]">
      <button
        type="button"
        onClick={() => play(track)}
        aria-label={`${isPlaying ? 'Pausar' : 'Reproduzir'} ${track.title}`}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-bg transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        {isPlaying ? (
          <svg className="h-4 w-4" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
            <rect x="0" y="0" width="4" height="16" rx="1.5" />
            <rect x="10" y="0" width="4" height="16" rx="1.5" />
          </svg>
        ) : (
          <svg className="ml-0.5 h-4 w-4" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
            <path d="M0 0l14 8L0 16V0z" />
          </svg>
        )}
      </button>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <span className={isThis ? 'text-accent' : 'text-fg'}>
              {isPlaying ? 'Tocando agora' : 'Ouça a faixa'}
            </span>
            {isPlaying && (
              <span className="flex items-end gap-[2px]" aria-hidden="true">
                {[0, 0.2, 0.1].map((delay, i) => (
                  <span
                    key={i}
                    style={{
                      display: 'block',
                      width: '2px',
                      borderRadius: '2px',
                      background: 'var(--color-accent)',
                      animation: `pipBar 0.8s ease-in-out ${delay}s infinite alternate`,
                    }}
                  />
                ))}
                <style>{`@keyframes pipBar { from { height: 3px } to { height: 11px } }`}</style>
              </span>
            )}
          </span>
          <span className="shrink-0 tabular-nums text-muted">
            {fmt(progress * duration)} / {fmt(duration)}
          </span>
        </div>

        <div
          role={isThis ? 'slider' : undefined}
          aria-label={isThis ? 'Posição da faixa' : undefined}
          aria-valuenow={isThis ? Math.round(progress * 100) : undefined}
          aria-valuemin={isThis ? 0 : undefined}
          aria-valuemax={isThis ? 100 : undefined}
          onClick={onScrub}
          className={`relative h-[3px] w-full overflow-hidden rounded-full bg-line ${
            isThis ? 'cursor-pointer' : ''
          }`}
        >
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${progress * 100}%`, transition: 'width 0.12s linear' }}
          />
        </div>
      </div>

      <div className="relative flex shrink-0 items-center self-center" ref={volWrapRef}>
        <button
          type="button"
          onClick={() => setVolOpen((o) => !o)}
          aria-label="Volume"
          aria-expanded={volOpen}
          className={`flex items-center justify-center transition-colors hover:text-fg ${
            volOpen ? 'text-fg' : 'text-muted'
          }`}
        >
          <VolumeIcon muted={muted} />
        </button>

        {volOpen && (
          <div className="absolute bottom-full right-1/2 z-10 mb-6 flex translate-x-1/2 flex-col items-center gap-3 rounded-full border border-line bg-bg px-2.5 py-3.5 shadow-lg">
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={state.volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="Ajustar volume"
              aria-orientation="vertical"
              className="w-1 cursor-pointer appearance-none rounded-full"
              style={{
                height: '5.5rem',
                writingMode: 'vertical-lr',
                direction: 'rtl',
                accentColor: '#fff',
                background: `linear-gradient(to top, #fff ${
                  state.volume * 100
                }%, var(--color-line) ${state.volume * 100}%)`,
              }}
            />
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? 'Ativar som' : 'Silenciar'}
              className="shrink-0 text-muted transition-colors hover:text-fg"
            >
              <VolumeIcon muted={muted} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
