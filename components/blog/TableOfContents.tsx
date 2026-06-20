/**
 * TableOfContents — sommaire sticky avec scroll tracking.
 * 'use client' : IntersectionObserver + scroll tracking.
 * Extrait les H2 du .prose-article et met en surbrillance le H2 visible.
 */
'use client'

import { useEffect, useState, useRef } from 'react'

type TocItem = { id: string; text: string }

export function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  /* Extraire les H2 du DOM au mount */
  useEffect(() => {
    const prose = document.querySelector('.prose-article')
    if (!prose) return
    const headings = prose.querySelectorAll('h2')
    const tocItems: TocItem[] = []
    headings.forEach((h, i) => {
      if (!h.id) h.id = `section-${i}`
      tocItems.push({ id: h.id, text: h.textContent ?? '' })
    })
    setItems(tocItems)

    /* IntersectionObserver pour le tracking */
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )
    headings.forEach((h) => observerRef.current!.observe(h))

    return () => observerRef.current?.disconnect()
  }, [])

  if (items.length === 0) return null

  return (
    <nav aria-label="Sommaire">
      <p
        style={{
          fontFamily: 'var(--next-font-mono), monospace',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--route-color)',
          marginBottom: 'var(--space-3)',
        }}
      >
        Au sommaire
      </p>
      <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2px', margin: 0, padding: 0 }}>
        {items.map((item, i) => {
          const isActive = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                style={{
                  display: 'flex',
                  gap: 'var(--space-2)',
                  padding: '5px 8px',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  lineHeight: 1.35,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: isActive ? 'color-mix(in oklab, var(--route-color) 12%, transparent)' : 'transparent',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'color 0.15s, background 0.15s',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--next-font-mono), monospace',
                    fontSize: '11px',
                    color: 'var(--route-color)',
                    flexShrink: 0,
                    marginTop: '1px',
                    fontWeight: 700,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{item.text}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
