'use client'

import ReviewFilter, { ReviewSortType } from '@/app/places/[id]/_components/ReviewFilter'
import ReviewListItem from '@/components/reviews/ReviewListItem'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { PlaceReviewListItemResponse } from '@/types/api/place-detail'
import { useMemo, useState } from 'react'

export function ReviewListSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 pb-4 border-b border-[#eeeeee]">
        <div className="flex items-center gap-2">
          <Skeleton className="w-[49px] h-[49px] rounded-full" />
          <Skeleton className="h-[28px] w-[150px]" />
          <div className="flex-1" />
          <Skeleton className="h-[24px] w-[80px]" />
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-[120px] h-[80px] rounded-[2px]" />
          ))}
        </div>
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="pb-6 border-b border-[#eeeeee]">
          <div className="flex items-start gap-[10px] mb-3">
            <Skeleton className="size-[80px] rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-[28px] w-[120px] mb-2" />
              <Skeleton className="h-[24px] w-[80px]" />
            </div>
            <Skeleton className="h-[34px] w-[50px]" />
          </div>
          <Skeleton className="h-[100px] w-full mb-3" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      ))}
    </div>
  )
}

interface ReviewListSectionProps {
  reviews: PlaceReviewListItemResponse[]
  currentMemberId: number | null
}

export default function ReviewListSection({ reviews, currentMemberId }: ReviewListSectionProps) {
  const [photoOnly, setPhotoOnly] = useState(true)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [sortType, setSortType] = useState<ReviewSortType>('recommended')

  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews

    if (photoOnly) {
      filtered = filtered.filter((review) => review.imageUrls.length > 0)
    }

    if (selectedRating !== null) {
      filtered = filtered.filter((review) => Math.floor(review.totalRating) === selectedRating)
    }

    const sorted = [...filtered]
    switch (sortType) {
      case 'recommended':
        sorted.sort((a, b) => b.totalRating - a.totalRating)
        break
      case 'latest':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    return sorted
  }, [reviews, photoOnly, selectedRating, sortType])

  const photoReviewCount = reviews.filter((review) => review.imageUrls.length > 0).length

  return (
    <section className="flex flex-col gap-[3px] px-[15px] py-5">
      <ReviewFilter
        photoReviewCount={photoReviewCount}
        photoOnly={photoOnly}
        onPhotoOnlyChange={setPhotoOnly}
        selectedRating={selectedRating}
        onRatingChange={setSelectedRating}
        sortType={sortType}
        onSortTypeChange={setSortType}
      />
      <div className="flex flex-col divide-y divide-[#eeeeee]">
        {filteredAndSortedReviews.length === 0 ? (
          <div className="py-10 text-center text-[28px] leading-[46px] text-[#aaaaaa]">
            리뷰가 없습니다.
          </div>
        ) : (
          filteredAndSortedReviews.map((review) => (
            <ReviewListItem
              key={review.id}
              className="py-5"
              id={review.id}
              imageUrls={review.imageUrls}
              content={review.content}
              memberId={review.memberId}
              memberNickname={review.memberNickname}
              memberProfileImageUrl={review.memberProfileImageUrl}
              likeCount={review.likeCount}
              commentCount={review.commentCount}
              createdAt={review.createdAt}
              currentMemberId={currentMemberId}
            />
          ))
        )}
      </div>
    </section>
  )
}
