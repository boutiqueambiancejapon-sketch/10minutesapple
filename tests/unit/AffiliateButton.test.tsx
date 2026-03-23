import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AffiliateButton } from '@/components/ui/AffiliateButton'

describe('AffiliateButton', () => {
  it('affiche le label', () => {
    render(
      <AffiliateButton
        href="https://www.amazon.fr/dp/B0CHX1W1XY"
        label="Voir le meilleur prix"
      />
    )
    expect(screen.getByText('Voir le meilleur prix')).toBeInTheDocument()
  })

  it('ajoute le tag affilié dans le href', () => {
    render(
      <AffiliateButton
        href="https://www.amazon.fr/dp/B0CHX1W1XY"
        label="CTA"
      />
    )
    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toContain('tag=ambiancejap0a-21')
  })

  it('a les attributs rel corrects', () => {
    render(
      <AffiliateButton
        href="https://www.amazon.fr/dp/B0CHX1W1XY"
        label="CTA"
      />
    )
    const link = screen.getByRole('link')
    expect(link.getAttribute('rel')).toContain('nofollow')
    expect(link.getAttribute('rel')).toContain('sponsored')
    expect(link.getAttribute('rel')).toContain('noopener')
  })

  it('ouvre dans un nouvel onglet', () => {
    render(
      <AffiliateButton
        href="https://www.amazon.fr/dp/B0CHX1W1XY"
        label="CTA"
      />
    )
    expect(screen.getByRole('link').getAttribute('target')).toBe('_blank')
  })

  it('rend une icône ExternalLink', () => {
    const { container } = render(
      <AffiliateButton
        href="https://www.amazon.fr/dp/B0CHX1W1XY"
        label="CTA"
      />
    )
    // lucide-react rend un SVG
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
