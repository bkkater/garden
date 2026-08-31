'use client'

import { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer deve ser usado dentro de <PlayerProvider>')
  return ctx
}
