'use client'

/**
 * Nav — navigation principale.
 * Logo typographique : "10min·Apple" — contraste de graisse, zéro image.
 * Backdrop blur sticky. Mobile : overlay slide-right.
 * usePathname() pour l'état actif. prefers-reduced-motion via CSS.
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { href: '/blog',        label: 'Blog' },
  { href: '/comparer',    label: 'Comparer' },
  { href: '/quiz',        label: 'Quiz' },
  { href: '/deals',       label: 'Deals' },
  { href: '/simulateur',  label: 'Simulateur' },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Ferme le menu au changement de route
  useEffect(() => {
    const id = setTimeout(() => setOpen(false))
    return () => clearTimeout(id)
  }, [pathname])

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: (scrolled || open) ? 'rgba(10,10,15,0.97)' : 'transparent',
        backdropFilter: (scrolled || open) ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: (scrolled || open) ? 'blur(16px)' : 'none',
        borderBottom: (scrolled || open) ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background-color 300ms ease, border-color 300ms ease',
      }}
    >
      <nav
        aria-label="Navigation principale"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 var(--space-6)',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-8)',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="10minutesapple — accueil"
          style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'baseline', gap: '1px' }}
        >
          <span style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontWeight: 800, fontSize: '14px', color: 'var(--text-primary)', letterSpacing: '0' }}>10min</span>
          <span style={{ color: 'var(--accent-1)', fontWeight: 800, fontSize: '14px' }}>·</span>
          <span style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontWeight: 400, fontSize: '14px', color: 'var(--text-secondary)', letterSpacing: '0' }}>Apple</span>
        </Link>

        {/* Desktop links */}
        <ul role="list" style={{ display: 'flex', gap: 'var(--space-6)', listStyle: 'none', margin: 0, padding: 0, marginLeft: 'auto' }} className="nav-desktop">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                style={{
                  fontSize: '14px',
                  fontWeight: isActive(href) ? 600 : 400,
                  color: isActive(href) ? 'var(--text-primary)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  paddingBottom: '2px',
                  borderBottom: isActive(href) ? '2px solid var(--accent-1)' : '2px solid transparent',
                  transition: 'color 200ms ease, border-color 200ms ease',
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger mobile */}
        <button
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: 'var(--space-2)', marginLeft: 'auto', display: 'flex' }}
          className="nav-hamburger"
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div
          style={{
            position: 'fixed',
            inset: '60px 0 0 0',
            backgroundColor: 'var(--bg-primary)',
            borderTop: '1px solid var(--border)',
            padding: 'var(--space-8) var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
            zIndex: 39,
          }}
          aria-label="Menu mobile"
        >
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: '24px',
                fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                fontWeight: isActive(href) ? 700 : 400,
                color: isActive(href) ? 'var(--accent-1)' : 'var(--text-primary)',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
