import { AGENDA_YEAR } from '@shared/lib/site'

// Estado da agenda em aberto. O ano vem de AGENDA_YEAR (shared/lib/site).
export const agenda = {
  year: AGENDA_YEAR,
  status: `A agenda ${AGENDA_YEAR} está aberta.`,
  detail: 'Ainda sem datas confirmadas. ',
  upcoming: [],
}

// Já rolou — retrospectiva (2019–2024).
export const events = [
  {
    title: 'Festival Troque o Disco',
    note: 'Performance ao vivo na III edição do maior festival de música de Campos dos Goytacazes.',
  },
  {
    title: 'Weird Party 1–4',
    note: 'Série de noites da Garden: set ao vivo, DJs, exposição e casa lotada.',
  },
]
