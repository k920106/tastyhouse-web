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
import { PlaceListItem, PlaceListQuery } from '@/types/api/place'
import PlaceFilterBar from './PlaceFilterBar'

export function PlaceListContentSkeleton() {
  return (
    <div>
      <PlaceFilterBar totalCount={0} isLoading />
      <ul className="mt-5 grid grid-cols-2 gap-x-[15px] gap-y-10">
        {[...Array(4)].map((_, i) => (
          <li key={i}>
            <PlaceCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function PlaceListContent() {
  const query = {
    params: {
      page: 0,
      size: 6,
    } satisfies PlaceListQuery,
  }

  const { data, error } = await api.get<PagedApiResponse<PlaceListItem>>(
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
    <>
      <PlaceFilterBar totalCount={data.pagination.totalElements} />
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
                <PlaceCardStats
                  reviewCount={place.reviewCount}
                  bookmarkCount={place.bookmarkCount}
                />
                <PlaceCardTags tags={place.tags} variant="secondary" />
              </PlaceCardContent>
            </PlaceCard>
          </li>
        ))}
      </ul>
    </>
  )
}
