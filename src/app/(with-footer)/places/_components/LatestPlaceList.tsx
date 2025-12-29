import {
  PlaceCard,
  PlaceCardContent,
  PlaceCardHeader,
  PlaceCardImage,
  PlaceCardName,
  PlaceCardRating,
  PlaceCardSkeleton,
  PlaceCardStation,
  PlaceCardStats,
  PlaceCardTags,
} from '@/components/places/PlaceCard'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { PagedApiResponse } from '@/types/api/api'
import { LatestPlace, LatestPlaceQuery } from '@/types/api/place'

export function LatestPlaceListSkeleton() {
  return (
    <ul className="grid grid-cols-2 gap-x-[15px] gap-y-10">
      {[...Array(4)].map((_, i) => (
        <li key={i}>
          <PlaceCardSkeleton />
        </li>
      ))}
    </ul>
  )
}

export default async function LatestPlaceList() {
  const query = {
    params: {
      page: 0,
      size: 10,
    } satisfies LatestPlaceQuery,
  }

  const { data, error } = await api.get<PagedApiResponse<LatestPlace>>(
    API_ENDPOINTS.PLACES_LATEST,
    query,
  )

  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data || !data?.success || !data.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('플레이스')} />
  }

  return (
    <ul className="grid grid-cols-2 gap-x-[15px] gap-y-10">
      {data.data.map((place) => (
        <li key={place.id}>
          <PlaceCard placeId={place.id}>
            <PlaceCardImage src={place.imageUrl} alt={place.name} />
            <PlaceCardContent>
              <PlaceCardHeader>
                <PlaceCardStation>{place.stationName}</PlaceCardStation>
                <PlaceCardRating value={place.rating} />
              </PlaceCardHeader>
              <PlaceCardName>{place.name}</PlaceCardName>
              <PlaceCardStats reviewCount={0} favoriteCount={0} />
              <PlaceCardTags tags={place.tags} variant="secondary" />
            </PlaceCardContent>
          </PlaceCard>
        </li>
      ))}
    </ul>
  )
}
