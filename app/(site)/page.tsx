import { HeroSection } from '@/components/home/HeroSection'
import { DealsStrip } from '@/components/home/DealsStrip'
import { RecentArticles } from '@/components/home/RecentArticles'
import { IphoneSection } from '@/components/home/IphoneSection'
import { MacSection } from '@/components/home/MacSection'
import { IpadSection } from '@/components/home/IpadSection'
import { AccessoiresSection } from '@/components/home/AccessoiresSection'
import { FeaturedTools } from '@/components/home/FeaturedTools'
import { AuthorTeaser } from '@/components/home/AuthorTeaser'

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <DealsStrip />
      {/* Éditorial — derniers articles featured + grille */}
      <RecentArticles />
      {/* Sections par catégorie — carousel / masonry / grid */}
      <IphoneSection />
      <MacSection />
      <IpadSection />
      <AccessoiresSection />
      {/* Outils interactifs */}
      <FeaturedTools />
      <AuthorTeaser />
    </main>
  )
}
