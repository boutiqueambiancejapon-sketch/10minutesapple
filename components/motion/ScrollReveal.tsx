'use client'

/**
 * ScrollReveal — reveal + parallax au scroll.
 * parallax = amplitude en px (0 = pas de parallax).
 */

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode, type CSSProperties } from 'react'

type ScrollRevealProps = {
  children: ReactNode
  parallax?: number
  className?: string
  style?: CSSProperties
}

export function ScrollReveal({
  children,
  parallax = 0,
  className,
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax])

  if (reduced) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        y: parallax > 0 ? y : undefined,
      }}
    >
      {children}
    </motion.div>
  )
}
