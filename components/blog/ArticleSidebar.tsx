/**
 * ArticleSidebar — colonne latérale sticky : sommaire + deals du moment.
 * Composant hybride : le conteneur est un Server Component,
 * le TOC est un Client Component (scroll tracking).
 * Masqué sous 1080px (collapse mobile).
 */

import { TableOfContents } from './TableOfContents'
import { SidebarDealCard } from './SidebarDealCard'
import type { DealItem } from './SidebarDealCard'

type ArticleSidebarProps = {
  deals: DealItem[]
}

export function ArticleSidebar({ deals }: ArticleSidebarProps) {
  return (
    <aside
      className="article-sidebar"
      aria-label="Sommaire et deals"
    >
      <div className="article-sidebar-inner">
        {/* Sommaire — généré côté client depuis les H2 du DOM */}
        <TableOfContents />

        {/* Séparateur */}
        <div
          style={{
            height: '1px',
            background: 'var(--border)',
            margin: 'var(--space-2) 0 var(--space-4)',
          }}
        />

        {/* Deals du moment */}
        <SidebarDealCard deals={deals} />
      </div>
    </aside>
  )
}
