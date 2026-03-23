import { HeroSection } from '@/components/home/HeroSection'
import { DealsStrip } from '@/components/home/DealsStrip'
import { FeaturedTools } from '@/components/home/FeaturedTools'
import { AuthorTeaser } from '@/components/home/AuthorTeaser'

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <DealsStrip />
      <FeaturedTools />
      <AuthorTeaser />
    </main>
  )
}
