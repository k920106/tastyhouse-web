'use client'

import { PAGE_PATHS } from '@/lib/paths'
import { AmenityListItem, FoodTypeListItem, PlaceStation } from '@/types/api/place'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import FacilitySelector from './FacilitySelector'
import FilterApplyButton from './FilterApplyButton'
import FoodCategorySelector from './FoodCategorySelector'
import PlaceFilterHeaderSection from './PlaceFilterHeader'
import StationSelector from './StationSelector'

interface FilterFormProps {
  stations: PlaceStation[]
  foodTypes: FoodTypeListItem[]
  amenities: AmenityListItem[]
}

export default function FilterForm({ stations, foodTypes, amenities }: FilterFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedStationId, setSelectedStationId] = useState<number | undefined>(
    searchParams.get('stationId') ? Number(searchParams.get('stationId')) : undefined,
  )
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>(
    searchParams.get('foodTypes')?.split(',').filter(Boolean) ?? [],
  )
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    searchParams.get('amenities')?.split(',').filter(Boolean) ?? [],
  )

  const handleReset = () => {
    setSelectedStationId(undefined)
    setSelectedFoodTypes([])
    setSelectedAmenities([])
  }

  const toggleFoodType = (id: string) => {
    setSelectedFoodTypes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const handleApplyFilter = () => {
    const params = new URLSearchParams()

    if (selectedStationId) {
      params.set('stationId', selectedStationId.toString())
    }
    if (selectedFoodTypes.length > 0) {
      params.set('foodTypes', selectedFoodTypes.join(','))
    }
    if (selectedAmenities.length > 0) {
      params.set('amenities', selectedAmenities.join(','))
    }

    const queryString = params.toString()
    router.push(`${PAGE_PATHS.PLACES}${queryString ? `?${queryString}` : ''}`)
  }

  const hasSelection = !!selectedStationId || selectedFoodTypes.length > 0

  return (
    <>
      <PlaceFilterHeaderSection onReset={handleReset} />
      <div className="flex flex-col gap-2.5 bg-[#f9f9f9]">
        <StationSelector
          stations={stations}
          selectedStationId={selectedStationId}
          onSelect={setSelectedStationId}
        />
        <FoodCategorySelector
          foodTypes={foodTypes}
          selectedFoodTypes={selectedFoodTypes}
          onToggle={toggleFoodType}
        />
        <FacilitySelector
          amenities={amenities}
          selectedAmenities={selectedAmenities}
          onToggle={toggleAmenity}
        />
      </div>
      <FilterApplyButton hasSelection={hasSelection} onApply={handleApplyFilter} />
    </>
  )
}
