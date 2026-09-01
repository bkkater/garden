import { contact } from '@shared/lib/site'

// Identidade da banda (herda o contato de shared/lib/site). O texto editorial
// (quote, about, live) vive no namespace "band" dos dicionários.
export const band = {
  ...contact,
  monthlyListeners: 60,
  followers: 438,
}
