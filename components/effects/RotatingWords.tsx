'use client'

/**
 * RotatingWords — mot qui change avec effet lamelle (clip-path vertical).
 * Machine d'état : idle → exit → enter → idle.
 * prefers-reduced-motion : changement instantané sans animation.
 * aria-live="polite" pour l'accessibilité.
 */

import { useState, useEffect, useRef } from 'react'

type Phase = 'idle' | 'exit' | 'enter'

type RotatingWordsProps = {
  words: string[]
  interval?: number  // ms entre chaque changement
  className?: string
  style?: React.CSSProperties
}

export function RotatingWords({
  words,
  interval = 2800,
  className,
  style,
}: RotatingWordsProps) {
  const [current, setCurrent] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')
  const prefersReduced = useRef(false)
  const t1 = useRef<ReturnType<typeof setTimeout>>(undefined)
  const rafId = useRef<number>(0)

  useEffect(() => {
    prefersReduced.current = matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    const tick = setInterval(() => {
      if (prefersReduced.current) {
        setCurrent(c => (c + 1) % words.length)
        return
      }

      setPhase('exit')
      clearTimeout(t1.current)

      t1.current = setTimeout(() => {
        setCurrent(c => (c + 1) % words.length)
        setPhase('enter')
        // Double rAF : laisse le DOM peindre l'état 'enter' avant la transition
        rafId.current = requestAnimationFrame(() => {
          rafId.current = requestAnimationFrame(() => setPhase('idle'))
        })
      }, 300)
    }, interval)

    return () => {
      clearInterval(tick)
      clearTimeout(t1.current)
      cancelAnimationFrame(rafId.current)
    }
  }, [words.length, interval])

  const isExit = phase === 'exit'
  const isEnter = phase === 'enter'
  const isAnimating = isExit || isEnter

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'bottom',
        ...style,
      }}
      aria-live="polite"
      aria-label={words[current]}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'block',
          opacity: isAnimating ? 0 : 1,
          transform: isExit
            ? 'translateY(-8px) scaleY(0.9)'
            : isEnter
              ? 'translateY(8px) scaleY(0.9)'
              : 'translateY(0) scaleY(1)',
          transformOrigin: isExit ? 'top center' : 'bottom center',
          transition: isEnter
            ? 'none'
            : 'opacity 280ms ease, transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {words[current]}
      </span>
    </span>
  )
}
