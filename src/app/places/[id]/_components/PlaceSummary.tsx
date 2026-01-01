'use client'

import { formatDecimal } from '@/lib/number'
import { PlaceSummaryResponse } from '@/types/api/place-detail'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { GrCopy } from 'react-icons/gr'
import { TfiLocationPin } from 'react-icons/tfi'

interface PlaceSummaryProps {
  placeSummary: PlaceSummaryResponse
}

export default function PlaceSummary({ placeSummary }: PlaceSummaryProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleCopyAddress = () => {
    if (placeSummary.roadAddress) {
      navigator.clipboard.writeText(placeSummary.roadAddress)
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    router.push(`${pathname}?bookmark=${isBookmarked}`)
  }

  return (
    <>
      <div className="flex items-start justify-between mb-5">
        <h2 className="text-lg leading-[18px]">{placeSummary.name}</h2>
        <span className="text-[19px] leading-[18px] text-main">
          {formatDecimal(placeSummary.rating, 1)}
        </span>
      </div>
      <div className="flex justify-between gap-3">
        <div className="flex-1 flex flex-col gap-[7px] min-w-0">
          <div className="text-sm leading-relaxed line-clamp-2">{placeSummary.roadAddress}</div>
          <div className="relative text-xs leading-[12px] text-[#aaaaaa]">
            <span>[지번] {placeSummary.lotAddress}</span>
            <div className="absolute top-0 right-0 flex gap-[11px]">
              <Link href={`/places/${placeSummary.id}/map`} className="flex items-center gap-[3px]">
                <TfiLocationPin size={12} className="text-main" />
                <span className="text-xs leading-[12px] text-main">지도</span>
              </Link>
              <button
                className="flex items-center gap-[3px] cursor-pointer"
                onClick={handleCopyAddress}
              >
                <GrCopy size={12} className="text-main" />
                <span className="text-xs leading-[12px] text-main">복사</span>
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={handleBookmark}
          className={`flex items-center justify-center w-[35px] h-[35px] shrink-0 border rounded-full cursor-pointer ${isBookmarked ? 'border-main' : 'border-[#eeeeee]'}`}
        >
          {isBookmarked ? (
            <FaBookmark size={16} className="text-main" />
          ) : (
            <FaRegBookmark size={16} className="text-[#eeeeee]" />
          )}
        </button>
      </div>
    </>
  )
}
