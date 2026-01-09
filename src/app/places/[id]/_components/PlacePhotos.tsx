'use client'

import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { getPlaceImageCategoryCodeName } from '@/constants/place'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getPlacePhotos } from '@/services/place'
import { PlaceImageCategoryCode } from '@/types/api/place'
import { PlacePhotoResponse } from '@/types/api/place-detail'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'

export function PlacePhotosSkeleton() {
  return (
    <div className="py-6">
      <div className="flex gap-2 mb-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-9 w-20 rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-lg" />
        ))}
      </div>
    </div>
  )
}

interface PlacePhotosProps {
  placeId: number
}

function PlacePhotosContent({ photos }: { photos: PlacePhotoResponse[] }) {
  const [selectedCategory, setSelectedCategory] = useState<PlaceImageCategoryCode | 'ALL'>('ALL')

  // 카테고리별로 사진 그룹화
  const photosByCategory = photos.reduce(
    (acc, photo) => {
      const category = photo.categoryCode || 'OTHER'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(photo)
      return acc
    },
    {} as Record<string, PlacePhotoResponse[]>,
  )

  const filteredPhotos =
    selectedCategory === 'ALL' ? photos : photosByCategory[selectedCategory] || []

  return (
    <div className="py-6">
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setSelectedCategory('ALL')}
          className={`px-4 py-2 text-[13px] rounded-full border whitespace-nowrap ${
            selectedCategory === 'ALL' ? 'border-main text-main' : 'border-[#eeeeee] text-[#666666]'
          }`}
        >
          전체
        </button>
        {Object.keys(photosByCategory).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category as PlaceImageCategoryCode)}
            className={`px-4 py-2 text-[13px] rounded-full border whitespace-nowrap ${
              selectedCategory === category
                ? 'border-main text-main'
                : 'border-[#eeeeee] text-[#666666]'
            }`}
          >
            {getPlaceImageCategoryCodeName(category as PlaceImageCategoryCode)}{' '}
            {`(${photosByCategory[category].length})`}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={photo.imageUrl}
              alt={photo.categoryName || ''}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {filteredPhotos.length === 0 && (
        <div className="py-12 text-center text-[15px] text-[#999999]">사진이 없습니다</div>
      )}
    </div>
  )
}

export default function PlacePhotos({ placeId }: PlacePhotosProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['place', placeId, 'photos'],
    queryFn: () => getPlacePhotos(placeId),
  })

  if (isLoading) {
    return <PlacePhotosSkeleton />
  }

  if (isError) {
    return (
      <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10 bg-white" />
    )
  }

  if (!data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('사진 정보')}
        className="py-10 bg-white"
      />
    )
  }

  if (data.data.length === 0) {
    return <div className="py-10 bg-white text-center text-sm text-[#aaaaaa]">사진이 없습니다.</div>
  }

  return <PlacePhotosContent photos={data.data} />
}
