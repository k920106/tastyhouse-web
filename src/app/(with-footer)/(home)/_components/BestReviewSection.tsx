import { Suspense } from 'react'
import BestReviewList from './BestReviewList'
import { BestReviewSwiperSkeleton } from './BestReviewSwiper'
import SectionHeader from './SectionHeader'

export default async function BestReviewSection() {
  return (
    <section className="pt-[50px] pb-[60px]">
      <SectionHeader
        title="베스트 리뷰"
        description="테하인들의 마음을 사로잡은 리뷰를 소개합니다."
      />
      <Suspense fallback={<BestReviewSwiperSkeleton />}>
        <BestReviewList />
      </Suspense>
    </section>
  )
}
