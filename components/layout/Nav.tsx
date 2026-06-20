'use client'

/**
 * Nav — navigation principale DA V2 (pages internes).
 * Aligne son identite sur le masthead de la home (HomeMastheadV2) :
 * logo "10'", wordmark minutes+apple (apple en bleu HOME_ACCENT), pastilles
 * RubricPills partagees, CTA "⚔ COMPARER", ThemeToggle. Hairline 1px (pas
 * d'aurora). Pas de dropdown : la taxonomie est portee par les rubriques.
 * Mobile : overlay avec les rubriques (pastille de couleur) puis les outils.
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { RubricPills } from '@/components/rubrique/RubricPills'
import { RUBRIQUE_LIST, type Rubrique } from '@/lib/rubriques'

// Memes valeurs que le masthead de la home (HomeMastheadV2).
const INK = 'oklch(0.18 0.012 270)'
const HOME_ACCENT = 'oklch(0.62 0.2 250)' // bleu (actu)

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

  // Homepage : le header est integre au hero (voir HomeMastheadV2).
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
          borderBottom: '1px solid var(--border)',
          transition: 'background-color 300ms ease, backdrop-filter 300ms ease, border-color 300ms ease',
        }}
      >
        <nav aria-label="Navigation principale" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-6)', minHeight: '60px', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>

          {/* Logo — aligne sur le masthead (apple en bleu HOME_ACCENT) */}
          <Link href="/" aria-label="10minutesapple — accueil" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '9px' }}>
            <span style={{ position: 'relative', width: '30px', height: '30px', borderRadius: '50%', background: `conic-gradient(${HOME_ACCENT} 0deg, ${HOME_ACCENT} 300deg, color-mix(in oklab, ${INK} 12%, transparent) 300deg)`, display: 'grid', placeItems: 'center' }} className="nav-logo-dot">
              <span style={{ position: 'absolute', inset: '3px', borderRadius: '50%', background: 'var(--bg-surface)' }} />
              <span style={{ position: 'relative', fontFamily: 'var(--next-font-mono), monospace', fontWeight: 700, fontSize: '11px', color: 'var(--text-primary)' }}>{"10'"}</span>
            </span>
            <span style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>minutes<span style={{ color: HOME_ACCENT }}>apple</span></span>
          </Link>

          {/* Desktop : pastilles rubriques partagees */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            <RubricPills size="sm" />
          </div>

          {/* Desktop : outils */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            {TOOLS.map(({ href, label }) => (
              <Link key={href} href={href} style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', textDecoration: 'none', color: isActive(href) ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{label}</Link>
            ))}
          </div>

          {/* Bouton thème */}
          <ThemeToggle />

          {/* Recherche — pill, masquee en mobile (nav-desktop) */}
          <form
            action="/blog"
            role="search"
            className="nav-desktop"
            style={{ display: 'flex', alignItems: 'center', gap: 7, width: 200, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 999, padding: '7px 13px' }}
          >
            <span aria-hidden="true" style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1 }}>{'⌕'}</span>
            <input
              name="q"
              type="search"
              aria-label="Rechercher"
              placeholder="Rechercher…"
              style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none', fontFamily: 'var(--next-font-mono), monospace', fontSize: '12px', color: 'var(--text-primary)' }}
            />
          </form>

          {/* CTA Comparer — aligne sur le masthead */}
          <Link href="/comparateur" className="nav-desktop" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: INK, color: '#fff', textDecoration: 'none', fontFamily: 'var(--next-font-mono), monospace', fontSize: '11.5px', fontWeight: 700, padding: '8px 13px', borderRadius: 8 }}>{'⚔ COMPARER'}</Link>

          {/* Hamburger */}
          <button aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} onClick={() => setOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: 'var(--space-2)', display: 'flex' }} className="nav-hamburger">
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </nav>
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

          <Link href="/comparateur" aria-current={isActive('/comparateur') ? 'page' : undefined} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, alignSelf: 'flex-start', background: INK, color: '#fff', textDecoration: 'none', fontFamily: 'var(--next-font-mono), monospace', fontSize: '14px', fontWeight: 700, padding: '10px 15px', borderRadius: 8, margin: 'var(--space-2) 0' }}>{'⚔ COMPARER'}</Link>

          {TOOLS.concat([{ href: '/blog', label: 'Blog' }]).map(({ href, label }) => (
            <Link key={href} href={href} style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', color: isActive(href) ? 'var(--text-primary)' : 'var(--text-secondary)', textDecoration: 'none', padding: 'var(--space-2) 0' }}>{label}</Link>
          ))}
        </div>
      )}
    </>
  )
}
