'use client'

/**
 * MagneticButton — wrapper magnétique au curseur pour CTAs premium.
 * Désactivé sur pointer: coarse (mobile/tactile).
 */

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode, type CSSProperties } from 'react'

type MagneticButtonProps = {
  children: ReactNode
  strength?: number
  className?: string
  style?: CSSProperties
}

export function MagneticButton({
  children,
  strength = 0.28,
  className,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x, { damping: 18, stiffness: 200, mass: 0.55 })
  const ySpring = useSpring(y, { damping: 18, stiffness: 200, mass: 0.55 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, x: xSpring, y: ySpring, display: 'inline-block' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
