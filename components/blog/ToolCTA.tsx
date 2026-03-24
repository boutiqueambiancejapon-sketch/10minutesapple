/**
 * ToolCTA — bloc CTA vers un outil interactif du site.
 * Injecté automatiquement selon la catégorie de l'article.
 * Server Component.
 */
import Link from 'next/link'

type Tool = {
  href: string
  label: string
  description: string
  cta: string
  accentVar: string
  bgRgba: string
  borderRgba: string
}

const TOOLS: Record<string, Tool> = {
  iphone: {
    href: '/comparer/iphone',
    label: 'Comparateur iPhone',
    description: 'Compare tous les modèles côte à côte : puce, écran, photo, autonomie et prix.',
    cta: 'Comparer maintenant →',
    accentVar: 'var(--accent-1)',
    bgRgba: 'rgba(255,61,87,0.06)',
    borderRgba: 'rgba(255,61,87,0.20)',
  },
  mac: {
    href: '/comparer/mac',
    label: 'Comparateur Mac',
    description: 'MacBook Air, MacBook Pro, Mac mini, iMac — tous les Mac comparés par prix et performance.',
    cta: 'Comparer maintenant →',
    accentVar: 'var(--accent-4)',
    bgRgba: 'rgba(123,97,255,0.06)',
    borderRgba: 'rgba(123,97,255,0.20)',
  },
  ipad: {
    href: '/comparer/ipad',
    label: 'Comparateur iPad',
    description: 'iPad, mini, Air, Pro — le bon iPad selon ton usage et ton budget.',
    cta: 'Comparer maintenant →',
    accentVar: 'var(--accent-3)',
    bgRgba: 'rgba(61,255,192,0.06)',
    borderRgba: 'rgba(61,255,192,0.20)',
  },
  accessoires: {
    href: '/comparer/airpods',
    label: 'Comparateur AirPods',
    description: 'AirPods 4, Pro 2, Max — les bons écouteurs Apple selon ton usage.',
    cta: 'Comparer les AirPods →',
    accentVar: 'var(--accent-2)',
    bgRgba: 'rgba(255,210,63,0.06)',
    borderRgba: 'rgba(255,210,63,0.20)',
  },
  deals: {
    href: '/simulateur',
    label: 'Simulateur de prix',
    description: 'Analyse les cycles de prix Apple et détermine le meilleur moment pour acheter.',
    cta: 'Utiliser le simulateur →',
    accentVar: 'var(--accent-1)',
    bgRgba: 'rgba(255,61,87,0.06)',
    borderRgba: 'rgba(255,61,87,0.20)',
  },
}

const FALLBACK = TOOLS.iphone

type Props = { categorie: string }

export function ToolCTA({ categorie }: Props) {
  const tool = TOOLS[categorie] ?? FALLBACK

  return (
    <Link
      href={tool.href}
      style={{ textDecoration: 'none', display: 'block', margin: 'var(--space-10) 0' }}
    >
      <div
        style={{
          borderLeft: `3px solid ${tool.accentVar}`,
          paddingLeft: 'var(--space-6)',
          paddingTop: 'var(--space-4)',
          paddingBottom: 'var(--space-4)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
        }}
        className="tool-card"
      >
        <p
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontWeight: 800,
            fontSize: '13px',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: tool.accentVar,
            margin: 0,
          }}
        >
          {tool.label}
        </p>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            margin: 0,
            lineHeight: 1.55,
          }}
        >
          {tool.description}
        </p>
        <p
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: tool.accentVar,
            margin: 0,
          }}
        >
          {tool.cta}
        </p>
      </div>
    </Link>
  )
}
