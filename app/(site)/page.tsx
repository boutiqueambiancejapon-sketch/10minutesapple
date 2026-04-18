import { AnnouncementBar } from '@/components/effects/AnnouncementBar'
import { HomeHeader } from '@/components/home/HomeHeader'
import { HomeHero } from '@/components/home/HomeHero'
import { CategoryPills } from '@/components/home/CategoryPills'
import { DealsOfTheDay } from '@/components/home/DealsOfTheDay'
import { RecentArticles } from '@/components/home/RecentArticles'
import { IphoneSection } from '@/components/home/IphoneSection'
import { MacSection } from '@/components/home/MacSection'
import { IpadSection } from '@/components/home/IpadSection'
import { WatchSection } from '@/components/home/WatchSection'
import { AccessoiresSection } from '@/components/home/AccessoiresSection'
import { FeaturedTools } from '@/components/home/FeaturedTools'
import { AuthorTeaser } from '@/components/home/AuthorTeaser'

export default function HomePage() {
  return (
    <main id="main-content">
      <AnnouncementBar
        message="Printemps Apple \u2014 jusqu'\u00e0 \u221232\u00a0% sur l'iPhone\u00a016"
        href="/deals"
      />
      <HomeHeader />
      <HomeHero />
      <CategoryPills />
      <DealsOfTheDay />
      <RecentArticles />
      <IphoneSection />
      <MacSection />
      <IpadSection />
      <WatchSection />
      <AccessoiresSection />
      <FeaturedTools />
      <AuthorTeaser />
    </main>
  )
}
