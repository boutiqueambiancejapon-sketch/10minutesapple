import { HomeMastheadV2 } from '@/components/home/HomeMastheadV2'
import { DealsOfTheDay } from '@/components/home/DealsOfTheDay'
import { FeaturedArticle } from '@/components/home/FeaturedArticle'
import { HomeArticleGrid } from '@/components/home/HomeArticleGrid'
import { IphoneSection } from '@/components/home/IphoneSection'
import { MacSection } from '@/components/home/MacSection'
import { IpadSection } from '@/components/home/IpadSection'
import { WatchSection } from '@/components/home/WatchSection'
import { AccessoiresSection } from '@/components/home/AccessoiresSection'
import { FeaturedTools } from '@/components/home/FeaturedTools'
import { AuthorTeaser } from '@/components/home/AuthorTeaser'
import { Newsletter } from '@/components/home/Newsletter'

export default function HomePage() {
  return (
    <main id="main-content" className="home-shell">
      <HomeMastheadV2 />
      <DealsOfTheDay />
      <FeaturedArticle />
      <HomeArticleGrid />

      {/* Deep dives par catégorie — articles + produits affiliés */}
      <IphoneSection />
      <MacSection />
      <IpadSection />
      <WatchSection />
      <AccessoiresSection />

      {/* Outils interactifs + présentation auteur */}
      <FeaturedTools />
      <AuthorTeaser />

      <Newsletter />
      <div style={{ height: 40 }} />
    </main>
  )
}
