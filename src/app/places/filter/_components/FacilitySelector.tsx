'use client'

import { AmenityListItem } from '@/types/api/place'
import Image from 'next/image'

interface FacilitySelectorProps {
  amenities: AmenityListItem[]
  selectedAmenities: string[]
  onToggle: (id: string) => void
}

export default function FacilitySelector({
  amenities,
  selectedAmenities,
  onToggle,
}: FacilitySelectorProps) {
  return (
    <section className="px-4 py-5 bg-white border-y border-[#eeeeee] box-border">
      <h2 className="mb-[15px] text-sm leading-[14px]">편의시설</h2>
      <div className="grid grid-cols-4 gap-2">
        {amenities.map((amenity) => {
          const isSelected = selectedAmenities.includes(amenity.code)
          return (
            <button
              key={amenity.code}
              onClick={() => onToggle(amenity.code)}
              className={`flex flex-col items-center justify-center border ${
                isSelected ? 'border-main' : 'border-[#eeeeee]'
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
    </section>
  )
}
