'use client'

import { BiFilterAlt } from 'react-icons/bi'

interface PlaceFilterBarProps {
  totalCount: number
  isLoading?: boolean
}

export default function PlaceFilterBar({ totalCount, isLoading }: PlaceFilterBarProps) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="text-sm leading-[14px]">
        {isLoading ? (
          <span className="inline-block h-[14px] w-12 animate-pulse rounded bg-gray-200" />
        ) : (
          `총 ${totalCount}개`
        )}
      </div>
      <div className="flex items-center gap-2.5">
        <button>
          <BiFilterAlt size={20} />
        </button>
      </div>
    </div>
  )
}
