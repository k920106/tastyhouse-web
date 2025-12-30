import FacilitySection from './_components/FacilitySection'
import FilterApplyButtonWrapper from './_components/FilterApplyButtonWrapper'
import FilterHeaderWrapper from './_components/FilterHeaderWrapper'
import FilterStateProvider from './_components/FilterStateProvider'
import FoodTypeSection from './_components/FoodTypeSection'
import StationSection from './_components/StationSection'

export default async function PlaceFilterPage() {
  return (
    <FilterStateProvider>
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
