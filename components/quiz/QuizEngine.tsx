'use client'

/**
 * QuizEngine — moteur interactif du quiz Apple.
 * 'use client' isolé — la page /quiz reste Server Component.
 * Flux : 4 étapes → résultat avec recommandation produit.
 * Pas de librairie externe — useState + transitions CSS.
 */

import { useState } from 'react'
import Link from 'next/link'

/* ─── Types ─────────────────────────────────────────── */

type Step = {
  id: string
  question: string
  options: { label: string; value: string; emoji?: string }[]
}

type Answers = Record<string, string>

type Recommendation = {
  produit: string
  modele: string
  pourquoi: string
  prix: string
  href: string
  comparerHref: string
}

/* ─── Questions ─────────────────────────────────────── */

const STEPS: Step[] = [
  {
    id: 'produit',
    question: 'Quel produit Apple t\'intéresse ?',
    options: [
      { label: 'iPhone', value: 'iphone', emoji: '📱' },
      { label: 'Mac', value: 'mac', emoji: '💻' },
      { label: 'iPad', value: 'ipad', emoji: '🖥' },
      { label: 'Apple Watch', value: 'watch', emoji: '⌚' },
      { label: 'AirPods', value: 'airpods', emoji: '🎧' },
    ],
  },
  {
    id: 'budget',
    question: 'Quel est ton budget ?',
    options: [
      { label: 'Moins de 500 €', value: 'eco' },
      { label: '500 – 1 000 €', value: 'mid' },
      { label: '1 000 – 2 000 €', value: 'high' },
      { label: 'Plus de 2 000 €', value: 'pro' },
    ],
  },
  {
    id: 'usage',
    question: 'Ton usage principal ?',
    options: [
      { label: 'Photo & vidéo', value: 'photo' },
      { label: 'Travail & productivité', value: 'work' },
      { label: 'Gaming & loisirs', value: 'gaming' },
      { label: 'Communication & réseaux sociaux', value: 'social' },
      { label: 'Santé & sport', value: 'sport' },
    ],
  },
  {
    id: 'ecosysteme',
    question: 'Déjà dans l\'écosystème Apple ?',
    options: [
      { label: 'Oui — j\'ai déjà d\'autres produits Apple', value: 'yes' },
      { label: 'Non — je débute chez Apple', value: 'new' },
      { label: 'Je viens d\'Android / Windows', value: 'switch' },
    ],
  },
]

/* ─── Moteur de recommandation ───────────────────────── */

const COMPARER_HREF: Record<string, string> = {
  iphone:  '/comparer/iphone',
  mac:     '/comparer/mac',
  ipad:    '/comparer/ipad',
  watch:   '/comparer/watch',
  airpods: '/comparer/airpods',
}

