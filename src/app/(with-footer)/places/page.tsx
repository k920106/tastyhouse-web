import LatestPlaceListSection from './_components/LatestPlaceListSection'
import PlaceFilterBar from './_components/PlaceFilterBar'

export default function PlacePage() {
  const totalCount = 127

  return (
    <div className="min-h-screen px-[15px] py-[30px] pb-[80px]">
      <PlaceFilterBar totalCount={totalCount} />
      <LatestPlaceListSection />
    </div>
  )
}
