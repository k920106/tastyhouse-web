import QuickReviewButton from '@/components/home/QuickReviewButton'
import BannerSection from './_components/BannerSection'
import BestPlaceSection from './_components/BestPlaceSection'
import BestReviewSection from './_components/BestReviewSection'
import ChoiceSection from './_components/ChoiceSection'
import TodayDiscountSection from './_components/TodayDiscountSection'

export default async function HomePage() {
  return (
    <>
      <BannerSection />
      <BestReviewSection />
      <BestPlaceSection />
      <TodayDiscountSection />
      <ChoiceSection />
      <div className="fixed bottom-18 left-0 right-0 z-[60]">
        <QuickReviewButton />
      </div>
    </>
  )
}