function recommend(answers: Answers): Recommendation {
  const { produit, budget, usage } = answers
  const comparerHref = COMPARER_HREF[produit] ?? '/comparer'

  if (produit === 'iphone') {
    if (budget === 'eco') {
      return {
        produit: 'iPhone',
        modele: 'iPhone 16e',
        pourquoi: 'Le meilleur iPhone pour les petits budgets. Puce A18, Face ID, écran OLED 6,1", compatible Apple Intelligence. Le design moderne sans se ruiner.',
        prix: 'à partir de 699 €',
        href: '/choisir/iphone',
        comparerHref,
      }
    }
    if (budget === 'pro' || (budget === 'high' && usage === 'photo')) {
      return {
        produit: 'iPhone',
        modele: 'iPhone 17 Pro Max',
        pourquoi: 'Le meilleur iPhone pour la photo et la vidéo : triple capteur 48 MP, zoom 5×, puce A19 Pro. Écran 6,9" et autonomie record de 37h. Honnêtement, le Pro standard a la même caméra — le Max, c\'est pour l\'écran.',
        prix: 'à partir de 1 479 €',
        href: '/choisir/iphone',
        comparerHref,
      }
    }
    if (budget === 'high') {
      return {
        produit: 'iPhone',
        modele: 'iPhone 17 Pro',
        pourquoi: 'Le vrai tip : l\'iPhone 17 Pro a exactement le même système photo que le Pro Max — triple 48 MP, zoom 5×, ProRes. Si tu n\'as pas besoin de l\'écran géant, c\'est le bon choix.',
        prix: 'à partir de 1 229 €',
        href: '/choisir/iphone',
        comparerHref,
      }
    }
    if (budget === 'mid') {
      if (usage === 'social' || usage === 'work') {
        return {
          produit: 'iPhone',
          modele: 'iPhone 17 Air',
          pourquoi: 'Le plus fin jamais fait — 5,5 mm. Si tu privilégies le design et la légèreté, c\'est un objet magnifique. Un seul capteur arrière, mais suffisant pour un usage quotidien.',
          prix: 'à partir de 899 €',
          href: '/choisir/iphone',
          comparerHref,
        }
      }
      return {
        produit: 'iPhone',
        modele: 'iPhone 17',
        pourquoi: 'En clair : l\'iPhone 17 est le meilleur choix global. Écran 120 Hz, puce A19, capteur 48 MP. La vraie nouveauté ? Le ProMotion arrive enfin sur le modèle standard.',
        prix: 'à partir de 999 €',
        href: '/choisir/iphone',
        comparerHref,
      }
    }
  }

  if (produit === 'mac') {
    if (budget === 'eco') {
      return {
        produit: 'Mac',
        modele: 'Mac mini M4',
        pourquoi: 'Le vrai tip si tu as déjà un écran : le Mac mini M4 à 699 € est la meilleure affaire du catalogue Apple. Même puce que le MacBook Air, 600 € de moins.',
        prix: 'à partir de 699 €',
        href: '/choisir/mac',
        comparerHref,
      }
    }
    if (budget === 'mid') {
      return {
        produit: 'Mac',
        modele: 'MacBook Air 13" M5',
        pourquoi: 'Le MacBook Air M5 convient à 90 % des gens. Silencieux (zéro ventilateur), 1,24 kg, 18h d\'autonomie. Bureau, dev web, retouche photo — il gère tout sans broncher.',
        prix: 'à partir de 1 299 €',
        href: '/choisir/mac',
        comparerHref,
      }
    }
    if (budget === 'high') {
      return {
        produit: 'Mac',
        modele: 'MacBook Pro 14" M5',
        pourquoi: 'Le MacBook Pro M5 se justifie pour le montage 4K, la compilation Xcode ou le machine learning. Écran Liquid Retina XDR, 24h d\'autonomie, ventilation active pour les charges longues.',
        prix: 'à partir de 1 999 €',
        href: '/choisir/mac',
        comparerHref,
      }
    }
    return {
      produit: 'Mac',
      modele: 'MacBook Pro 16" M5 Pro',
      pourquoi: 'La station de travail portable. Puce M5 Pro, 24 Go RAM, écran 16,2" XDR. Pour les studios créatifs et les devs qui poussent les limites. Honnêtement, si tu hésites entre le 14" et le 16", le 14" suffit probablement.',
      prix: 'à partir de 2 999 €',
      href: '/choisir/mac',
      comparerHref,
    }
  }

  if (produit === 'ipad') {
    if (budget === 'eco') {
      return {
        produit: 'iPad',
        modele: 'iPad 11e génération',
        pourquoi: 'Pour la lecture, Netflix, les cours et la navigation — l\'iPad 11e gen fait tout ça très bien à 369 €. Puce A16, USB-C, écran 10,9". Pas besoin de payer plus si tu n\'as pas de workflow de création.',
        prix: 'à partir de 369 €',
        href: '/choisir/ipad',
        comparerHref,
      }
    }
    if (budget === 'mid') {
      if (usage === 'social' || usage === 'gaming') {
        return {
          produit: 'iPad',
          modele: 'iPad mini 7',
          pourquoi: 'L\'iPad mini 7 tient dans une main avec son écran 8,3" et sa puce A17 Pro. Parfait pour la lecture, les jeux et les déplacements — 293 g seulement.',
          prix: 'à partir de 599 €',
          href: '/choisir/ipad',
          comparerHref,
        }
      }
      return {
        produit: 'iPad',
        modele: 'iPad Air 11" M3',
        pourquoi: 'L\'iPad Air M3 est le choix évident pour le travail et les études : puce M3, écran Liquid Retina, compatible Apple Pencil Pro. Le meilleur compromis puissance-prix.',
        prix: 'à partir de 799 €',
        href: '/choisir/ipad',
        comparerHref,
      }
    }
    if (budget === 'high' && usage !== 'photo') {
      return {
        produit: 'iPad',
        modele: 'iPad Air 13" M3',
        pourquoi: 'Même puce M3 que le 11", mais avec un écran 13" pour le confort. Idéal si tu travailles sur des tableurs, des présentations ou des documents longs.',
        prix: 'à partir de 1 099 €',
        href: '/choisir/ipad',
        comparerHref,
      }
    }
    return {
      produit: 'iPad',
      modele: 'iPad Pro 11" M5',
      pourquoi: 'L\'iPad Pro M5 a le meilleur écran du marché : OLED Ultra Retina XDR. Pertinent si tu fais de l\'illustration avec Procreate, du montage 4K ou si tu remplaces un Mac.',
      prix: 'à partir de 1 199 €',
      href: '/choisir/ipad',
      comparerHref,
    }
  }

  if (produit === 'watch') {
    if (budget === 'eco') {
      return {
        produit: 'Apple Watch',
        modele: 'Apple Watch SE 2',
        pourquoi: 'Honnêtement, la Watch SE couvre 80 % des fonctionnalités à la moitié du prix. Suivi cardio, détection de chute et de crash. Ce qu\'il manque : l\'écran always-on et l\'ECG.',
        prix: 'à partir de 279 €',
        href: '/choisir/watch',
        comparerHref,
      }
    }
    if (budget === 'pro' || usage === 'sport') {
      return {
        produit: 'Apple Watch',
        modele: 'Apple Watch Ultra 2',
        pourquoi: 'Pour les sportifs sérieux : 60h d\'autonomie GPS, plongée 100 m certifiée, GPS double fréquence. À éviter si tu ne fais pas de sport extrême — la Series 11 fait le même job au quotidien.',
        prix: 'à partir de 899 €',
        href: '/choisir/watch',
        comparerHref,
      }
    }
    return {
      produit: 'Apple Watch',
      modele: 'Apple Watch Series 11',
      pourquoi: 'Le vrai tip : la Series 11 a les capteurs santé les plus complets — ECG, SpO2, température, détection d\'apnée du sommeil. Écran always-on, charge en 30 min. Le meilleur choix quotidien.',
      prix: 'à partir de 449 €',
      href: '/choisir/watch',
      comparerHref,
    }
  }

  if (produit === 'airpods') {
    if (budget === 'eco') {
      return {
        produit: 'AirPods',
        modele: 'AirPods 4',
        pourquoi: 'Les AirPods 4 sont les premiers sans embouts intra à proposer une réduction de bruit active. Pour les réunions et les trajets, ils suffisent largement.',
        prix: 'à partir de 179 €',
        href: '/choisir/airpods',
        comparerHref,
      }
    }
    if (budget === 'pro') {
      return {
        produit: 'AirPods',
        modele: 'AirPods Max',
        pourquoi: 'La meilleure réduction de bruit du marché selon Mathias (testé côte à côte avec le Sony XM5). Pertinent si tu travailles en open space ou tu voyages beaucoup. Aucun sens si tu veux du sport.',
        prix: 'à partir de 599 €',
        href: '/choisir/airpods',
        comparerHref,
      }
    }
    return {
      produit: 'AirPods',
      modele: 'AirPods Pro 2',
      pourquoi: 'En clair : les AirPods Pro 2 sont le meilleur rapport qualité/prix des écouteurs Apple. ANC de référence, spatial audio, résistance à l\'eau IP54. Le choix par défaut si tu hésites.',
      prix: 'à partir de 249 €',
      href: '/choisir/airpods',
      comparerHref,
    }
  }

  // Fallback
  return {
    produit: 'Apple',
    modele: 'iPhone 17',
    pourquoi: 'Le choix le plus polyvalent du catalogue Apple. Écran 120 Hz, puce A19, excellent rapport qualité-prix.',
    prix: 'à partir de 999 €',
    href: '/choisir/iphone',
    comparerHref: '/comparer/iphone',
  }
}

