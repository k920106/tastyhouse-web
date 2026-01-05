import ReviewOptionButton from '@/components/reviews/ReviewOptionButton'
import { Suspense } from 'react'
import { ReviewInfoSkeleton } from './ReviewInfo'
import ReviewInfoServer from './ReviewInfoServer'
import ReviewLikeButton from './ReviewLikeButton'
import ReviewLikeButtonServer from './ReviewLikeButtonServer'
import ReviewOptionDrawerServer from './ReviewOptionDrawerServer'

interface ReviewInfoSectionProps {
  params: Promise<{ id: string }>
}

export default function ReviewInfoSection({ params }: ReviewInfoSectionProps) {
  return (
    <section className="px-[15px] pt-5 pb-8 border-b border-[#eeeeee] box-border">
      <Suspense fallback={<ReviewInfoSkeleton />}>
        <ReviewInfoServer
          params={params}
          reviewLike={
            <Suspense fallback={<ReviewLikeButton isLiked={false} disabled={true} />}>
              <ReviewLikeButtonServer params={params} />
            </Suspense>
          }
          reviewOption={
            <Suspense fallback={<ReviewOptionButton disabled={true} />}>
              <ReviewOptionDrawerServer params={params} />
            </Suspense>
          }
        />
      </Suspense>
    </section>
  )
}
