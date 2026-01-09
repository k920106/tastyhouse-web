'use client'

import { FacilityButton } from '@/components/places/FacilityItem'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { PlaceAmenity } from '@/types/api/place'
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
  amenities: PlaceAmenity[]
}

export default function FacilitySelector({ amenities }: FacilitySelectorProps) {
  const { selectedAmenities, toggleAmenity } = useFilterState()

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {amenities.map((amenity) => (
        <FacilityButton
          key={amenity.code}
          amenity={amenity}
          isSelected={selectedAmenities.includes(amenity.code)}
          onClick={() => toggleAmenity(amenity.code)}
        />
      ))}
    </div>
  )
}
