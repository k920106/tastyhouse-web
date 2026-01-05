import ReviewOptionButton from '@/components/reviews/ReviewOptionButton'
import { Suspense } from 'react'
import { ReviewInfoSkeleton } from './ReviewInfo'
import ReviewInfoServer from './ReviewInfoServer'
import ReviewLikeButton from './ReviewLikeButton'
import ReviewLikeButtonServer from './ReviewLikeButtonServer'
import ReviewOptionDrawerServer from './ReviewOptionDrawerServer'

interface ReviewInfoSectionProps {
  reviewId: number
}

export default function ReviewInfoSection({ reviewId }: ReviewInfoSectionProps) {
  return (
    <section className="px-[15px] pt-5 pb-8 border-b border-[#eeeeee] box-border">
      <Suspense fallback={<ReviewInfoSkeleton />}>
        <ReviewInfoServer
          reviewId={reviewId}
          reviewLike={
            <Suspense fallback={<ReviewLikeButton isLiked={false} disabled={true} />}>
              <ReviewLikeButtonServer reviewId={reviewId} />
            </Suspense>
          }
          reviewOption={
            <Suspense fallback={<ReviewOptionButton disabled={true} />}>
              <ReviewOptionDrawerServer reviewId={reviewId} />
            </Suspense>
          }
        />
      </Suspense>
    </section>
  )
}
