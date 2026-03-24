'use client'

/**
 * StickyCTA — barre CTA fixe en bas de l'écran pour les articles.
 * Apparaît après scroll. 1 ou 2 boutons selon le type d'article.
 * 'use client' isolé — la page article reste Server Component.
 */

import { useState, useEffect } from 'react'
import { addAffiliateTag } from '@/lib/utils/affiliate'

export type StickyCTAItem = {
  label: string
  url: string
}

type Props = {
  items: StickyCTAItem[]
  message?: string
}

export function StickyCTA({ items, message }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (items.length === 0) return null

  return (
    <div
      role="complementary"
      aria-label="Offre produit"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 35,
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--glass-border)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: 'var(--space-3) var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
        }}
      >
        {message && (
          <span
            style={{
              flex: 1,
              minWidth: '140px',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              lineHeight: 1.3,
            }}
          >
            {message}
          </span>
        )}

        <div style={{ display: 'flex', gap: 'var(--space-2)', flexShrink: 0, marginLeft: 'auto' }}>
          {items.map((item, i) => {
            const isAmazon = item.url.includes('amazon.fr')
            const href = isAmazon ? addAffiliateTag(item.url) : item.url
            return (
              <a
                key={i}
                href={href}
                rel={isAmazon ? 'nofollow sponsored noopener' : 'noopener'}
                target="_blank"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-2) var(--space-4)',
                  background: i === 0 ? 'var(--accent-1)' : 'var(--surface-2)',
                  color: i === 0 ? '#fff' : 'var(--text-primary)',
                  border: i === 0 ? 'none' : '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '13px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
