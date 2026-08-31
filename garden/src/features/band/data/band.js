import { contact } from '@shared/lib/site'

// Identidade da banda (herda o contato de shared/lib/site) + o texto
// editorial usado só na página /banda.
export const band = {
  ...contact,
  monthlyListeners: 60,
  followers: 438,
  quote:
    'A apoteose da amizade. A explosão energética gerada por estética e demanda. A Garden existe para suprir a necessidade da expressão genuína.',
  about:
    'Desde 2019, por amigos e para todos. Nossa base é Rock and Roll, mas nossas referências são maiores que os nossos rótulos. Vivemos a produção, mas namoramos a plateia. Queremos te provocar, queremos te impressionar. Agenda sempre aberta.',
  live:
    'Com cinco shows em diferentes espaços e encontros, 2025 foi um ano de expansão e consolidação da Garden nos palcos, fortalecendo a conexão entre sua música autoral e a comunidade que movimenta a cultura independente da cidade. Em 2026, a Garden abre um novo capítulo com o single “DBAWOT” e a chegada de um novo EP,',
}