/* ─── Composant ──────────────────────────────────────── */

type QuizEngineProps = {
  /** Pré-sélectionne le produit et saute l'étape 0 (pour les pages /choisir/[produit]). */
  defaultProduit?: string
}

export function QuizEngine({ defaultProduit }: QuizEngineProps = {}) {
  const initialStep = defaultProduit ? 1 : 0
  const initialAnswers: Answers = defaultProduit ? { produit: defaultProduit } : {}

  const [step, setStep] = useState(initialStep)
  const [answers, setAnswers] = useState<Answers>(initialAnswers)
  const [done, setDone] = useState(false)

  const current = STEPS[step]
  const progress = Math.round(((step) / STEPS.length) * 100)

  function handleSelect(value: string) {
    const next = { ...answers, [current.id]: value }
    setAnswers(next)

    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      setDone(true)
    }
  }

  function restart() {
    setStep(0)
    setAnswers({})
    setDone(false)
  }

  if (done) {
    const rec = recommend(answers)
    return <Result rec={rec} onRestart={restart} />
  }

  return (
    <div>
      {/* Barre de progression */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            flex: 1,
            height: '3px',
            background: 'var(--bg-surface-2)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'var(--accent-4)',
              borderRadius: 'var(--radius-full)',
              transition: 'width 300ms ease',
            }}
          />
        </div>
        <span
          style={{ fontSize: '12px', color: 'var(--text-muted)', flexShrink: 0 }}
          aria-label={`Question ${step + 1} sur ${STEPS.length}`}
        >
          {step + 1} / {STEPS.length}
        </span>
      </div>

      {/* Question */}
      <h2
        style={{
          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
          fontSize: 'clamp(20px, 3vw, 28px)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-6)',
          textWrap: 'balance',
          lineHeight: 1.2,
        }}
      >
        {current.question}
      </h2>

      {/* Options */}
      <div
        role="group"
        aria-label={current.question}
        style={{
          display: 'grid',
          gridTemplateColumns:
            current.options.length <= 3
              ? '1fr'
              : 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 'var(--space-3)',
        }}
      >
        {current.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: opt.emoji ? 'var(--space-4)' : 'var(--space-3)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4) var(--space-5)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'border-color 150ms ease, background 150ms ease',
              width: '100%',
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
              const el = e.currentTarget
              el.style.borderColor = 'var(--accent-4)'
              el.style.background = 'rgba(123,97,255,0.06)'
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
              const el = e.currentTarget
              el.style.borderColor = 'var(--border)'
              el.style.background = 'var(--bg-surface)'
            }}
          >
            {opt.emoji && (
              <span style={{ fontSize: '22px', lineHeight: 1, flexShrink: 0 }}>
                {opt.emoji}
              </span>
            )}
            <span
              style={{
                fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '15px',
                color: 'var(--text-primary)',
              }}
            >
              {opt.label}
            </span>
          </button>
        ))}
      </div>

      {/* Retour */}
      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            fontSize: '13px',
            marginTop: 'var(--space-6)',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
        >
          ← Retour
        </button>
      )}
    </div>
  )
}

