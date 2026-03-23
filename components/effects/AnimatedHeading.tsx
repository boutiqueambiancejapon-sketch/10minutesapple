/**
 * AnimatedHeading — révèle le texte par wipe gauche→droite (clip-path).
 * CSS @keyframes uniquement — aucun JS, aucune dépendance.
 * Conçu pour above-fold : animation immédiate au chargement.
 * prefers-reduced-motion géré dans globals.css (animation-duration: 0.01ms).
 * Server Component.
 */

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p'

type AnimatedHeadingProps = {
  children: React.ReactNode
  as?: HeadingTag
  delay?: number   // ms
  duration?: number // ms
  className?: string
  style?: React.CSSProperties
}

export function AnimatedHeading({
  children,
  as: Tag = 'h1',
  delay = 0,
  duration = 900,
  className,
  style,
}: AnimatedHeadingProps) {
  return (
    <Tag
      className={className}
      style={{
        animation: `heading-reveal ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both`,
        willChange: 'clip-path',
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
