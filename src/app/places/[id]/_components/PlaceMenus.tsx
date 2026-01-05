'use client'

import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { formatDecimal } from '@/lib/number'
import { getPlaceMenus } from '@/services/place'
import { PlaceMenuResponse } from '@/types/api/place-detail'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

export function PlaceMenusSkeleton() {
  return (
    <div className="py-6 space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex gap-3">
          <Skeleton className="w-[100px] h-[100px] rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

interface PlaceMenusProps {
  placeId: number
}

function PlaceMenusContent({ menus }: { menus: PlaceMenuResponse[] }) {
  return (
    <div className="py-6">
      <h3 className="mb-4 text-[17px]">대표 메뉴</h3>
      <div className="space-y-4">
        {menus.map((menu) => (
          <div key={menu.id} className="flex gap-3 pb-4 border-b border-[#eeeeee] last:border-0">
            <div className="relative w-[100px] h-[100px] flex-shrink-0 rounded-lg overflow-hidden">
              <Image src={menu.imageUrl} alt={menu.name} fill className="object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <h4 className="mb-1 text-[15px]">{menu.name}</h4>
                <div className="flex items-center gap-2 text-[13px]">
                  <span className="text-[17px]">
                    {(menu.discountPrice ?? menu.originalPrice).toLocaleString()}원
                  </span>
                  {menu.discountRate && (
                    <>
                      <span className="text-[#999999] line-through">
                        {menu.originalPrice.toLocaleString()}원
                      </span>
                      <span className="text-main">{menu.discountRate}%</span>
                    </>
                  )}
                </div>
              </div>
              {menu.rating && menu.reviewCount && (
                <div className="flex items-center justify-end gap-1">
                  <span className="text-[17px] text-main">{formatDecimal(menu.rating, 1)}</span>
                  <span className="text-[13px] text-[#999999]">리뷰 ({menu.reviewCount})</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button className="w-full py-4 mt-6 text-[15px] text-white bg-main rounded-lg">
        주문하기
      </button>
    </div>
  )
}

export default function PlaceMenus({ placeId }: PlaceMenusProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['place', placeId, 'menus'],
    queryFn: () => getPlaceMenus(placeId),
  })

  if (isLoading) {
    return <PlaceMenusSkeleton />
  }

  if (isError) {
    return (
      <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10 bg-white" />
    )
  }

  if (!data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('메뉴 정보')}
        className="py-10 bg-white"
      />
    )
  }

  if (data.data.length === 0) {
    return <div className="py-10 bg-white text-center text-sm text-[#aaaaaa]">메뉴가 없습니다.</div>
  }

  return <PlaceMenusContent menus={data.data} />
}
