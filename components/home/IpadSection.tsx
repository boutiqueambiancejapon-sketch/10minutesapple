import { CategoryShowcase } from './CategoryShowcase'

export function IpadSection() {
  return (
    <CategoryShowcase
      slug="ipad"
      index="04"
      eyebrow="iPad · Créatif & léger"
      title={
        <>
          L&rsquo;iPad qui{' '}
          <span className="cat-italic">sert vraiment</span>,
          <br />
          pas celui qui dort.
        </>
      }
      lead="Pour dessiner, pour étudier, pour remplacer le laptop ? On a rangé chaque iPad selon son vrai usage — et son vrai rapport qualité-prix."
      accent="var(--accent-3)"
      slotId="ipad-section"
      ctaCompare="/comparer/ipad"
      ctaChoisir="/choisir/ipad"
    />
  )
}
