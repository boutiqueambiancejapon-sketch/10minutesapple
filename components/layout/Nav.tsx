'use client'

/**
 * Nav V2 — sticky glassy nav avec logo, liens, dropdown, mobile overlay.
 * Polishé éditorial : plus aéré, spacing premium, gradient line + dot pulse.
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const CHOISIR = [
  { href: '/choisir/iphone', label: 'Quel iPhone choisir ?' },
  { href: '/choisir/mac', label: 'Quel Mac choisir ?' },
  { href: '/choisir/ipad', label: 'Quel iPad choisir ?' },
  { href: '/choisir/watch', label: 'Quelle Apple Watch ?' },
  { href: '/choisir/airpods', label: 'Quels AirPods ?' },
]

const COMPARER = [
  { href: '/comparer/iphone', label: 'iPhone' },
  { href: '/comparer/mac', label: 'Mac' },
  { href: '/comparer/ipad', label: 'iPad' },
  { href: '/comparer/watch', label: 'Apple Watch' },
  { href: '/comparer/airpods', label: 'AirPods' },
]

const FLAT_LINKS = [
  { href: '/blog', label: 'Blog' },
  { href: '/deals', label: 'Deals' },
  { href: '/simulateur', label: 'Simulateur' },
]

const navLinkBase = {
  fontSize: '13px',
  fontWeight: 500,
  textDecoration: 'none',
  padding: '6px 4px',
  transition: 'color 200ms ease',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  letterSpacing: '-0.005em',
} as const

const navLinkStyle = (active: boolean) => ({
  ...navLinkBase,
  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
  position: 'relative' as const,
})

const navBtnStyle = (active: boolean) => ({
  ...navLinkStyle(active),
  background: 'none',
  border: 'none',
  cursor: 'pointer',
})

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const id = setTimeout(() => {
      setOpen(false)
      setMobileSection(null)
    })
    return () => clearTimeout(id)
  }, [pathname])

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))
  const isGroupActive = (items: { href: string }[]) =>
    items.some(({ href }) => isActive(href))

  return (
    <>
      <header
        className={`nav-v2${scrolled || open ? ' nav-glass-active' : ''}`}
        style={{
          backgroundColor: scrolled || open ? 'var(--sticky-cta-glass)' : 'transparent',
          backdropFilter: scrolled || open ? 'blur(40px) saturate(1.8)' : 'none',
          WebkitBackdropFilter: scrolled || open ? 'blur(40px) saturate(1.8)' : 'none',
          borderBottom:
            scrolled || open ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        }}
      >
        <nav aria-label="Navigation principale" className="nav-v2-inner">
          {/* Logo */}
          <Link href="/" aria-label="10minutesapple — accueil" className="nav-v2-logo">
            10min
            <span className="brand-dot" aria-hidden="true" />
            Apple
          </Link>

          {/* Desktop */}
          <ul
            role="list"
            style={{
              display: 'flex',
              gap: 'var(--space-6)',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              marginLeft: 'auto',
              alignItems: 'center',
            }}
            className="nav-desktop"
          >
            <li className="dropdown-trigger">
              <button style={navBtnStyle(isGroupActive(CHOISIR))} aria-haspopup="true">
                Choisir <ChevronDown size={12} aria-hidden="true" />
              </button>
              <div className="dropdown-panel" role="menu">
                {CHOISIR.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    role="menuitem"
                    className={`dropdown-item${isActive(href) ? ' dropdown-item-active' : ''}`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </li>

            <li className="dropdown-trigger">
              <Link
                href="/comparer"
                style={navLinkStyle(isActive('/comparer'))}
                aria-haspopup="true"
              >
                Comparer <ChevronDown size={12} aria-hidden="true" />
              </Link>
              <div className="dropdown-panel" role="menu">
                {COMPARER.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    role="menuitem"
                    className={`dropdown-item${isActive(href) ? ' dropdown-item-active' : ''}`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </li>

            {FLAT_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} style={navLinkStyle(isActive(href))}>
                  {label}
                </Link>
              </li>
            ))}

            {/* CTA premium */}
            <li>
              <Link
                href="/quiz"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: '10px 20px',
                  background: 'var(--accent-1)',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-full)',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  boxShadow: '0 6px 20px rgba(255,61,87,0.3)',
                  transition: 'transform 200ms, box-shadow 200ms',
                }}
                className="nav-cta"
              >
                Quiz Apple
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>

          <ThemeToggle />

          {/* Hamburger */}
          <button
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              padding: 'var(--space-2)',
              display: 'flex',
            }}
            className="nav-hamburger"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </nav>

        {/* Gradient line signature */}
        <div
          aria-hidden="true"
          style={{
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, var(--accent-1), var(--accent-4), var(--accent-3), transparent)',
            backgroundSize: '200% 100%',
            animation: 'nav-gradient-shift 10s linear infinite',
            opacity: scrolled || open ? 0.9 : 0.35,
            transition: 'opacity 300ms ease',
          }}
        />
      </header>

      {open && (
        <div
          style={{
            position: 'fixed',
            inset: '72px 0 0 0',
            backgroundColor: 'var(--nav-mobile-bg)',
            borderTop: '1px solid var(--border)',
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
            zIndex: 39,
            overflowY: 'auto',
          }}
          aria-label="Menu mobile"
          role="dialog"
        >
          <button
            onClick={() => setMobileSection((s) => (s === 'choisir' ? null : 'choisir'))}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--space-3) 0',
              width: '100%',
            }}
          >
            <span
              style={{
                fontSize: '26px',
                fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                fontWeight: isGroupActive(CHOISIR) ? 700 : 500,
                color: isGroupActive(CHOISIR) ? 'var(--accent-1)' : 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Choisir
            </span>
            <ChevronDown
              size={18}
              style={{
                color: 'var(--text-secondary)',
                transform: mobileSection === 'choisir' ? 'rotate(180deg)' : 'none',
                transition: 'transform 200ms ease',
              }}
              aria-hidden="true"
            />
          </button>
          {mobileSection === 'choisir' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-1)',
                paddingLeft: 'var(--space-4)',
                borderLeft: '2px solid var(--accent-1)',
                marginBottom: 'var(--space-2)',
              }}
            >
              {CHOISIR.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontSize: '15px',
                    color: isActive(href) ? 'var(--accent-1)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    padding: 'var(--space-2) 0',
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}

          <button
            onClick={() => setMobileSection((s) => (s === 'comparer' ? null : 'comparer'))}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--space-3) 0',
              width: '100%',
            }}
          >
            <span
              style={{
                fontSize: '26px',
                fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                fontWeight: isGroupActive(COMPARER) ? 700 : 500,
                color: isGroupActive(COMPARER) ? 'var(--accent-4)' : 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Comparer
            </span>
            <ChevronDown
              size={18}
              style={{
                color: 'var(--text-secondary)',
                transform: mobileSection === 'comparer' ? 'rotate(180deg)' : 'none',
                transition: 'transform 200ms ease',
              }}
              aria-hidden="true"
            />
          </button>
          {mobileSection === 'comparer' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-1)',
                paddingLeft: 'var(--space-4)',
                borderLeft: '2px solid var(--accent-4)',
                marginBottom: 'var(--space-2)',
              }}
            >
              {COMPARER.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontSize: '15px',
                    color: isActive(href) ? 'var(--accent-4)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    padding: 'var(--space-2) 0',
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}

          {FLAT_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: '26px',
                fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                fontWeight: isActive(href) ? 700 : 500,
                color: isActive(href) ? 'var(--accent-1)' : 'var(--text-primary)',
                textDecoration: 'none',
                padding: 'var(--space-3) 0',
                letterSpacing: '-0.02em',
              }}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/quiz"
            style={{
              marginTop: 'var(--space-6)',
              padding: 'var(--space-4) var(--space-6)',
              background: 'var(--accent-1)',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 700,
              borderRadius: 'var(--radius-full)',
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            Démarrer le quiz Apple →
          </Link>
        </div>
      )}
    </>
  )
}
