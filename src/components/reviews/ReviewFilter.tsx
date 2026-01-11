'use client'

import { IoChevronDown } from 'react-icons/io5'

export type ReviewSortType = 'latest' | 'oldest' | 'rating-high' | 'rating-low'

interface ReviewFilterProps {
  photoReviewCount: number
  photoOnly: boolean
  onPhotoOnlyChange: (value: boolean) => void
  selectedRating: number | null
  onRatingChange: (rating: number | null) => void
  onSortTypeChange: (sortType: ReviewSortType) => void
}

export default function ReviewFilter({
  photoReviewCount,
  photoOnly,
  onPhotoOnlyChange,
  selectedRating,
  onRatingChange,
  onSortTypeChange,
}: ReviewFilterProps) {
  return (
    <div className="flex flex-col gap-4 pb-4 border-b border-[#eeeeee]">
      {/* 포토리뷰 체크박스 및 정렬 */}
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <button
            type="button"
            onClick={() => onPhotoOnlyChange(!photoOnly)}
            className={`relative w-[49px] h-[49px] rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              photoOnly ? 'bg-[#a91201] border-[#a91201]' : 'bg-white border-[#dddddd]'
            }`}
          >
            {photoOnly && (
              <svg
                width="27"
                height="20"
                viewBox="0 0 27 20"
                fill="none"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <path
                  d="M1 10L9 18L26 1"
                  stroke="#dddddd"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <span className="text-[28px] leading-[60px] text-[#333333]">
            포토리뷰 ({photoReviewCount})
          </span>
        </label>
        <div className="flex-1" />
        <button
          onClick={() => onSortTypeChange('latest')}
          className="flex items-center gap-1 text-[24px] leading-[60px] text-[#333333]"
        >
          최신순
          <IoChevronDown className="w-[20px] h-[12px] rotate-180" />
        </button>
      </div>

      {/* 평점 필터 */}
      <div className="flex gap-2 overflow-x-auto">
        <button
          onClick={() => onRatingChange(null)}
          className={`flex-shrink-0 w-[120px] h-[80px] rounded-[2px] border-2 text-[28px] leading-[60px] font-bold ${
            selectedRating === null
              ? 'border-[#a91201] text-[#a11420] bg-white'
              : 'border-[#eeeeee] text-[#aaaaaa] bg-white'
          }`}
        >
          전체
        </button>
        {[1, 2, 3, 4].map((rating) => (
          <button
            key={rating}
            onClick={() => onRatingChange(rating)}
            className={`flex-shrink-0 w-[120px] h-[80px] rounded-[2px] border-2 text-[28px] leading-[60px] ${
              selectedRating === rating
                ? 'border-[#a91201] text-[#a11420] bg-white font-bold'
                : 'border-[#eeeeee] text-[#aaaaaa] bg-white'
            }`}
          >
            {rating}점
          </button>
        ))}
      </div>
    </div>
  )
}
