import { Suspense } from 'react'
import ReviewInfo, { ReviewInfoSkeleton } from './ReviewInfo'

interface ReviewInfoSectionProps {
  reviewId: number
}

export default async function ReviewInfoSection({ reviewId }: ReviewInfoSectionProps) {
  return (
    <section className="px-[15px] pt-5 pb-8 border-b border-[#eeeeee] box-border">
      <Suspense fallback={<ReviewInfoSkeleton />}>
        <ReviewInfo reviewId={reviewId} />
      </Suspense>
    </section>
  )
}
