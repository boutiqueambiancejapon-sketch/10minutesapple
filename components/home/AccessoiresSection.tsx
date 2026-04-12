import { CategoryShowcase } from './CategoryShowcase'

export function AccessoiresSection() {
  return (
    <CategoryShowcase
      slug="accessoires"
      index="06"
      eyebrow="Accessoires · L’écosystème"
      title={
        <>
          Les accessoires qui{' '}
          <span className="cat-italic">valent le coût</span>.
        </>
      }
      lead="AirPods Pro 3, AirTag 2, MagSafe, coques, chargeurs, protections — on trie le must-have, le sympa et le gadget inutile. Tests et alternatives tierces."
      accent="var(--accent-4)"
      slotId="accessoires-section"
      ctaCompare="/comparer/airpods"
      ctaChoisir="/choisir/airpods"
    />
  )
}
