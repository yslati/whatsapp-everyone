'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'

interface ParticleProps {
  id: number
  left: string
  top: string
  animationDelay: string
  animationDuration: string
}

export function AnimatedBackground({ particleCount = 30 }: { particleCount?: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const rafRef = useRef<number | undefined>(undefined)
  const mouseRef = useRef({ x: 0, y: 0 })

  const particles = useMemo<ParticleProps[]>(() => 
    Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: `${(i * 7.3) % 100}%`,
      top: `${(i * 11.7) % 100}%`,
      animationDelay: `${(i * 0.1) % 3}s`,
      animationDuration: `${2 + ((i * 0.13) % 3)}s`
    }))
  , [particleCount])

  const updateMousePosition = useCallback(() => {
    setMousePosition({ x: mouseRef.current.x, y: mouseRef.current.y })
    rafRef.current = undefined
  }, [])

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateMousePosition)
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [updateMousePosition])

  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-linear-to-br from-green-900/20 via-green-800/10 to-black"></div>
      
      {mounted && (
        <>
          <div 
            className="absolute w-96 h-96 bg-green-500/20 rounded-full blur-3xl will-change-transform"
            style={{
              transform: `translate(${mousePosition.x / 10 - 192}px, ${mousePosition.y / 10 - 192}px)`,
            }}
          />
          <div 
            className="absolute w-96 h-96 bg-green-400/15 rounded-full blur-3xl will-change-transform"
            style={{
              transform: `translate(${window.innerWidth - mousePosition.x / 15 - 192}px, ${window.innerHeight - mousePosition.y / 15 - 192}px)`,
            }}
          />
          
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-pulse"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.animationDelay,
                animationDuration: particle.animationDuration
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}
