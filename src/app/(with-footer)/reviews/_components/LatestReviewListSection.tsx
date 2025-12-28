import { ReviewType } from '@/types/api/review'
import { Suspense } from 'react'
import LatestReviewList, { LatestReviewListSkeleton } from './LatestReviewList'

interface LatestReviewListSectionProps {
  reviewType: ReviewType
}

export default function LatestReviewListSection({ reviewType }: LatestReviewListSectionProps) {
  return (
    <section className="flex flex-col gap-2.5 bg-[#f9f9f9]">
      <Suspense fallback={<LatestReviewListSkeleton />}>
        <LatestReviewList reviewType={reviewType} />
      </Suspense>
    </section>
  )
}
