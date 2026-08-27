import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const TransitionContext = createContext(null)

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
]

export function usePageTransition() {
  return useContext(TransitionContext)
}

export function TransitionProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [phase, setPhase] = useState('idle')
  const pendingPath = useRef(null)
  const locationRef = useRef(location.pathname)

  useEffect(() => {
    locationRef.current = location.pathname
  }, [location.pathname])

  const goTo = (path) => {
    if (path === locationRef.current || phase !== 'idle') return
    pendingPath.current = path
    setPhase('cover')
  }

  const onCovered = () => {
    if (pendingPath.current) navigate(pendingPath.current)
    setPhase('reveal')
  }

  const onRevealed = () => {
    pendingPath.current = null
    setPhase('idle')
  }

  return (
    <TransitionContext.Provider value={{ goTo, phase }}>
      {children}
      <TransitionOverlay phase={phase} onCovered={onCovered} onRevealed={onRevealed} />
    </TransitionContext.Provider>
  )
}

function TransitionOverlay({ phase, onCovered, onRevealed }) {
  const canvasRef = useRef(null)
  const frameRef = useRef(0)
  const progressRef = useRef(0)
  const callbacks = useRef({ onCovered, onRevealed })

  useEffect(() => {
    callbacks.current = { onCovered, onRevealed }
  }, [onCovered, onRevealed])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const cell = 14
    let running = phase !== 'idle'

    const draw = (progress) => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)
      if (progress <= 0) return

      ctx.fillStyle = '#e31b23'
      const cols = Math.ceil(width / cell)
      const rows = Math.ceil(height / cell)
      const threshold = progress * 16

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          if (BAYER[y % 4][x % 4] < threshold) {
            ctx.fillRect(x * cell, y * cell, cell, cell)
          }
        }
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      draw(progressRef.current)
    }

    resize()
    window.addEventListener('resize', resize)

    const tick = () => {
      if (!running) return

      if (phase === 'cover') {
        progressRef.current = Math.min(1, progressRef.current + 0.045)
        draw(progressRef.current)
        if (progressRef.current >= 1) {
          running = false
          callbacks.current.onCovered()
          return
        }
      }

      if (phase === 'reveal') {
        progressRef.current = Math.max(0, progressRef.current - 0.05)
        draw(progressRef.current)
        if (progressRef.current <= 0) {
          running = false
          callbacks.current.onRevealed()
          return
        }
      }

      frameRef.current = requestAnimationFrame(tick)
    }

    if (phase !== 'idle') {
      frameRef.current = requestAnimationFrame(tick)
    } else {
      progressRef.current = 0
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    return () => {
      running = false
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [phase])

  return (
    <canvas
      ref={canvasRef}
      className={`transition-overlay ${phase !== 'idle' ? 'is-active' : ''}`}
    />
  )
}
