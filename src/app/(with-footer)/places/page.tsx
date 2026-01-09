import type { PlaceAmenityCode, PlaceFoodType } from '@/types/api/place'
import PlaceListSection from './_components/PlaceListSection'

interface PlacePageProps {
  searchParams: Promise<{
    stationId?: string
    foodTypes?: string
    amenities?: string
  }>
}

export default async function PlacePage({ searchParams }: PlacePageProps) {
  const params = await searchParams

  const stationId = params.stationId ? Number(params.stationId) : null
  const foodTypes = params.foodTypes?.split(',').filter(Boolean) as PlaceFoodType[] | null
  const amenities = params.amenities?.split(',').filter(Boolean) as PlaceAmenityCode[] | null

  return <PlaceListSection stationId={stationId} foodTypes={foodTypes} amenities={amenities} />
}
