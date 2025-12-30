'use client'

import { PAGE_PATHS } from '@/lib/paths'
import { useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, createContext, useContext, useState } from 'react'

interface FilterState {
  selectedStationId: number | undefined
  selectedFoodTypes: string[]
  selectedAmenities: string[]
  setSelectedStationId: (id: number | undefined) => void
  toggleFoodType: (id: string) => void
  toggleAmenity: (id: string) => void
  handleReset: () => void
  handleApplyFilter: () => void
  hasSelection: boolean
}

const FilterStateContext = createContext<FilterState | null>(null)

export function useFilterState() {
  const context = useContext(FilterStateContext)
  if (!context) {
    throw new Error('useFilterState must be used within FilterStateProvider')
  }
  return context
}

export default function FilterStateProvider({ children }: { children: ReactNode }) {
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

  const hasSelection =
    !!selectedStationId || selectedFoodTypes.length > 0 || selectedAmenities.length > 0

  return (
    <FilterStateContext.Provider
      value={{
        selectedStationId,
        selectedFoodTypes,
        selectedAmenities,
        setSelectedStationId,
        toggleFoodType,
        toggleAmenity,
        handleReset,
        handleApplyFilter,
        hasSelection,
      }}
    >
      {children}
    </FilterStateContext.Provider>
  )
}
