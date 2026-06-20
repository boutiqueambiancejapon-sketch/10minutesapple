'use client'

/**
 * Nav — navigation principale DA V2.
 * Desktop : pastilles des 6 rubriques (couleur signature + etat actif) + outils.
 * Mobile : overlay avec les rubriques (pastille de couleur) puis les outils.
 * Pas de dropdown : la taxonomie est portee par les rubriques (hubs /[route]).
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { RUBRIQUE_LIST, type Rubrique } from '@/lib/rubriques'

const TOOLS = [
  { href: '/deals', label: 'Deals' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/simulateur', label: 'Simulateur' },
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

  useEffect(() => {
    const id = setTimeout(() => setOpen(false))
    return () => clearTimeout(id)
  }, [pathname])

  // Homepage : le header est integre au hero (voir HomeHeader).
  if (pathname === '/') return null

  const isRubriqueActive = (r: Rubrique) =>
    pathname === `/${r.route}` || pathname.startsWith(`/${r.route}/`)
  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <>
      <header
        className={scrolled || open ? 'nav-glass-active' : ''}
        style={{
          position: 'sticky', top: 0, zIndex: 40,
          backgroundColor: (scrolled || open) ? 'var(--sticky-cta-glass)' : 'transparent',
          backdropFilter: (scrolled || open) ? 'blur(40px) saturate(1.8)' : 'none',
          WebkitBackdropFilter: (scrolled || open) ? 'blur(40px) saturate(1.8)' : 'none',
          borderBottom: (scrolled || open) ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'background-color 300ms ease, backdrop-filter 300ms ease, border-color 300ms ease',
        }}
      >
        <nav aria-label="Navigation principale" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-6)', minHeight: '60px', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>

          {/* Logo */}
          <Link href="/" aria-label="10minutesapple — accueil" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '9px' }}>
            <span style={{ position: 'relative', width: '30px', height: '30px', borderRadius: '50%', background: 'conic-gradient(var(--accent-1) 0deg, var(--accent-1) 300deg, color-mix(in oklab, var(--text-primary) 12%, transparent) 300deg)', display: 'grid', placeItems: 'center' }} className="nav-logo-dot">
              <span style={{ position: 'absolute', inset: '3px', borderRadius: '50%', background: 'var(--bg-primary)' }} />
              <span style={{ position: 'relative', fontFamily: 'var(--next-font-mono), monospace', fontWeight: 700, fontSize: '11px', color: 'var(--text-primary)' }}>{"10'"}</span>
            </span>
            <span style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>minutes<span style={{ color: 'var(--accent-1)' }}>apple</span></span>
          </Link>

          {/* Desktop : pastilles rubriques */}
          <ul role="list" className="nav-desktop" style={{ display: 'flex', gap: '4px', listStyle: 'none', margin: 0, padding: 0, marginLeft: 'auto', alignItems: 'center', flexWrap: 'wrap' }}>
            {RUBRIQUE_LIST.map((r) => {
              const active = isRubriqueActive(r)
              return (
                <li key={r.key}>
                  <Link
                    href={`/${r.route}`}
                    aria-current={active ? 'page' : undefined}
                    style={{
                      fontFamily: 'var(--next-font-mono), monospace',
                      fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.02em',
                      textTransform: 'uppercase', textDecoration: 'none',
                      padding: '7px 11px', borderRadius: '7px',
                      color: active ? '#fff' : 'var(--text-primary)',
                      background: active ? r.colorVar : `color-mix(in oklab, ${r.colorVar} 12%, transparent)`,
                      transition: 'background 200ms ease, color 200ms ease',
                    }}
                  >
                    {r.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Desktop : outils */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            {TOOLS.map(({ href, label }) => (
              <Link key={href} href={href} style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', textDecoration: 'none', color: isActive(href) ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{label}</Link>
            ))}
          </div>

          {/* Bouton thème */}
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
        <div style={{ position: 'fixed', inset: '60px 0 0 0', backgroundColor: 'var(--nav-mobile-bg)', borderTop: '1px solid var(--border)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', zIndex: 39, overflowY: 'auto' }} aria-label="Menu mobile" role="dialog">

          {RUBRIQUE_LIST.map((r) => {
            const active = isRubriqueActive(r)
            return (
              <Link key={r.key} href={`/${r.route}`} aria-current={active ? 'page' : undefined} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: 'var(--space-3) 0', textDecoration: 'none' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: r.colorVar, flexShrink: 0 }} aria-hidden="true" />
                <span style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: '22px', fontWeight: active ? 800 : 600, color: active ? r.colorVar : 'var(--text-primary)' }}>{r.label}</span>
              </Link>
            )
          })}

          <div style={{ height: '1px', background: 'var(--border)', margin: 'var(--space-3) 0' }} aria-hidden="true" />

          {TOOLS.concat([{ href: '/blog', label: 'Blog' }]).map(({ href, label }) => (
            <Link key={href} href={href} style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', color: isActive(href) ? 'var(--text-primary)' : 'var(--text-secondary)', textDecoration: 'none', padding: 'var(--space-2) 0' }}>{label}</Link>
          ))}
        </div>
      )}
    </>
  )
}
