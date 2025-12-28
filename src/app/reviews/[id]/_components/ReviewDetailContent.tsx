import { Suspense } from 'react'
import { CommentSectionSkeleton } from './CommentSection'
import CommentSectionFetcher from './CommentSectionFetcher'
import { ReviewDetailHeaderSkeleton } from './ReviewDetailHeader'
import { ReviewDetailSectionSkeleton } from './ReviewDetailSection'
import ReviewHeaderFetcher from './ReviewHeaderFetcher'
import ReviewSectionFetcher from './ReviewSectionFetcher'

interface ReviewDetailContentProps {
  reviewId: number
}

export default function ReviewDetailContent({ reviewId }: ReviewDetailContentProps) {
  return (
    <>
      <Suspense fallback={<ReviewDetailHeaderSkeleton />}>
        <ReviewHeaderFetcher reviewId={reviewId} />
      </Suspense>
      <div className="pb-20">
        <Suspense fallback={<ReviewDetailSectionSkeleton />}>
          <ReviewSectionFetcher reviewId={reviewId} />
        </Suspense>
        <Suspense fallback={<CommentSectionSkeleton />}>
          <CommentSectionFetcher reviewId={reviewId} />
        </Suspense>
      </div>
    </>
  )
}
