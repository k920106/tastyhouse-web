import ErrorMessage from '@/components/ui/ErrorMessage'
import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { formatDecimal } from '@/lib/number'
import { PAGE_PATHS } from '@/lib/paths'
import { ApiResponse } from '@/types/api/api'
import { BestPlace } from '@/types/api/place'
import Image from 'next/image'
import Link from 'next/link'

export function BestPlaceListSkeleton() {
  return (
    <>
      <ul className="grid grid-cols-2 gap-3 mb-[25px]">
        {[...Array(4)].map((_, i) => (
          <BestPlaceListSkeletonItem key={i} />
        ))}
      </ul>
    </>
  )
}

export function BestPlaceListSkeletonItem() {
  return (
    <div className="group block overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
      <div className="py-[15px]">
        <div className="flex items-center justify-between mb-1.5">
          <Skeleton className="w-1/4 h-3 mb-5" />
          <Skeleton className="w-1/6 h-[19px]" />
        </div>
        <Skeleton className="h-4 w-3/4 mb-[15px]" />
        <div className="flex gap-1.5 overflow-hidden">
          <Skeleton className="w-1/5 h-[26px] rounded-[14px]" />
        </div>
      </div>
    </div>
  )
}

export default async function BestPlaceList() {
  // API 호출
  const { data, error } = await api.get<ApiResponse<BestPlace[]>>(API_ENDPOINTS.PLACES_BEST, {
    params: {
      page: 0,
      size: 4,
    },
  })

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data?.success || !data.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('장소')} />
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 mb-[25px]">
        {data.data.map((place) => (
          <li key={place.id}>
            <Link href={PAGE_PATHS.PLACE_DETAIL(place.id)} className="group block overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={place.imageUrl}
                  alt={place.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300"
                />
              </div>
              <div className="py-[15px]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs leading-[12px] text-[#999999] truncate">
                    {place.stationName}
                  </span>
                  <span className="text-[19px] leading-[19px] text-main">
                    {formatDecimal(place.rating, 1)}
                  </span>
                </div>
                <h3 className="leading-[16px] mb-[15px] truncate">{place.name}</h3>
                <div className="flex gap-1.5 overflow-hidden">
                  {place.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="flex-shrink-0 inline-block px-2.5 py-[7px] text-xs leading-[12px] text-[#666666] bg-white border border-[#eeeeee] rounded-[14px] whitespace-nowrap"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <ViewMoreButton href="/places/best-places" />
      </div>
    </>
  )
}
