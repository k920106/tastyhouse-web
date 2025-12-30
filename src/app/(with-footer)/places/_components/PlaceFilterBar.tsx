'use client'

import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { BiFilterAlt } from 'react-icons/bi'

interface PlaceFilterBarProps {
  totalCount: number
  isLoading?: boolean
}

export default function PlaceFilterBar({ totalCount, isLoading }: PlaceFilterBarProps) {
  const searchParams = useSearchParams()

  const filterHref = (() => {
    const params = new URLSearchParams()
    const stationId = searchParams.get('stationId')
    const foodTypes = searchParams.get('foodTypes')
    const amenities = searchParams.get('amenities')

    if (stationId) params.set('stationId', stationId)
    if (foodTypes) params.set('foodTypes', foodTypes)
    if (amenities) params.set('amenities', amenities)

    const queryString = params.toString()
    return `${PAGE_PATHS.PLACE_FILTER}${queryString ? `?${queryString}` : ''}`
  })()

  return (
    <div className="flex items-center justify-between mb-5">
      <div className="text-sm leading-[14px]">
        {isLoading ? <Skeleton className="w-12 h-3.5" /> : `총 ${totalCount}개`}
      </div>
      <div className="flex items-center gap-2.5">
        <Link href={filterHref}>
          <BiFilterAlt size={20} />
        </Link>
      </div>
    </div>
  )
}
