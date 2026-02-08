'use client'

import Image from 'next/image'
import { IoBookmark } from 'react-icons/io5'

interface MyPagePlaceCardProps {
  placeImage: string
  region: string
  placeName: string
  rating: number
}

export default function MyPagePlaceCard({
  placeImage,
  region,
  placeName,
  rating,
}: MyPagePlaceCardProps) {
  return (
    <div className="bg-white border-b border-gray-100 px-4 py-4">
      <div className="flex gap-4">
        <div className="relative w-[100px] h-[100px] rounded-lg overflow-hidden flex-shrink-0">
          <Image src={placeImage} alt={placeName} fill className="object-cover" />
        </div>
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <p className="text-[13px] text-gray-500 mb-1">{region}</p>
            <p className="text-[16px] font-bold mb-2">{placeName}</p>
          </div>
          <p className="text-[20px] font-bold text-main">{rating.toFixed(1)}</p>
        </div>
        <div className="flex items-start pt-1">
          <IoBookmark size={24} className="text-main" />
        </div>
      </div>
    </div>
  )
}
