import FacilitySection from './_components/FacilitySection'
import FilterApplyButtonWrapper from './_components/FilterApplyButtonWrapper'
import FilterHeaderWrapper from './_components/FilterHeaderWrapper'
import FilterStateProvider from './_components/FilterStateProvider'
import FoodTypeSection from './_components/FoodTypeSection'
import StationSection from './_components/StationSection'

interface PlaceFilterPageProps {
  searchParams: Promise<{
    stationId?: string
    foodTypes?: string
    amenities?: string
  }>
}

export default async function PlaceFilterPage({ searchParams }: PlaceFilterPageProps) {
  const params = await searchParams
  const stationId = params.stationId ? Number(params.stationId) : undefined
  const foodTypes = params.foodTypes?.split(',').filter(Boolean) ?? []
  const amenities = params.amenities?.split(',').filter(Boolean) ?? []

  return (
    <FilterStateProvider
      initialStationId={stationId}
      initialFoodTypes={foodTypes}
      initialAmenities={amenities}
    >
      <FilterHeaderWrapper />
      <div className="flex flex-col gap-2.5 bg-[#f9f9f9]">
        <StationSection />
        <FoodTypeSection />
        <FacilitySection />
      </div>
      <FilterApplyButtonWrapper />
    </FilterStateProvider>
  )
}
