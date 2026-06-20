import Image from 'next/image'
import Link from 'next/link'
import { RUBRIQUES, type RubriqueKey } from '@/lib/rubriques'

export type AuthorSlug = 'camille-roux' | 'thomas-lefevre' | 'lea-berthier'

interface Author {
  name: string
  role: string
  hue: number
  initials: string
  img: string
  bio: string
  rubriques: RubriqueKey[]
}

export const AUTHORS: Record<AuthorSlug, Author> = {
  'camille-roux': {
    name: 'Camille Roux',
    role: 'Redactrice en chef',
    hue: 25,
    initials: 'CR',
    img: '/images/da-v2/portraits/portrait-camille-roux.jpeg',
    bio: "Journaliste tech depuis douze ans, Camille a couvert tous les lancements Apple depuis l'iPhone 4. Elle pilote la redaction de 10minutesApple et signe les grands dossiers d'enquete.",
    rubriques: ['dossier', 'test'],
  },
  'thomas-lefevre': {
    name: 'Thomas Lefevre',
    role: 'Journaliste actualite',
    hue: 250,
    initials: 'TL',
    img: '/images/da-v2/portraits/portrait-thomas-lefevre.jpeg',
    bio: "Specialiste des systemes d'exploitation et des betas, Thomas decortique chaque mise a jour d'iOS au fil de l'eau. Il anime le direct de la redaction.",
    rubriques: ['actu', 'tuto'],
  },
  'lea-berthier': {
    name: 'Lea Berthier',
    role: 'Chroniqueuse & essais',
    hue: 300,
    initials: 'LB',
    img: '/images/da-v2/portraits/portrait-lea-berthier.jpeg',
    bio: 'Plume affutee et regard critique, Lea teste les produits sur le long cours et signe nos comparatifs les plus pointus.',
    rubriques: ['test', 'guide'],
  },
}

const mono = 'var(--next-font-mono), monospace'
const display = 'var(--next-font-display), system-ui, sans-serif'

export function AuthorPageV2({ slug }: { slug: AuthorSlug }) {
  const a = AUTHORS[slug]
  const accent = `oklch(0.62 0.2 ${a.hue})`
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: `color-mix(in oklab, ${accent} 12%, var(--bg-primary))`, borderBottom: `3px solid ${accent}` }}>
      <span aria-hidden="true" style={{ position: 'absolute', top: -20, right: 8, fontFamily: display, fontWeight: 800, fontSize: 'clamp(140px, 22vw, 260px)', lineHeight: 1, color: accent, opacity: 0.08, pointerEvents: 'none', userSelect: 'none' }}>{a.initials}</span>
      <div style={{ position: 'relative', maxWidth: 1000, margin: '0 auto', padding: '48px 24px', display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ position: 'relative', width: 160, height: 160, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: `3px solid ${accent}` }}>
          <Image src={a.img} alt={a.name} fill sizes="160px" style={{ objectFit: 'cover' }} priority />
        </span>
        <div style={{ flex: '1 1 320px' }}>
          <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: accent }}>{a.role}</div>
          <h1 style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(34px, 5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1, margin: '8px 0 14px', color: 'var(--text-primary)' }}>{a.name}</h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '60ch', margin: '0 0 18px' }}>{a.bio}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {a.rubriques.map((k) => {
              const r = RUBRIQUES[k]
              return (
                <Link key={k} href={`/${r.route}`} style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', textDecoration: 'none', padding: '7px 12px', borderRadius: 8, color: '#fff', background: r.colorVar }}>{r.label}</Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthorPageV2
