import { CategoryShowcase } from './CategoryShowcase'

export function MacSection() {
  return (
    <CategoryShowcase
      slug="mac"
      index="03"
      eyebrow="Mac · Apple Silicon"
      title={
        <>
          Le Mac qui{' '}
          <span className="cat-italic">ne trahit pas</span>
          <br />
          votre budget.
        </>
      }
      lead="MacBook Air M5, Pro M5, Mac mini, Studio — on a mesuré les perfs réelles sur export vidéo, compilation Xcode et gaming. Zéro marketing, des chiffres."
      accent="var(--accent-4)"
      slotId="mac-section"
      reverse
      ctaCompare="/comparer/mac"
      ctaChoisir="/choisir/mac"
    />
  )
}
