import { TrackRow } from '../TrackRow'

// Linha de faixa sem prévia: só o link para a página da letra.
export function TrackLinkRow({ track, number, label }) {
  return (
    <TrackRow href={`/sons/${track.slug}`}>
      {number && <TrackRow.Number>{number}</TrackRow.Number>}
      <TrackRow.Body>
        <TrackRow.Title>{track.title}</TrackRow.Title>
        {label && <TrackRow.Caption>{label}</TrackRow.Caption>}
      </TrackRow.Body>
    </TrackRow>
  )
}
