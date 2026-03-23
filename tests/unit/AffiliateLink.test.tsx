import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AffiliateLink } from '@/components/ui/AffiliateLink'

describe('AffiliateLink', () => {
  it('rend le contenu enfant', () => {
    render(
      <AffiliateLink href="https://www.amazon.fr/dp/B0CHX1W1XY">
        Voir sur Amazon
      </AffiliateLink>
    )
    expect(screen.getByText('Voir sur Amazon')).toBeInTheDocument()
  })

  it('ajoute automatiquement le tag affilié', () => {
    render(
      <AffiliateLink href="https://www.amazon.fr/dp/B0CHX1W1XY">
        Test
      </AffiliateLink>
    )
    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toContain('tag=ambiancejap0a-21')
  })

  it('a les attributs rel corrects', () => {
    render(
      <AffiliateLink href="https://www.amazon.fr/dp/B0CHX1W1XY">
        Test
      </AffiliateLink>
    )
    const link = screen.getByRole('link')
    expect(link.getAttribute('rel')).toContain('nofollow')
    expect(link.getAttribute('rel')).toContain('sponsored')
    expect(link.getAttribute('rel')).toContain('noopener')
  })

  it('ouvre dans un nouvel onglet', () => {
    render(
      <AffiliateLink href="https://www.amazon.fr/dp/B0CHX1W1XY">
        Test
      </AffiliateLink>
    )
    expect(screen.getByRole('link').getAttribute('target')).toBe('_blank')
  })

  it('ne modifie pas les URLs non-Amazon', () => {
    render(
      <AffiliateLink href="https://apple.com/iphone">
        Test
      </AffiliateLink>
    )
    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe('https://apple.com/iphone')
    expect(link.getAttribute('href')).not.toContain('tag=')
  })

  it('accepte une className', () => {
    render(
      <AffiliateLink href="https://www.amazon.fr/dp/test" className="mon-style">
        Test
      </AffiliateLink>
    )
    expect(screen.getByRole('link').className).toBe('mon-style')
  })
})
