import type { PlaceAmenityCode, PlaceFoodType } from '@/types/api/place'
import PlaceListContent from './PlaceListContent'

interface PlaceListSectionProps {
  stationId: number | null
  foodTypes: PlaceFoodType[] | null
  amenities: PlaceAmenityCode[] | null
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
