import { BookmarkButtonClientSkeleton } from '@/app/places/[id]/_components/BookmarkButtonClient'
import { Suspense } from 'react'
import { ReviewInfoSkeleton } from './ReviewInfo'
import ReviewInfoContent from './ReviewInfoContent'
import ReviewOptionContent from './ReviewOptionContent'

interface ReviewInfoSectionProps {
  reviewId: number
}

export default async function ReviewInfoSection({ reviewId }: ReviewInfoSectionProps) {
  return (
    <section className="px-[15px] pt-5 pb-8 border-b border-[#eeeeee] box-border">
      <Suspense fallback={<ReviewInfoSkeleton />}>
        <ReviewInfoContent
          reviewId={reviewId}
          reviewOption={
            <Suspense fallback={<BookmarkButtonClientSkeleton />}>
              <ReviewOptionContent reviewId={reviewId} />
            </Suspense>
          }
        />
      </Suspense>
    </section>
  )
}
