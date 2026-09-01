import { AGENDA_YEAR } from '@shared/lib/site'

// Estado da agenda em aberto. Status e detalhe vêm de "shows.*" no dicionário.
export const agenda = {
  year: AGENDA_YEAR,
  upcoming: [],
}

// Já rolou — retrospectiva (2019–2024). A descrição vem de "shows.events.<id>".
export const events = [
  { id: 'festival', title: 'Festival Troque o Disco' },
  { id: 'weirdParty', title: 'Weird Party 1–4' },
]
