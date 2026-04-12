/**
 * MarqueeBanner — bandeau défilant typographique XXL.
 * Alterne gros mots pleins + mots en contour.
 * Signature éditoriale entre sections.
 * Server Component (animation CSS pure).
 */

type Props = {
  words?: string[]
}

const DEFAULT_WORDS = [
  'iPhone',
  'Mac',
  'iPad',
  'Watch',
  'AirPods',
  'Vision',
  'HomePod',
  'AirTag',
]

export function MarqueeBanner({ words = DEFAULT_WORDS }: Props) {
  // Dupliquer pour rendu infinite
  const track = [...words, ...words]

  return (
    <section
      className="marquee-banner"
      aria-label="Univers Apple"
      style={{ position: 'relative' }}
    >
      <div className="marquee-banner-track" style={{ marginBlock: 0 }}>
        {track.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={`marquee-word ${i % 2 === 1 ? 'outline' : ''}`}
          >
            {word}
            <span className="dot" aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  )
}
