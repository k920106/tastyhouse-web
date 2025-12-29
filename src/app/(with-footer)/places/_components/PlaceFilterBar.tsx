'use client'

import { BiFilterAlt } from 'react-icons/bi'

interface PlaceFilterBarProps {
  totalCount: number
}

export default function PlaceFilterBar({ totalCount }: PlaceFilterBarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm leading-[14px]">총 {totalCount}개</div>
      <div className="flex items-center gap-2.5">
        <button>
          <BiFilterAlt size={20} />
        </button>
      </div>
    </div>
  )
}
