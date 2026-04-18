import { AnnouncementBar } from '@/components/effects/AnnouncementBar'
import { HomeHeader } from '@/components/home/HomeHeader'
import { HomeHero } from '@/components/home/HomeHero'
import { CategoryPills } from '@/components/home/CategoryPills'
import { DealsOfTheDay } from '@/components/home/DealsOfTheDay'
import { FeaturedArticle } from '@/components/home/FeaturedArticle'
import { HomeArticleGrid } from '@/components/home/HomeArticleGrid'
import { Newsletter } from '@/components/home/Newsletter'

export default function HomePage() {
  return (
    <main id="main-content" className="home-shell">
      <AnnouncementBar
        message="Printemps Apple \u2014 jusqu'\u00e0 \u221232\u00a0% sur l'iPhone\u00a016"
        href="/deals"
      />
      <HomeHeader />
      <HomeHero />
      <CategoryPills />
      <DealsOfTheDay />
      <FeaturedArticle />
      <HomeArticleGrid />
      <Newsletter />
      <div style={{ height: 40 }} />
    </main>
  )
}
