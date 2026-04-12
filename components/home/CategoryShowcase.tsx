/**
 * CategoryShowcase — section home réutilisable pour chaque catégorie.
 * Layout : visuel product sticky + liste d'articles + CTAs.
 * Props : slug + metadata → récupère les articles depuis lib/blog.
 * Server Component.
 */
import Link from 'next/link'
import { getAllArticles } from '@/lib/blog'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import type { SlotId } from '@/lib/image-slots'
import { FadeIn } from '@/components/motion/FadeIn'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'

type Props = {
  slug: 'iphone' | 'mac' | 'ipad' | 'watch' | 'accessoires'
  index: string
  eyebrow: string
  title: React.ReactNode
  lead: string
  accent: string
  slotId: SlotId
  reverse?: boolean
  ctaCompare?: string
  ctaChoisir?: string
}

export function CategoryShowcase({
  slug,
  index,
  eyebrow,
  title,
  lead,
  accent,
  slotId,
  reverse = false,
  ctaCompare,
  ctaChoisir,
}: Props) {
  const articles = getAllArticles().filter((a) => a.categorie === slug).slice(0, 4)

  return (
    <section className="category-section" style={{ '--cat-accent': accent } as React.CSSProperties}>
      <span
        aria-hidden="true"
        className="big-display-number"
        style={{
          left: reverse ? '-30px' : 'auto',
          right: reverse ? 'auto' : '-30px',
        }}
      >
        {index}
      </span>

      <div className={`category-section-grid${reverse ? ' reverse' : ''}`}>
        {/* Visuel */}
        <FadeIn y={40}>
          <div className="category-hero-visual">
            <ImagePlaceholder slotId={slotId} ratio="4/5" />
            {/* Badge accent */}
            <span
              style={{
                position: 'absolute',
                top: 'var(--space-4)',
                left: 'var(--space-4)',
                padding: '6px 14px',
                background: 'rgba(10,10,15,0.7)',
                backdropFilter: 'blur(14px)',
                border: `1px solid ${accent}`,
                color: accent,
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                borderRadius: 'var(--radius-full)',
                zIndex: 2,
              }}
            >
              Section {index}
            </span>
          </div>
        </FadeIn>

        {/* Contenu */}
        <div style={{ position: 'relative' }}>
          <FadeIn delay={100}>
            <p
              className="section-eyebrow"
              style={{ color: accent }}
            >
              <span style={{ background: accent, display: 'inline-block', width: 24, height: 1 }} />
              {eyebrow}
            </p>
          </FadeIn>

          <FadeIn delay={180} y={28}>
            <h2 className="category-heading">{title}</h2>
          </FadeIn>

          <FadeIn delay={260}>
            <p className="category-lead">{lead}</p>
          </FadeIn>

          <FadeIn delay={340}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                margin: 'var(--space-8) 0 var(--space-10)',
              }}
            >
              {ctaCompare && (
                <Link
                  href={ctaCompare}
                  className="cta-primary"
                  style={{
                    background: accent,
                    boxShadow: `0 12px 40px ${accent}50, 0 0 0 1px rgba(255,255,255,0.08) inset`,
                  }}
                >
                  Comparer
                  <span className="cta-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              )}
              {ctaChoisir && (
                <Link href={ctaChoisir} className="cta-secondary">
                  Lequel choisir ?
                </Link>
              )}
            </div>
          </FadeIn>

          {/* Liste d'articles */}
          {articles.length > 0 && (
            <Stagger staggerDelay={80}>
              <ul
                role="list"
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  borderTop: '1px solid var(--border)',
                }}
              >
                {articles.map((article, i) => (
                  <StaggerItem key={`${article.categorie}/${article.slug}`}>
                    <li>
                      <Link
                        href={`/blog/${article.categorie}/${article.slug}`}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '48px 1fr auto',
                          gap: 'var(--space-5)',
                          alignItems: 'center',
                          padding: 'var(--space-5) 0',
                          borderBottom: '1px solid var(--border)',
                          textDecoration: 'none',
                          color: 'inherit',
                          transition: 'padding-left 220ms var(--ease-out)',
                        }}
                        className="category-article-link"
                      >
                        <span
                          style={{
                            fontFamily: 'var(--next-font-mono), monospace',
                            fontSize: '11px',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.08em',
                          }}
                        >
                          /{String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                            fontSize: 'clamp(16px, 1.6vw, 20px)',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            lineHeight: 1.25,
                            letterSpacing: '-0.01em',
                            textWrap: 'balance',
                            transition: 'color 200ms ease',
                          }}
                          className="category-article-title"
                        >
                          {article.title}
                        </span>
                        <span
                          aria-hidden="true"
                          style={{
                            fontSize: '14px',
                            color: accent,
                            opacity: 0,
                            transform: 'translateX(-8px)',
                            transition: 'opacity 200ms ease, transform 200ms ease',
                          }}
                          className="category-article-arrow"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  </StaggerItem>
                ))}
              </ul>
            </Stagger>
          )}
        </div>
      </div>
    </section>
  )
}
