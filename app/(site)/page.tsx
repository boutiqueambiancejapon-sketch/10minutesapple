import { HeroSection } from '@/components/home/HeroSection'
import { DealsStrip } from '@/components/home/DealsStrip'
import { RecentArticles } from '@/components/home/RecentArticles'
import { MarqueeBanner } from '@/components/home/MarqueeBanner'
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
      <HeroSection />
      <DealsStrip />
      <RecentArticles />
      <MarqueeBanner />
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
