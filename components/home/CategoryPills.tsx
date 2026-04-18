/**
 * CategoryPills \u2014 scroll horizontal de pills cat\u00e9gorie.
 * Pill : dot couleur + label + compteur.
 * Server Component.
 */

import Link from 'next/link'
import { getCategories, CATEGORY_ACCENT, CATEGORY_LABELS } from '@/lib/blog'

const ORDER = ['iphone', 'mac', 'ipad', 'watch', 'accessoires', 'astuces']

export function CategoryPills() {
  const counts = getCategories().reduce<Record<string, number>>((acc, c) => {
    acc[c.slug] = c.count
    return acc
  }, {})

  const cats = ORDER.filter((slug) => counts[slug] !== undefined).map((slug) => ({
    slug,
    label: CATEGORY_LABELS[slug] ?? slug,
    count: counts[slug] ?? 0,
    color: CATEGORY_ACCENT[slug] ?? 'var(--text-secondary)',
  }))

  return (
    <nav
      aria-label="Cat\u00e9gories du blog"
      className="home-pills-scroll"
      style={{
        display: 'flex',
        gap: 8,
        padding: '6px 20px 18px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      {cats.map((c) => (
        <Link
          key={c.slug}
          href={`/blog/${c.slug}`}
          style={{
            flex: '0 0 auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 14px',
            borderRadius: 999,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            fontSize: 13,
            color: 'var(--text-primary)',
            fontWeight: 600,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: c.color,
              flexShrink: 0,
            }}
          />
          <span>{c.label}</span>
          <span
            style={{
              color: 'var(--text-muted)',
              fontSize: 11,
              fontFamily: 'var(--next-font-mono), monospace',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {c.count}
          </span>
        </Link>
      ))}
    </nav>
  )
}
