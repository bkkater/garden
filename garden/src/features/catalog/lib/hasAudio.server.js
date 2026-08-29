import 'server-only'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const PUBLIC_DIR = join(process.cwd(), 'public')

// Só consideramos que uma faixa tem prévia/demo quando o arquivo de áudio
// realmente existe em /public — nem toda música tem demo gravada.
export function hasAudio(track) {
  return Boolean(track?.audio) && existsSync(join(PUBLIC_DIR, track.audio))
}
