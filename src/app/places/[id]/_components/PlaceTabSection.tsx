'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import PlaceInfo from './PlaceInfo'
import PlaceMenus from './PlaceMenus'
import PlacePhotos from './PlacePhotos'

type TabValue = 'info' | 'menu' | 'photo'

interface PlaceTabSectionProps {
  placeId: number
  initialTab: TabValue
}

export default function PlaceTabSection({ placeId, initialTab }: PlaceTabSectionProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleTabChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams()
      params.set('tab', value)

      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname],
  )

  return (
    <Tabs value={initialTab} onValueChange={handleTabChange} className="w-full">
      <div className="sticky top-[60px] z-40 bg-white border-b border-[#eeeeee]">
        <TabsList className="w-full h-auto p-0 bg-transparent rounded-none">
          <TabsTrigger
            value="info"
            className="flex-1 py-4 text-[15px] data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black text-[#999999] border-b-2 border-transparent rounded-none cursor-pointer"
          >
            정보
          </TabsTrigger>
          <TabsTrigger
            value="menu"
            className="flex-1 py-4 text-[15px] data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black text-[#999999] border-b-2 border-transparent rounded-none cursor-pointer"
          >
            메뉴
          </TabsTrigger>
          <TabsTrigger
            value="photo"
            className="flex-1 py-4 text-[15px] data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black text-[#999999] border-b-2 border-transparent rounded-none cursor-pointer"
          >
            포토
          </TabsTrigger>
          {/* <TabsTrigger
            value="review"
            className="flex-1 py-4 text-[15px] data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black text-[#999999] border-b-2 border-transparent rounded-none cursor-pointer"
          >
            리뷰 (
            {reviewStatistics.totalReviewCount > 99 ? '99+' : reviewStatistics.totalReviewCount})
          </TabsTrigger> */}
        </TabsList>
      </div>

      <div className="px-4">
        <TabsContent value="info" className="mt-0">
          <PlaceInfo placeId={placeId} />
        </TabsContent>
        <TabsContent value="menu" className="mt-0">
          <PlaceMenus placeId={placeId} />
        </TabsContent>
        <TabsContent value="photo" className="mt-0">
          <PlacePhotos placeId={placeId} />
        </TabsContent>
        {/* <TabsContent value="review" className="mt-0">
          <PlaceReviews reviews={reviews} statistics={reviewStatistics} />
        </TabsContent> */}
      </div>
    </Tabs>
  )
}
