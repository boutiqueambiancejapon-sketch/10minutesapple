import { CategoryShowcase } from './CategoryShowcase'

export function WatchSection() {
  return (
    <CategoryShowcase
      slug="watch"
      index="05"
      eyebrow="Apple Watch · Sport & santé"
      title={
        <>
          Le poignet,{' '}
          <span className="cat-italic">cockpit</span>
          <br />
          de votre santé.
        </>
      }
      lead="Series, SE, Ultra — capteurs, précision GPS, fiabilité des métriques sommeil. Quel modèle pour quel profil, et les alternatives Garmin dans le match."
      accent="var(--accent-2)"
      slotId="watch-section"
      reverse
      ctaCompare="/comparer/watch"
      ctaChoisir="/choisir/watch"
    />
  )
}
