'use client'

/**
 * Nav — navigation principale.
 * Desktop : liens directs + dropdowns CSS (hover/focus-within).
 * Mobile : overlay avec sections expandables.
 * Pas d'event handler inline — CSS :hover + :focus-within pour les dropdowns.
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const CHOISIR = [
  { href: '/choisir/iphone',  label: 'Quel iPhone choisir ?' },
  { href: '/choisir/mac',     label: 'Quel Mac choisir ?' },
  { href: '/choisir/ipad',    label: 'Quel iPad choisir ?' },
  { href: '/choisir/watch',   label: 'Quelle Apple Watch choisir ?' },
  { href: '/choisir/airpods', label: 'Quels AirPods choisir ?' },
]

const COMPARER = [
  { href: '/comparer/iphone',  label: 'iPhone' },
  { href: '/comparer/mac',     label: 'Mac' },
  { href: '/comparer/ipad',    label: 'iPad' },
  { href: '/comparer/watch',   label: 'Apple Watch' },
  { href: '/comparer/airpods', label: 'AirPods' },
]

const FLAT_LINKS = [
  { href: '/blog',        label: 'Blog' },
  { href: '/deals',       label: 'Deals' },
  { href: '/simulateur',  label: 'Simulateur' },
]

const navLinkBase = {
  fontSize: '14px',
  textDecoration: 'none',
  paddingBottom: '2px',
  transition: 'color 200ms ease, border-color 200ms ease',
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
} as const

const navLinkStyle = (active: boolean) => ({
  ...navLinkBase,
  fontWeight: active ? 600 : 400,
  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
  borderBottom: active ? '2px solid var(--accent-1)' : '2px solid transparent',
})

const navBtnStyle = (active: boolean) => ({
  ...navLinkStyle(active),
  background: 'none',
  border: 'none',
  borderBottom: active ? '2px solid var(--accent-1)' : '2px solid transparent',
  cursor: 'pointer',
})

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const id = setTimeout(() => { setOpen(false); setMobileSection(null) })
    return () => clearTimeout(id)
  }, [pathname])

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))

  const isGroupActive = (items: { href: string }[]) =>
    items.some(({ href }) => isActive(href))

  return (
    <>
      <header
        className={scrolled || open ? 'nav-glass-active' : ''}
        style={{
          position: 'sticky', top: 0, zIndex: 40,
          backgroundColor: (scrolled || open) ? 'var(--sticky-cta-glass)' : 'transparent',
          backdropFilter: (scrolled || open) ? 'blur(40px) saturate(1.8)' : 'none',
          WebkitBackdropFilter: (scrolled || open) ? 'blur(40px) saturate(1.8)' : 'none',
          borderBottom: (scrolled || open) ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          transition: 'background-color 300ms ease, backdrop-filter 300ms ease, border-color 300ms ease',
        }}
      >
        <nav aria-label="Navigation principale" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-6)', height: '60px', display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>

          {/* Logo */}
          <Link href="/" aria-label="10minutesapple — accueil" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'baseline', gap: '2px' }}>
            <span style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontWeight: 800, fontSize: '16px', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>10min</span>
            <span style={{ color: 'var(--accent-1)', fontWeight: 800, fontSize: '18px', lineHeight: 1 }} className="nav-logo-dot">·</span>
            <span style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontWeight: 400, fontSize: '16px', color: 'var(--text-secondary)' }}>Apple</span>
          </Link>

          {/* Desktop */}
          <ul role="list" style={{ display: 'flex', gap: 'var(--space-5)', listStyle: 'none', margin: 0, padding: 0, marginLeft: 'auto', alignItems: 'center' }} className="nav-desktop">

            {/* Choisir — dropdown */}
            <li className="dropdown-trigger">
              <button style={navBtnStyle(isGroupActive(CHOISIR))} aria-haspopup="true">
                Choisir <ChevronDown size={12} aria-hidden="true" />
              </button>
              <div className="dropdown-panel" role="menu">
                {CHOISIR.map(({ href, label }) => (
                  <Link key={href} href={href} role="menuitem" className={`dropdown-item${isActive(href) ? ' dropdown-item-active' : ''}`}>{label}</Link>
                ))}
              </div>
            </li>

            {/* Comparer — dropdown */}
            <li className="dropdown-trigger">
              <Link href="/comparer" style={navLinkStyle(isActive('/comparer'))} aria-haspopup="true">
                Comparer <ChevronDown size={12} aria-hidden="true" />
              </Link>
              <div className="dropdown-panel" role="menu">
                {COMPARER.map(({ href, label }) => (
                  <Link key={href} href={href} role="menuitem" className={`dropdown-item${isActive(href) ? ' dropdown-item-active' : ''}`}>{label}</Link>
                ))}
              </div>
            </li>

            {/* Liens plats */}
            {FLAT_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} style={navLinkStyle(isActive(href))}>{label}</Link>
              </li>
            ))}
          </ul>

          {/* Bouton thème — desktop et mobile */}
          <ThemeToggle />

          {/* Hamburger */}
          <button aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} onClick={() => setOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: 'var(--space-2)', display: 'flex' }} className="nav-hamburger">
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </nav>

        {/* Ligne gradient aurora — signature DA */}
        <div
          aria-hidden="true"
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, var(--aurora-1), var(--aurora-2), var(--aurora-3), var(--aurora-1))',
            backgroundSize: '200% 100%',
            animation: 'nav-gradient-shift 8s linear infinite',
            opacity: scrolled || open ? 0.8 : 0.3,
            transition: 'opacity 300ms ease',
          }}
        />
      </header>

      {/* Mobile overlay */}
      {open && (
        <div style={{ position: 'fixed', inset: '60px 0 0 0', backgroundColor: 'var(--nav-mobile-bg)', borderTop: '1px solid var(--border)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', zIndex: 39, overflowY: 'auto' }} aria-label="Menu mobile" role="dialog">

          {/* Section Choisir */}
          <button onClick={() => setMobileSection(s => s === 'choisir' ? null : 'choisir')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) 0', width: '100%' }}>
            <span style={{ fontSize: '22px', fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontWeight: isGroupActive(CHOISIR) ? 700 : 400, color: isGroupActive(CHOISIR) ? 'var(--accent-1)' : 'var(--text-primary)' }}>Choisir</span>
            <ChevronDown size={18} style={{ color: 'var(--text-secondary)', transform: mobileSection === 'choisir' ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease' }} aria-hidden="true" />
          </button>
          {mobileSection === 'choisir' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', paddingLeft: 'var(--space-4)', borderLeft: '2px solid var(--accent-1)', marginBottom: 'var(--space-2)' }}>
              {CHOISIR.map(({ href, label }) => (
                <Link key={href} href={href} style={{ fontSize: '16px', color: isActive(href) ? 'var(--accent-1)' : 'var(--text-secondary)', textDecoration: 'none', padding: 'var(--space-2) 0' }}>{label}</Link>
              ))}
            </div>
          )}

          {/* Section Comparer */}
          <button onClick={() => setMobileSection(s => s === 'comparer' ? null : 'comparer')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) 0', width: '100%' }}>
            <span style={{ fontSize: '22px', fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontWeight: isGroupActive(COMPARER) ? 700 : 400, color: isGroupActive(COMPARER) ? 'var(--accent-1)' : 'var(--text-primary)' }}>Comparer</span>
            <ChevronDown size={18} style={{ color: 'var(--text-secondary)', transform: mobileSection === 'comparer' ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease' }} aria-hidden="true" />
          </button>
          {mobileSection === 'comparer' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', paddingLeft: 'var(--space-4)', borderLeft: '2px solid var(--accent-4)', marginBottom: 'var(--space-2)' }}>
              {COMPARER.map(({ href, label }) => (
                <Link key={href} href={href} style={{ fontSize: '16px', color: isActive(href) ? 'var(--accent-4)' : 'var(--text-secondary)', textDecoration: 'none', padding: 'var(--space-2) 0' }}>{label}</Link>
              ))}
            </div>
          )}

          {/* Liens plats */}
          {FLAT_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} style={{ fontSize: '22px', fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontWeight: isActive(href) ? 700 : 400, color: isActive(href) ? 'var(--accent-1)' : 'var(--text-primary)', textDecoration: 'none', padding: 'var(--space-3) 0' }}>{label}</Link>
          ))}
        </div>
      )}
    </>
  )
}
