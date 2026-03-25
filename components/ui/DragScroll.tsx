'use client'

/**
 * DragScroll — wrapper qui ajoute le drag-to-scroll horizontal sur desktop.
 * Sur mobile, le scroll natif tactile fonctionne déjà.
 * Sur desktop, cliquer-glisser fait défiler horizontalement (comme un swipe).
 * 'use client' isolé.
 */

import { useRef, useCallback, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export function DragScroll({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    dragging.current = true
    startX.current = e.pageX - el.offsetLeft
    scrollLeft.current = el.scrollLeft
    el.style.cursor = 'grabbing'
    el.style.userSelect = 'none'
  }, [])

  const onMouseUp = useCallback(() => {
    const el = ref.current
    if (!el) return
    dragging.current = false
    el.style.cursor = 'grab'
    el.style.userSelect = ''
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return
    const el = ref.current
    if (!el) return
    e.preventDefault()
    const x = e.pageX - el.offsetLeft
    const walk = (x - startX.current) * 1.5
    el.scrollLeft = scrollLeft.current - walk
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{ cursor: 'grab' }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {children}
    </div>
  )
}
