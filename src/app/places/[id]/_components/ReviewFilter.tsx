'use client'

import { BsCheckLg } from 'react-icons/bs'
import { FiChevronDown } from 'react-icons/fi'

export type ReviewSortType = 'recommended' | 'latest'

interface ReviewFilterProps {
  photoReviewCount: number
  photoOnly: boolean
  onPhotoOnlyChange: (value: boolean) => void
  selectedRating: number | null
  onRatingChange: (rating: number | null) => void
  sortType: ReviewSortType
  onSortTypeChange: (sortType: ReviewSortType) => void
}

export default function ReviewFilter({
  photoReviewCount,
  photoOnly,
  onPhotoOnlyChange,
  selectedRating,
  onRatingChange,
  sortType,
  onSortTypeChange,
}: ReviewFilterProps) {
  return (
    <div className="flex flex-col gap-[30px] pb-2.5 border-b border-[#eeeeee] box-border">
      <div className="flex gap-2.5">
        <button
          onClick={() => onRatingChange(null)}
          className={`px-[21px] py-[14px] bg-white text-sm leading-[14px] border-1 box-border rounded-[1px] cursor-pointer ${
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
            className={`px-[21px] py-[14px] bg-white text-sm leading-[14px] border-1 box-border rounded-[1px] cursor-pointer ${
              selectedRating === rating
                ? 'text-[#a11420] font-bold border-main'
                : 'text-[#aaaaaa] border-[#eeeeee]'
            }`}
          >
            {rating}점
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <button
            type="button"
            onClick={() => onPhotoOnlyChange(!photoOnly)}
            className="w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
          >
            <div
              className={`w-[25px] h-[25px] rounded-full flex items-center justify-center ${
                photoOnly ? 'bg-main' : 'border-[1.5px] border-[#dddddd] box-border'
              }`}
            >
              <BsCheckLg size={20} className={photoOnly ? 'text-white' : 'text-[#dddddd]'} />
            </div>
          </button>
          <span className="text-sm leading-[14px]">포토리뷰 ({photoReviewCount})</span>
        </label>
        <div className="flex items-center gap-1.5">
          <select
            value={sortType}
            onChange={(e) => onSortTypeChange(e.target.value as ReviewSortType)}
            className="text-xs leading-[20px] appearance-none cursor-pointer focus:outline-none"
          >
            <option value="recommended">추천순</option>
            <option value="latest">최신순</option>
          </select>
          <FiChevronDown size={20} className="pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
