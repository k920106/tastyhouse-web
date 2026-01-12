'use client'

import { SlCheck } from 'react-icons/sl'

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
    <div className="flex flex-col gap-4 pb-4 border-b border-[#eeeeee] box-border">
      <div className="flex gap-2.5">
        <button
          onClick={() => onRatingChange(null)}
          className={`px-[21px] py-[14px] bg-white text-sm leading-[14px] border-1 box-border rounded-[1px] ${
            selectedRating === null
              ? 'text-[#a11420] font-bold border-main'
              : 'text-[#aaaaaa] border-[#eeeeee]'
          }`}
        >
          전체
        </button>
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => onRatingChange(rating)}
            className={`px-[21px] py-[14px] bg-white text-sm leading-[14px] border-1 box-border rounded-[1px] ${
              selectedRating === rating
                ? 'text-[#a11420] font-bold border-main'
                : 'text-[#aaaaaa] border-[#eeeeee]'
            }`}
          >
            {rating}점
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <button
            type="button"
            onClick={() => onPhotoOnlyChange(!photoOnly)}
            className={`relative w-[49px] h-[49px] flex items-center justify-center flex-shrink-0
            }`}
          >
            {/* {photoOnly && (
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
            )} */}
            <SlCheck size={24} className={photoOnly ? 'text-[#dddddd]' : 'text-main'} />
          </button>
          <span className="text-[28px] leading-[60px] text-[#333333]">
            포토리뷰 ({photoReviewCount})
          </span>
        </label>
        {/* <div className="flex-1" /> */}
        {/* <button
          onClick={() => onSortTypeChange('latest')}
          className="flex items-center gap-1 text-[24px] leading-[60px] text-[#333333]"
        >
          최신순
          <IoChevronDown className="w-[20px] h-[12px] rotate-180" />
        </button> */}
      </div>
    </div>
  )
}
