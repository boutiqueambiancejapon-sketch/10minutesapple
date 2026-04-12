import { CategoryShowcase } from './CategoryShowcase'

export function IphoneSection() {
  return (
    <CategoryShowcase
      slug="iphone"
      index="02"
      eyebrow="iPhone · 2026"
      title={
        <>
          Le <span className="cat-italic">modèle</span>
          <br />
          qui vous suit partout.
        </>
      }
      lead="Du 16e au 17 Pro Max, on a testé chaque modèle pour vrai. Autonomie, photo basse lumière, endurance thermique — on ne recopie pas la fiche produit."
      accent="var(--accent-1)"
      slotId="iphone-section"
      ctaCompare="/comparer/iphone"
      ctaChoisir="/choisir/iphone"
    />
  )
}
