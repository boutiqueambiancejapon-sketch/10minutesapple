/**
 * AuthorTeaser V2 — section "qui écrit ce site".
 * Portrait + bio + CTA vers la page auteur.
 * Server Component.
 */

import Link from 'next/link'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { FadeIn } from '@/components/motion/FadeIn'

export function AuthorTeaser() {
  return (
    <section className="section-shell section-shell--bordered">
      <div className="section-inner">
        <span className="section-index" style={{ top: '-20px', right: '20px' }}>
          08
        </span>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-12)',
            alignItems: 'center',
          }}
          className="author-teaser-v2"
        >
          <FadeIn y={32}>
            <div
              style={{
                position: 'relative',
                maxWidth: '320px',
                margin: '0 auto',
              }}
            >
              <ImagePlaceholder slotId="author-mathias" ratio="1/1" />
              {/* Monogramme overlay */}
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '-16px',
                  right: '-16px',
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--accent-1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                  fontSize: '32px',
                  fontWeight: 800,
                  color: 'var(--accent-1)',
                  boxShadow: '0 0 30px rgba(255,61,87,0.4)',
                }}
              >
                M
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={120} y={24}>
            <div>
              <p className="section-eyebrow">Auteur · L&rsquo;équipe</p>
              <h2 className="section-title" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}>
                Un seul <em>journaliste</em>.
                <br />
                Zéro angle mort.
              </h2>
              <p
                style={{
                  fontSize: 'clamp(15px, 1.5vw, 17px)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  margin: 'var(--space-6) 0',
                  maxWidth: '58ch',
                  textWrap: 'pretty',
                }}
              >
                Mathias écrit 10minutesapple seul. Ancien journaliste tech, indépendant,
                sans partenariat rémunéré Apple. Tous les tests sont faits en conditions
                réelles — pas en salle de démo.
              </p>
              <Link href="/auteurs/mathias" className="cta-secondary">
                Voir la fiche auteur
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
