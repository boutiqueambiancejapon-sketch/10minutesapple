'use client'

/**
 * HomeHeader — en-t\u00eate interne de la homepage.
 * Logo carr\u00e9 gradient "10" + "Minutes Apple / LE GUIDE HONN\u00caTE" + hamburger.
 * Ouvre un overlay mobile simple avec les liens principaux.
 */

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X, ChevronRight } from 'lucide-react'

const LINKS = [
  { href: '/choisir/iphone',  label: 'Quel iPhone choisir\u00a0?' },
  { href: '/choisir/mac',     label: 'Quel Mac choisir\u00a0?' },
  { href: '/choisir/ipad',    label: 'Quel iPad choisir\u00a0?' },
  { href: '/choisir/watch',   label: 'Quelle Apple Watch choisir\u00a0?' },
  { href: '/comparer',        label: 'Comparer' },
  { href: '/blog',            label: 'Blog' },
  { href: '/deals',           label: 'Deals' },
  { href: '/simulateur',      label: 'Simulateur' },
]

export function HomeHeader() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '16px 20px 6px',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <Link
          href="/"
          aria-label="10minutesapple \u2014 accueil"
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 40,
              height: 40,
              borderRadius: 9,
              background: 'linear-gradient(135deg, var(--accent-1), var(--accent-4))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--next-font-display), serif',
              fontSize: 18,
              color: '#fff',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              boxShadow: '0 4px 14px color-mix(in oklch, var(--accent-1), transparent 60%)',
            }}
          >
            10
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1,
              }}
            >
              Minutes Apple
            </span>
            <span
              style={{
                fontSize: 9,
                color: 'var(--text-muted)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Le guide honn\u00eate
            </span>
          </span>
        </Link>

        <div style={{ flex: 1 }} />

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          style={{
            padding: 10,
            borderRadius: 10,
            border: '1px solid var(--border)',
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {open ? <Menu size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-label="Menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            background: 'var(--bg-primary)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--next-font-display), serif',
                fontSize: 22,
                color: 'var(--text-primary)',
                fontWeight: 400,
              }}
            >
              Menu
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              style={{
                padding: 10,
                borderRadius: 10,
                border: '1px solid var(--border)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
              }}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 4px',
                borderBottom: '1px solid var(--border)',
                fontSize: 16,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              <span>{label}</span>
              <ChevronRight size={16} aria-hidden="true" style={{ color: 'var(--text-muted)' }} />
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
