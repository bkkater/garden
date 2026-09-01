import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// Todo Link/usePathname/useRouter do site vem daqui: são os equivalentes do
// Next já cientes do idioma atual e do prefixo da URL.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
