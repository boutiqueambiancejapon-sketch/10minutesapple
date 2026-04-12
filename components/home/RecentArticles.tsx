/**
 * RecentArticles — section éditoriale : featured post + grille récents.
 * Layout magazine avec image featured + 3 cards image.
 * Server Component.
 */
import Link from 'next/link'
import { getAllArticles } from '@/lib/blog'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { FadeIn } from '@/components/motion/FadeIn'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'

export function RecentArticles() {
  const articles = getAllArticles().slice(0, 7)
  if (articles.length === 0) return null

  const [featured, ...rest] = articles

  return (
    <section className="section-shell section-shell--bordered">
      <div className="section-inner">
        <span className="section-index" style={{ top: '-20px', right: '-20px' }}>
          01
        </span>

        <FadeIn>
          <div className="section-label-row">
            <div>
              <span className="section-eyebrow">Éditorial · Derniers articles</span>
              <h2 className="section-title">
                Tests, guides, <em>décryptages</em>.
              </h2>
              <p className="section-lead">
                On teste, on compare, on tranche. Pas de copier-coller de communiqué
                presse — du terrain, du détail, et des recommandations claires.
              </p>
            </div>
            <Link href="/blog" className="cta-secondary" style={{ whiteSpace: 'nowrap' }}>
              Tout le blog <span aria-hidden="true">→</span>
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <ArticleCard article={featured} featured />
        </FadeIn>

        {rest.length > 0 && (
          <Stagger delay={200} staggerDelay={90}>
            <ul
              role="list"
              className="article-grid-recent"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(var(--space-8), 3vw, var(--space-12))',
                listStyle: 'none',
                margin: 'clamp(var(--space-10), 5vw, var(--space-16)) 0 0',
                padding: 0,
              }}
            >
              {rest.slice(0, 6).map((article) => (
                <StaggerItem key={`${article.categorie}/${article.slug}`}>
                  <li>
                    <ArticleCard article={article} />
                  </li>
                </StaggerItem>
              ))}
            </ul>
          </Stagger>
        )}
      </div>
    </section>
  )
}
