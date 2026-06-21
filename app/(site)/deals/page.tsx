import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTS, amazonUrl, amazonSearchUrl, type Product } from '@/lib/products'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Bons plans Apple',
  description:
    "Les meilleurs prix du moment sur l'iPhone, le Mac, l'iPad, l'Apple Watch et les AirPods. Sélection mise à jour en continu.",
  alternates: { canonical: 'https://10minutesapple.com/deals' },
}

const mono = 'var(--next-font-mono), monospace'
const display = 'var(--next-font-display), system-ui, sans-serif'
const ORANGE = 'oklch(0.82 0.16 66)'
const ORTX = 'oklch(0.22 0.06 55)'
const INK = 'oklch(0.18 0.012 270)'

// Ordre de regroupement + libelle de tag par famille de produit.
const FAMILIES: { key: string; label: string; match: (id: string) => boolean }[] = [
  { key: 'iphone', label: 'iPhone', match: (id) => id.startsWith('iphone') },
  { key: 'mac', label: 'Mac', match: (id) => id.startsWith('macbook') || id === 'imac' || id === 'mac-mini' },
  { key: 'ipad', label: 'iPad', match: (id) => id.startsWith('ipad') },
  { key: 'watch', label: 'Apple Watch', match: (id) => id.startsWith('watch') },
  { key: 'audio', label: 'Audio', match: (id) => id.startsWith('airpods') },
  { key: 'accessoires', label: 'Accessoires', match: () => true },
]

function familyLabel(id: string): string {
  return (FAMILIES.find((f) => f.match(id)) ?? FAMILIES[FAMILIES.length - 1]).label
}

function DealCard({ p }: { p: Product }) {
  const url = p.asin ? amazonUrl(p.asin) : amazonSearchUrl(p.name)
  return (
    <article
      style={{
        border: '1px solid color-mix(in oklab, var(--text-primary) 12%, transparent)',
        borderRadius: 14,
        overflow: 'hidden',
        background: 'var(--bg-surface)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '1 / 1', background: '#fff' }}>
        {p.image ? (
          <Image src={p.image} alt={p.name} fill sizes="(max-width: 600px) 50vw, 25vw" style={{ objectFit: 'contain', padding: 16 }} />
        ) : null}
        <span style={{ position: 'absolute', top: 10, right: 10, background: INK, color: '#fff', fontFamily: mono, fontSize: 9, fontWeight: 700, padding: '3px 7px', borderRadius: 5 }}>
          {familyLabel(p.id)}
        </span>
      </div>
      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: 16, lineHeight: 1.15, letterSpacing: '-0.01em', margin: 0, color: 'var(--text-primary)' }}>
          {p.name}
        </h3>
        {p.price ? (
          <div style={{ marginTop: 'auto' }}>
            <span style={{ fontFamily: display, fontWeight: 800, fontSize: 22, color: 'oklch(0.4 0.12 45)' }}>{p.price}</span>
            {p.listPrice ? (
              <span style={{ fontFamily: mono, fontSize: 11, color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: 7 }}>{p.listPrice}</span>
            ) : null}
          </div>
        ) : null}
        <Link
          href={url}
          target="_blank"
          rel="nofollow sponsored noopener"
          style={{ textAlign: 'center', background: ORANGE, color: ORTX, textDecoration: 'none', fontFamily: mono, fontWeight: 700, fontSize: 12, padding: 11, borderRadius: 9, marginTop: 4 }}
        >
          {'🛒 Voir sur Amazon'}
        </Link>
      </div>
    </article>
  )
}

export default function DealsPage() {
  const all = Object.values(PRODUCTS) as Product[]
  // Regroupe par famille, dans l'ordre FAMILIES.
  const groups = FAMILIES.map((f) => ({
    label: f.label,
    items: all.filter((p) => familyLabel(p.id) === f.label),
  })).filter((g) => g.items.length > 0)

  return (
    <main id="main-content">
      {/* Masthead */}
      <header style={{ background: `color-mix(in oklab, ${ORANGE} 16%, var(--bg-primary))`, borderBottom: `3px solid ${ORANGE}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '38px 24px 30px' }}>
          <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'oklch(0.5 0.15 55)' }}>
            {'⚡ Mis à jour en continu'}
          </span>
          <h1 style={{ fontFamily: display, fontWeight: 800, fontSize: 'clamp(34px, 4.6vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1, margin: '12px 0 10px', color: 'var(--text-primary)' }}>
            Les bons plans Apple
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--text-secondary)', margin: 0, maxWidth: 640 }}>
            Les meilleurs prix du moment, vérifiés par la rédaction. {all.length} produits suivis — chaque lien mène directement à l&#39;offre Amazon.
          </p>
        </div>
      </header>

      {/* Grilles par famille */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '12px 24px 24px' }}>
        {groups.map((g) => (
          <section key={g.label} style={{ marginTop: 28 }}>
            <h2 style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 14px' }}>
              {g.label}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 16 }}>
              {g.items.map((p) => (
                <DealCard key={p.id} p={p} />
              ))}
            </div>
          </section>
        ))}

        <p style={{ fontFamily: mono, fontSize: 10, color: 'var(--text-muted)', margin: '32px 0 0', textAlign: 'center', lineHeight: 1.6 }}>
          En tant que Partenaire Amazon, 10minutesApple perçoit une commission sur les achats éligibles. Cela ne change rien au prix que vous payez. Prix et images à titre indicatif, susceptibles de varier.
        </p>
      </div>
    </main>
  )
}
