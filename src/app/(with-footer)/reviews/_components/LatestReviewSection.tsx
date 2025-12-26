import { ReviewType } from '@/types/api/review'
import { Suspense } from 'react'
import LatestReviewList, { LatestReviewListSkeleton } from './LatestReviewList'
import ReviewTabs from './ReviewTabs'

interface LatestReviewSectionProps {
  reviewType: ReviewType
  clientType: 'all' | 'following'
}

export default function LatestReviewSection({ reviewType, clientType }: LatestReviewSectionProps) {
  return (
    <>
      <ReviewTabs activeTab={clientType} />
      <div className="pb-[70px]">
        <Suspense fallback={<LatestReviewListSkeleton />}>
          <LatestReviewList reviewType={reviewType} />
        </Suspense>
      </div>
    </>
  )
}
