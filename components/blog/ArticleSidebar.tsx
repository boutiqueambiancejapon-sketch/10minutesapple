/**
 * ArticleSidebar V2 — colonne sticky : Resumer avec l'IA + Au sommaire + Le produit.
 * Le produit : image (Fnac) + lien Amazon affilie (ASIN ou recherche du nom).
 * Server Component (TableOfContents est un client component, rendu ici).
 */

import Image from 'next/image'
import Link from 'next/link'
import { TableOfContents } from './TableOfContents'
import { getProduct, amazonUrl, amazonSearchUrl } from '@/lib/products'

const mono = 'var(--next-font-mono), monospace'
const display = 'var(--next-font-display), system-ui, sans-serif'
const ORANGE = 'oklch(0.82 0.16 66)'
const ORTX = 'oklch(0.22 0.06 55)'

const AI_LINKS = [
  { name: 'ChatGPT', href: 'https://chatgpt.com' },
  { name: 'Claude', href: 'https://claude.ai' },
  { name: 'Perplexity', href: 'https://www.perplexity.ai' },
  { name: 'Le Chat', href: 'https://chat.mistral.ai' },
]

interface ArticleSidebarProps {
  produit?: string
  asin?: string
  prix?: string
  prixBarre?: string
  productName?: string
}

export function ArticleSidebar({ produit, asin, prix, prixBarre, productName }: ArticleSidebarProps) {
  const p = produit ? getProduct(produit) : undefined
  const image = p?.image
  const price = prix ?? p?.price
  const name = p?.name ?? productName ?? 'Le produit'
  const buyAsin = asin ?? p?.asin
  const hasProduct = Boolean(price || buyAsin || image)
  const url = buyAsin ? amazonUrl(buyAsin) : amazonSearchUrl(name)

  return (
    <aside className="article-sidebar" aria-label="Resume, sommaire et achat">
      <div className="article-sidebar-inner" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* Resumer avec l'IA */}
        <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>{'⚡ Résumer avec l’IA'}</div>
          <p style={{ fontSize: 12.5, color: 'var(--text-muted)', margin: '0 0 12px', lineHeight: 1.45 }}>Pas le temps de tout lire ? Ouvrez un résumé chez votre assistant.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {AI_LINKS.map((ai) => (
              <a key={ai.name} href={ai.href} target="_blank" rel="noopener noreferrer" style={{ flex: '1 1 calc(50% - 4px)', textAlign: 'center', background: 'var(--bg-surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)', textDecoration: 'none', fontFamily: mono, fontWeight: 700, fontSize: 11, padding: '9px 6px', borderRadius: 8 }}>{ai.name} ↗</a>
            ))}
          </div>
        </div>

        {/* Au sommaire */}
        <div style={{ border: '2px solid var(--route-color)', borderRadius: 14, padding: '14px 16px' }}>
          <TableOfContents />
        </div>

        {/* Le produit de l'article */}
        {hasProduct ? (
          <div style={{ border: `2px solid ${ORANGE}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ background: ORANGE, padding: '8px 14px', fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: ORTX }}>{'🛒 Le produit de l’article'}</div>
            <div style={{ padding: 16 }}>
              {image ? (
                <div style={{ position: 'relative', aspectRatio: '1 / 1', borderRadius: 11, marginBottom: 12, overflow: 'hidden', background: '#fff' }}>
                  <Image src={image} alt={name} fill sizes="280px" style={{ objectFit: 'contain' }} />
                </div>
              ) : null}
              <h4 style={{ fontFamily: display, fontWeight: 800, fontSize: 17, margin: 0, color: 'var(--text-primary)' }}>{name}</h4>
              {price ? (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, margin: '8px 0 0' }}>
                  <span style={{ fontFamily: display, fontWeight: 800, fontSize: 22, color: 'oklch(0.45 0.13 45)' }}>{price}</span>
                  {prixBarre ? <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--text-muted)', textDecoration: 'line-through' }}>{prixBarre}</span> : null}
                </div>
              ) : null}
              <Link href={url} target="_blank" rel="nofollow sponsored noopener" style={{ display: 'block', textAlign: 'center', marginTop: 12, background: ORANGE, color: ORTX, textDecoration: 'none', fontFamily: mono, fontWeight: 700, fontSize: 13, padding: 12, borderRadius: 10 }}>{'Voir sur Amazon →'}</Link>
            </div>
          </div>
        ) : null}
      </div>
    </aside>
  )
}
