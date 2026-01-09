'use client'

import { formatDecimal } from '@/lib/number'
import { PlaceReviewListItemResponse, PlaceReviewStatistics } from '@/types/api/place-detail'
import Image from 'next/image'
import { useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'

interface PlaceReviewsProps {
  reviews: PlaceReviewListItemResponse[]
  statistics: PlaceReviewStatistics
}

export function PlaceReviews({ reviews, statistics }: PlaceReviewsProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [photoOnly, setPhotoOnly] = useState(false)

  const photoReviewCount = reviews.filter((r) => r.images.length > 0).length

  const renderStars = (rating: number, max: number = 5) => {
    const fullStars = Math.floor(rating)
    return (
      <>
        {Array.from({ length: fullStars }).map((_, i) => (
          <span key={`full-${i}`} className="text-main">
            ⭐
          </span>
        ))}
        {Array.from({ length: max - fullStars }).map((_, i) => (
          <span key={`empty-${i}`} className="text-[#ddd]">
            ⭐
          </span>
        ))}
      </>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))

    if (diffInHours < 1) return '방금 전'
    if (diffInHours < 24) return `${diffInHours}시간 전`
    if (diffInHours < 48) return '1일 전'

    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="py-6">
      {/* Rating Summary */}
      <div className="pb-6 mb-6 border-b-[6px] border-[#f5f5f5] -mx-4 px-4">
        <div className="flex items-end gap-4 mb-6">
          <div className="text-[48px]">{formatDecimal(statistics.totalRating, 1)}</div>
          <div className="pb-2 text-[15px] text-[#666666]">/ 5</div>
        </div>

        <div className="flex items-center gap-2 mb-6 text-2xl">
          {renderStars(statistics.totalRating)}
        </div>

        <div className="mb-6 text-[13px] text-[#666666]">
          {statistics.totalReviewCount.toLocaleString()} 개의 리뷰
        </div>

        {/* Rating Breakdown */}
        <div className="flex items-center gap-8 mb-6">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = statistics.ratingCounts[star.toString()] || 0
            const percentage =
              statistics.totalReviewCount > 0 ? (count / statistics.totalReviewCount) * 100 : 0
            return (
              <div key={star} className="flex flex-col items-center">
                <div className="mb-2 text-[13px] text-[#666666]">{star}점</div>
                <div className="w-[2px] h-[60px] bg-[#eeeeee] relative">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-main"
                    style={{ height: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Rating Details */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-8">
          {[
            { label: '분위기', value: statistics.averageAtmosphereRating },
            { label: '맛', value: statistics.averageTasteRating },
            { label: '친절', value: statistics.averageKindnessRating },
            { label: '양', value: statistics.averageAmountRating },
            { label: '위생', value: statistics.averageHygieneRating },
            { label: '가격', value: statistics.averagePriceRating },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-[13px] text-[#666666]">{item.label}</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center text-sm">{renderStars(item.value, 4)}</div>
                <span className="text-[15px] text-main">{formatDecimal(item.value, 1)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-[13px]">
          <span className="text-[#666666]">재방문의사</span>
          <span className="ml-2 text-main">있어요 ({statistics.willRevisitPercentage}%)</span>
        </div>
      </div>

      {/* Review Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setSelectedRating(null)}
          className={`px-4 py-2 text-[13px] rounded-full border whitespace-nowrap ${
            selectedRating === null ? 'border-main text-main' : 'border-[#eeeeee] text-[#666666]'
          }`}
        >
          전체
        </button>
        {[5, 4, 3, 2, 1].map((rating) => (
          <button
            key={rating}
            onClick={() => setSelectedRating(rating)}
            className={`px-4 py-2 text-[13px] rounded-full border whitespace-nowrap ${
              selectedRating === rating
                ? 'border-main text-main'
                : 'border-[#eeeeee] text-[#666666]'
            }`}
          >
            {rating}점
          </button>
        ))}
      </div>

      {/* Review Sort */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#eeeeee]">
        <input
          type="checkbox"
          id="photo-review"
          className="w-4 h-4"
          checked={photoOnly}
          onChange={(e) => setPhotoOnly(e.target.checked)}
        />
        <label htmlFor="photo-review" className="text-[13px] text-[#666666]">
          포토리뷰 ({photoReviewCount})
        </label>
        <div className="flex-1" />
        <button className="flex items-center gap-1 text-[13px] text-[#666666]">
          최신순
          <IoChevronBack size={14} className="rotate-[-90deg]" />
        </button>
      </div>

      {/* Reviews */}
      <div className="space-y-6">
        {reviews
          .filter((review) => {
            if (selectedRating !== null && Math.floor(review.totalRating) !== selectedRating) {
              return false
            }
            if (photoOnly && review.images.length === 0) {
              return false
            }
            return true
          })
          .map((review) => (
            <div key={review.id} className="pb-6 border-b border-[#eeeeee]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                <div className="flex-1">
                  <div className="text-[15px]">
                    {review.memberNickname || `회원${review.memberId}`}
                  </div>
                  <div className="text-[13px] text-[#999999]">{formatDate(review.createdAt)}</div>
                </div>
                <div className="text-[19px] text-main">{formatDecimal(review.totalRating, 1)}</div>
              </div>

              <p className="mb-3 text-[15px] leading-[1.6] line-clamp-4">{review.content}</p>

              {review.images.length > 0 && (
                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
                  <Image
                    src={review.images[0].imageUrl}
                    alt="리뷰 이미지"
                    fill
                    className="object-cover"
                  />
                  {review.images.length > 1 && (
                    <div className="absolute bottom-3 right-3 px-2 py-1 text-[13px] text-white bg-black/50 rounded">
                      1/{review.images.length}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}
