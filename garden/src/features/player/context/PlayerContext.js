'use client'

import { createContext } from 'react'

// Contexto isolado num arquivo só — mantém PlayerProvider elegível a fast refresh.
export const PlayerContext = createContext(null)
