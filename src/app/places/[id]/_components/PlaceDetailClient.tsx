'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import { formatDecimal } from '@/lib/number'
import {
  PlaceInfoResponse,
  PlaceMenuResponse,
  PlacePhotoResponse,
  PlaceReviewResponse,
  PlaceReviewStatisticsResponse,
  PlaceThumbnailResponse,
} from '@/types/api/place-detail'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiCopy } from 'react-icons/bi'
import { FiBookmark } from 'react-icons/fi'
import { MdLocationOn } from 'react-icons/md'
import { PlaceInfo } from './PlaceInfo'
import { PlaceMenus } from './PlaceMenus'
import { PlacePhotos } from './PlacePhotos'
import { PlaceReviews } from './PlaceReviews'

interface PlaceDetailClientProps {
  placeInfo: PlaceInfoResponse
  thumbnails: PlaceThumbnailResponse[]
  menus: PlaceMenuResponse[]
  photos: PlacePhotoResponse[]
  reviews: PlaceReviewResponse[]
  reviewStatistics: PlaceReviewStatisticsResponse
}

export function PlaceDetailClient({
  placeInfo,
  thumbnails,
  menus,
  photos,
  reviews,
  reviewStatistics,
}: PlaceDetailClientProps) {
  const router = useRouter()
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleCopyAddress = () => {
    if (placeInfo.roadAddress) {
      navigator.clipboard.writeText(placeInfo.roadAddress)
    }
  }

  const mainThumbnail = thumbnails[0]?.imageUrl || '/images/sample/place-sample-02.jpg'

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Image */}
      <div className="relative w-full aspect-[16/9]">
        <Image src={mainThumbnail} alt={placeInfo.name} fill className="object-cover" />
      </div>

      {/* Place Info */}
      <div className="px-4 py-5 border-b-[6px] border-[#f5f5f5] relative">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-[19px]">{placeInfo.name}</h2>
          <span className="text-[26px] text-main">{formatDecimal(placeInfo.rating, 1)}</span>
        </div>

        <div className="mb-3">
          <div className="flex items-start gap-1 text-[15px] leading-[1.6] mb-1">
            <MdLocationOn size={18} className="text-main mt-0.5 flex-shrink-0" />
            <span>{placeInfo.roadAddress || placeInfo.lotAddress || '주소 정보 없음'}</span>
            <button onClick={handleCopyAddress} className="p-1 -mr-1">
              <BiCopy size={16} className="text-main" />
            </button>
          </div>
          {placeInfo.lotAddress && placeInfo.roadAddress && (
            <div className="text-[13px] text-[#999999] pl-[19px]">
              [지번] {placeInfo.lotAddress}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-[13px]">
          <button className="flex items-center gap-1 text-main">
            <MdLocationOn size={16} />
            <span>지도</span>
          </button>
          <button onClick={handleCopyAddress} className="flex items-center gap-1 text-main">
            <BiCopy size={16} />
            <span>복사</span>
          </button>
        </div>

        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="absolute top-5 right-4 p-2 bg-white rounded-full shadow-md"
        >
          <FiBookmark size={24} className={isBookmarked ? 'fill-main text-main' : ''} />
        </button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="info" className="w-full">
        <div className="sticky top-[60px] z-40 bg-white border-b border-[#eeeeee]">
          <TabsList className="w-full h-auto p-0 bg-transparent rounded-none">
            <TabsTrigger
              value="info"
              className="flex-1 py-4 text-[15px] data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black text-[#999999] border-b-2 border-transparent rounded-none"
            >
              정보
            </TabsTrigger>
            <TabsTrigger
              value="menu"
              className="flex-1 py-4 text-[15px] data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black text-[#999999] border-b-2 border-transparent rounded-none"
            >
              메뉴
            </TabsTrigger>
            <TabsTrigger
              value="photo"
              className="flex-1 py-4 text-[15px] data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black text-[#999999] border-b-2 border-transparent rounded-none"
            >
              포토
            </TabsTrigger>
            <TabsTrigger
              value="review"
              className="flex-1 py-4 text-[15px] data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black text-[#999999] border-b-2 border-transparent rounded-none"
            >
              리뷰 (
              {reviewStatistics.totalReviewCount > 99 ? '99+' : reviewStatistics.totalReviewCount})
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="px-4">
          <TabsContent value="info" className="mt-0">
            <PlaceInfo placeInfo={placeInfo} />
          </TabsContent>

          <TabsContent value="menu" className="mt-0">
            <PlaceMenus menus={menus} />
          </TabsContent>

          <TabsContent value="photo" className="mt-0">
            <PlacePhotos photos={photos} />
          </TabsContent>

          <TabsContent value="review" className="mt-0">
            <PlaceReviews reviews={reviews} statistics={reviewStatistics} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
