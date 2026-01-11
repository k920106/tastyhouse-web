'use client'

import { FacilityButton, FacilityItemSkeleton } from '@/components/places/FacilityItem'
import { PlaceAmenityListItem } from '@/types/api/place'
import { useFilterState } from './FilterStateProvider'

export function FacilitySelectorSkeleton() {
  return (
    <FacilitySelectorLayout>
      {Array.from({ length: 8 }).map((_, i) => (
        <FacilityItemSkeleton key={i} />
      ))}
    </FacilitySelectorLayout>
  )
}

interface FacilitySelectorProps {
  amenities: PlaceAmenityListItem[]
}

export default function FacilitySelector({ amenities }: FacilitySelectorProps) {
  const { selectedAmenities, toggleAmenity } = useFilterState()

  return (
    <FacilitySelectorLayout>
      {amenities.map((amenity) => {
        const isSelected = selectedAmenities.includes(amenity.code)
        return (
          <FacilityButton
            key={amenity.code}
            amenity={amenity}
            isSelected={isSelected}
            onClick={() => toggleAmenity(amenity.code)}
          />
        )
      })}
    </FacilitySelectorLayout>
  )
}

export function FacilitySelectorLayout({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-4 gap-2.5">{children}</div>
}
