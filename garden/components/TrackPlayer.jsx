'use client'

import { useState } from 'react'

// Dois caminhos pro som:
// - "Ver prévia" injeta o embed do Spotify na hora do clique (sem carregar os
//   scripts/cookies do Spotify no load da página).
// - "Ouvir no Spotify" leva direto pra faixa (ou pro perfil da banda, se a
//   faixa ainda não tem link).
export default function TrackPlayer({ trackId, title, fallbackUrl }) {
  const [open, setOpen] = useState(false)

  const trackUrl = trackId
    ? `https://open.spotify.com/track/${trackId}`
    : fallbackUrl

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {trackId && !open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-xs font-medium uppercase tracking-widest text-bg transition-transform duration-200 hover:scale-[1.03]"
          >
            <span aria-hidden="true">▶</span> Ver prévia
          </button>
        )}
        <a
          href={trackUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full border border-fg px-6 py-3 font-mono text-xs font-medium uppercase tracking-widest no-underline transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg"
        >
          Ouvir no Spotify
        </a>
      </div>

      {trackId && open && (
        <iframe
          title={`${title} no Spotify`}
          src={`https://open.spotify.com/embed/track/${trackId}`}
          width="100%"
          height="152"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="mt-4 w-full rounded-xl border-0"
        />
      )}
    </div>
  )
}
