'use client'

import { PlaceImageCategory, PlacePhotoResponse } from '@/types/api/place-detail'
import Image from 'next/image'
import { useState } from 'react'

interface PlacePhotosProps {
  photos: PlacePhotoResponse[]
}

const CATEGORY_LABELS: Record<string, string> = {
  EXTERIOR: '가게 외관',
  INTERIOR: '가게 내부',
  FOOD: '음식',
  OTHER: '기타',
}

export function PlacePhotos({ photos }: PlacePhotosProps) {
  const [selectedCategory, setSelectedCategory] = useState<PlaceImageCategory | 'ALL'>('ALL')

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
      {/* Category Filter */}
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
            onClick={() => setSelectedCategory(category as PlaceImageCategory)}
            className={`px-4 py-2 text-[13px] rounded-full border whitespace-nowrap ${
              selectedCategory === category
                ? 'border-main text-main'
                : 'border-[#eeeeee] text-[#666666]'
            }`}
          >
            {CATEGORY_LABELS[category] || category} ({photosByCategory[category].length})
          </button>
        ))}
      </div>

      {/* Photo Grid */}
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
