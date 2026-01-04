import {
  PlaceCard,
  PlaceCardContent,
  PlaceCardHeader,
  PlaceCardImage,
  PlaceCardName,
  PlaceCardRating,
  PlaceCardSkeleton,
  PlaceCardStation,
  PlaceCardTags,
} from '@/components/places/PlaceCard'
import ErrorMessage from '@/components/ui/ErrorMessage'
import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { getFoodCategoryName } from '@/constants/place'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { BestPlace, BestPlaceQuery } from '@/types/api/place'

export function BestPlaceListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 mb-[25px]">
      {[...Array(4)].map((_, i) => (
        <PlaceCardSkeleton key={i} />
      ))}
    </div>
  )
}

function PlaceListItem({ place }: { place: BestPlace }) {
  const foodTypeNames = place.foodTypes.map((foodType) => getFoodCategoryName(foodType))

  return (
    <li key={place.id}>
      <PlaceCard placeId={place.id}>
        <PlaceCardImage src={place.imageUrl} alt={place.name} />
        <PlaceCardContent>
          <PlaceCardHeader>
            <PlaceCardStation>{place.stationName}</PlaceCardStation>
            <PlaceCardRating value={place.rating} />
          </PlaceCardHeader>
          <PlaceCardName>{place.name}</PlaceCardName>
          <PlaceCardTags tags={foodTypeNames} />
        </PlaceCardContent>
      </PlaceCard>
    </li>
  )
}

export default async function BestPlaceList() {
  // API 호출
  const query = {
    params: {
      page: 0,
      size: 4,
    } satisfies BestPlaceQuery,
  }
  const { data, error } = await api.get<ApiResponse<BestPlace[]>>(API_ENDPOINTS.PLACES_BEST, query)

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data.success || !data.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('플레이스')} />
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-[15px] gap-y-10 mb-10">
        {data.data.map((place) => (
          <PlaceListItem key={place.id} place={place} />
        ))}
      </ul>
      <div className="flex justify-center">
        <ViewMoreButton href="/places/best-places" />
      </div>
    </>
  )
}
