'use client'

/**
 * FadeIn — fade + translate subtle à l'apparition au scroll.
 * Respecte prefers-reduced-motion (framer-motion useReducedMotion).
 */

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'

type FadeInProps = {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  once?: boolean
  className?: string
  style?: CSSProperties
}

export function FadeIn({
  children,
  delay = 0,
  duration = 700,
  y = 16,
  once = true,
  className,
  style,
}: FadeInProps) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{
        duration: duration / 1000,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
