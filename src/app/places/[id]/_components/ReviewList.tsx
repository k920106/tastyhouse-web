'use client'

import ReviewFilter, { ReviewSortType } from '@/components/reviews/ReviewFilter'
import ReviewListItem from '@/components/reviews/ReviewListItem'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { PlaceReviewListItemResponse } from '@/types/api/place-detail'
import { useMemo, useState } from 'react'

interface ReviewListProps {
  reviews: PlaceReviewListItemResponse[]
}

export function ReviewListSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* 필터 스켈레톤 */}
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

      {/* 리뷰 항목 스켈레톤 */}
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

export default function ReviewList({ reviews }: ReviewListProps) {
  const [photoOnly, setPhotoOnly] = useState(false)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [sortType, setSortType] = useState<ReviewSortType>('latest')

  // 필터링 및 정렬
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews

    // 포토리뷰 필터
    if (photoOnly) {
      filtered = filtered.filter((review) => review.images.length > 0)
    }

    // 평점 필터
    if (selectedRating !== null) {
      filtered = filtered.filter((review) => Math.floor(review.totalRating) === selectedRating)
    }

    // 정렬
    const sorted = [...filtered]
    switch (sortType) {
      case 'latest':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'oldest':
        sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case 'rating-high':
        sorted.sort((a, b) => b.totalRating - a.totalRating)
        break
      case 'rating-low':
        sorted.sort((a, b) => a.totalRating - b.totalRating)
        break
    }

    return sorted
  }, [reviews, photoOnly, selectedRating, sortType])

  const photoReviewCount = reviews.filter((review) => review.images.length > 0).length

  return (
    <div className="flex flex-col gap-6">
      <ReviewFilter
        photoReviewCount={photoReviewCount}
        photoOnly={photoOnly}
        onPhotoOnlyChange={setPhotoOnly}
        selectedRating={selectedRating}
        onRatingChange={setSelectedRating}
        onSortTypeChange={setSortType}
      />

      {filteredAndSortedReviews.length === 0 ? (
        <div className="py-10 text-center text-[28px] leading-[46px] text-[#aaaaaa]">
          리뷰가 없습니다.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {filteredAndSortedReviews.map((review) => (
            <ReviewListItem key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  )
}
