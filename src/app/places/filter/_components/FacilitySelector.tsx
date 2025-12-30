'use client'

import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { AmenityListItem } from '@/types/api/place'
import Image from 'next/image'
import { useFilterState } from './FilterStateProvider'

export function FacilitySelectorSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center border border-[#eeeeee] px-5 py-[17px]"
          style={{ aspectRatio: '80 / 95' }}
        >
          <Skeleton className="w-[38px] h-[38px] mb-[15px]" />
          <Skeleton className="w-12 h-3" />
        </div>
      ))}
    </div>
  )
}

interface FacilitySelectorProps {
  amenities: AmenityListItem[]
}

export default function FacilitySelector({ amenities }: FacilitySelectorProps) {
  const { selectedAmenities, toggleAmenity } = useFilterState()

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {amenities.map((amenity) => {
        const isSelected = selectedAmenities.includes(amenity.code)
        return (
          <button
            key={amenity.code}
            onClick={() => toggleAmenity(amenity.code)}
            className={`flex flex-col items-center justify-center border ${
              isSelected ? 'bg-[#f8f5f4] border-main' : 'border-[#eeeeee]'
            } px-5 py-[17px]`}
            style={{ aspectRatio: '80 / 95' }}
          >
            <div className="relative flex items-center justify-center w-full h-12 mb-[15px]">
              <Image
                src={isSelected ? amenity.imageUrlOn : amenity.imageUrlOff}
                alt={amenity.name}
                width={32}
                height={25}
                className="object-contain max-w-full max-h-full"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <span
              className={`text-xs leading-[12px] whitespace-nowrap ${isSelected ? 'text-main' : 'text-[#cccccc] opacity-50'}`}
            >
              {amenity.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
