import type { Amenity, FoodType } from '@/types/api/place'
import PlaceListContent from './PlaceListContent'

interface PlaceListSectionProps {
  stationId: number | null
  foodTypes: FoodType[] | null
  amenities: Amenity[] | null
}

export default function PlaceListSection({
  stationId,
  foodTypes,
  amenities,
}: PlaceListSectionProps) {
  return (
    <section>
      <PlaceListContent stationId={stationId} foodTypes={foodTypes} amenities={amenities} />
    </section>
  )
}