/* ─── Résultat ───────────────────────────────────────── */

function Result({
  rec,
  onRestart,
}: {
  rec: Recommendation
  onRestart: () => void
}) {
  return (
    <div>
      {/* Badge résultat */}
      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--accent-3)',
          marginBottom: 'var(--space-5)',
        }}
      >
        Notre recommandation
      </div>

      {/* Modèle recommandé */}
      <h2
        style={{
          fontFamily: 'var(--next-font-display), system-ui, sans-serif',
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-2)',
          lineHeight: 1.1,
        }}
      >
        {rec.modele}
      </h2>
      <div
        style={{
          fontFamily: 'var(--next-font-mono), monospace',
          fontVariantNumeric: 'tabular-nums',
          fontSize: '16px',
          color: 'var(--accent-2)',
          marginBottom: 'var(--space-5)',
        }}
      >
        {rec.prix}
      </div>

      {/* Verdict */}
      <div
        style={{
          background: 'var(--bg-surface)',
          borderLeft: '3px solid var(--accent-3)',
          borderRadius: '0 var(--radius-md) var(--radius-md) 0',
          padding: 'var(--space-5) var(--space-6)',
          marginBottom: 'var(--space-8)',
          fontSize: '15px',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
        }}
      >
        {rec.pourquoi}
      </div>

      {/* CTAs */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
          marginBottom: 'var(--space-8)',
        }}
      >
        <Link
          href={rec.comparerHref}
          style={{
            display: 'inline-block',
            background: 'var(--accent-4)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '14px',
            padding: 'var(--space-3) var(--space-6)',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
          }}
        >
          Comparer maintenant →
        </Link>
        <Link
          href={rec.href}
          style={{
            display: 'inline-block',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            fontSize: '14px',
            padding: 'var(--space-3) var(--space-6)',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
          }}
        >
          Voir le guide d&apos;achat
        </Link>
      </div>

      {/* Recommencer */}
      <button
        onClick={onRestart}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          fontSize: '13px',
          padding: 0,
        }}
      >
        ↩ Recommencer le quiz
      </button>
    </div>
  )
}
