/**
 * ChoisirEditorial — Server Component
 * Renders editorial content (TL;DR, sections, FAQ, author) for /choisir/[produit].
 */

import Link from 'next/link'
import { AuthorByline } from '@/components/ui/AuthorByline'
import { AuthorCard } from '@/components/ui/AuthorCard'
import type { ChoisirProductContent } from '@/lib/choisir-content'

type Props = {
  content: ChoisirProductContent
  publishedAt: string
}

const sectionStyle: React.CSSProperties = {
  marginBottom: 'var(--space-10)',
}

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--next-font-display), system-ui, sans-serif',
  fontSize: 'clamp(20px, 3vw, 28px)',
  fontWeight: 800,
  color: 'var(--text-primary)',
  lineHeight: 1.2,
  marginBottom: 'var(--space-4)',
  textWrap: 'balance',
}

const pStyle: React.CSSProperties = {
  fontSize: 'clamp(15px, 1.8vw, 17px)',
  color: 'var(--text-secondary)',
  lineHeight: 1.7,
  marginBottom: 'var(--space-4)',
}

export function ChoisirEditorial({ content, publishedAt }: Props) {
  return (
    <article
      style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: 'var(--space-8) var(--space-6) var(--space-4)',
      }}
    >
      {/* Byline */}
      <AuthorByline
        authorSlug="mathias"
        publishedAt={publishedAt}
        readingTimeMin={5}
      />

      {/* TL;DR */}
      <div
        style={{
          borderLeft: '3px solid var(--accent-4)',
          background: 'var(--surface-2)',
          borderRadius: '0 var(--radius-md) var(--radius-md) 0',
          padding: 'var(--space-5) var(--space-6)',
          marginTop: 'var(--space-6)',
          marginBottom: 'var(--space-10)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.08em',
            color: 'var(--accent-4)',
            display: 'block',
            marginBottom: 'var(--space-3)',
          }}
        >
          En bref
        </span>
        <ul style={{ margin: 0, paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {content.tldr.map((item, i) => (
            <li key={i} style={{ ...pStyle, marginBottom: 0 }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Sections */}
      {content.sections.map((section) => (
        <section key={section.id} id={section.id} style={sectionStyle}>
          <h2 style={h2Style}>{section.title}</h2>
          <p style={pStyle}>{section.intro}</p>

          {section.table && (
            <div style={{ overflowX: 'auto', marginBottom: 'var(--space-4)' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                }}
              >
                <thead>
                  <tr>
                    {section.table.headers.map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: 'left',
                          padding: 'var(--space-3) var(--space-4)',
                          borderBottom: '2px solid var(--glass-border)',
                          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          fontSize: '13px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          style={{
                            padding: 'var(--space-3) var(--space-4)',
                            borderBottom: '1px solid var(--glass-border)',
                            fontFamily: ci === 2 ? 'var(--next-font-mono), monospace' : undefined,
                            whiteSpace: ci <= 2 ? 'nowrap' : undefined,
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {section.paragraphs?.map((p, i) => (
            <p key={i} style={pStyle}>{p}</p>
          ))}

          {section.tip && (
            <div
              style={{
                borderLeft: '3px solid var(--accent-3)',
                background: 'var(--surface-2)',
                borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                padding: 'var(--space-4) var(--space-5)',
                marginBottom: 'var(--space-4)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.08em',
                  color: 'var(--accent-3)',
                }}
              >
                Tip
              </span>
              <p style={{ ...pStyle, marginBottom: 0, marginTop: 'var(--space-2)' }}>
                {section.tip}
              </p>
            </div>
          )}

          {section.internalLink && (
            <Link
              href={section.internalLink.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--accent-1)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,61,87,0.35)',
                paddingBottom: '2px',
              }}
            >
              {section.internalLink.text} →
            </Link>
          )}
        </section>
      ))}

      {/* FAQ */}
      <ChoisirFAQ faq={content.faq} />

      {/* Author */}
      <div style={{ marginTop: 'var(--space-10)' }}>
        <AuthorCard
          authorSlug="mathias"
          bio="Fan Apple depuis le 3G. Testeur du quotidien, jailbreakeur de la première heure. Pas d'affiliation constructeur — juste l'honnêteté."
          variant="inline"
        />
      </div>
    </article>
  )
}

// ---------------------------------------------------------------------------
// FAQ sub-component + JSON-LD
// ---------------------------------------------------------------------------
function ChoisirFAQ({ faq }: { faq: Props['content']['faq'] }) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <section id="faq" style={sectionStyle}>
      <h2 style={h2Style}>Questions fréquentes</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {faq.map((item, i) => (
          <div
            key={i}
            style={{
              borderLeft: '3px solid var(--accent-4)',
              padding: 'var(--space-4) var(--space-5)',
              background: 'var(--surface-2)',
              borderRadius: '0 var(--radius-md) var(--radius-md) 0',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                fontSize: 'clamp(15px, 2vw, 17px)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-2)',
                lineHeight: 1.3,
              }}
            >
              {item.q}
            </h3>
            <p style={{ ...pStyle, marginBottom: 0 }}>{item.a}</p>
          </div>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  )
}
