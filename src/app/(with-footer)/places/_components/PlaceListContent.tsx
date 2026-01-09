'use client'

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
import { getPlaceFoodTypeName } from '@/constants/place'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getLatestPlaces } from '@/services/place'
import type { PlaceAmenityCode, PlaceFilterParams, PlaceFoodType } from '@/types/api/place'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import PlaceFilterBar from './PlaceFilterBar'

const PAGE_SIZE = 6

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

function LoadingIndicator() {
  return (
    <>
      {[...Array(2)].map((_, i) => (
        <li key={`loading-${i}`}>
          <PlaceCardSkeleton />
        </li>
      ))}
    </>
  )
}

interface PlaceListItemProps {
  id: number
  name: string
  imageUrl: string
  stationName: string
  rating: number
  reviewCount: number
  bookmarkCount: number
  foodTypes: PlaceFoodType[]
}

function PlaceListItem({
  id,
  name,
  imageUrl,
  stationName,
  rating,
  reviewCount,
  bookmarkCount,
  foodTypes,
}: PlaceListItemProps) {
  const foodTypeNames = foodTypes.map((foodType) => getPlaceFoodTypeName(foodType))

  return (
    <li key={id}>
      <PlaceCard placeId={id}>
        <PlaceCardImage src={imageUrl} alt={name} />
        <PlaceCardContent>
          <PlaceCardHeader>
            <PlaceCardStation>{stationName}</PlaceCardStation>
            <PlaceCardRating value={rating} />
          </PlaceCardHeader>
          <PlaceCardName>{name}</PlaceCardName>
          <PlaceCardStats reviewCount={reviewCount} bookmarkCount={bookmarkCount} />
          <PlaceCardTags tags={foodTypeNames} variant="secondary" />
        </PlaceCardContent>
      </PlaceCard>
    </li>
  )
}

interface PlaceListContentProps {
  stationId: number | null
  foodTypes: PlaceFoodType[] | null
  amenities: PlaceAmenityCode[] | null
}

export default function PlaceListContent({
  stationId,
  foodTypes,
  amenities,
}: PlaceListContentProps) {
  const filterParams: PlaceFilterParams = {
    stationId,
    foodTypes,
    amenities,
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['places', 'latest', filterParams],
      queryFn: ({ pageParam }) =>
        getLatestPlaces({
          page: pageParam,
          size: PAGE_SIZE,
          ...filterParams,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const { page, totalPages } = lastPage.pagination
        return page + 1 < totalPages ? page + 1 : undefined
      },
    })

  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    enabled: hasNextPage && !isFetchingNextPage,
  })

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) {
    return <PlaceListContentSkeleton />
  }

  if (isError) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('플레이스')} />
  }

  const places = data.pages.flatMap((page) => page.data)
  const totalCount = data.pages[0]?.pagination.totalElements ?? 0

  return (
    <>
      <PlaceFilterBar
        totalCount={totalCount}
        stationId={stationId}
        foodTypes={foodTypes}
        amenities={amenities}
      />
      <ul className="grid grid-cols-2 gap-x-[15px] gap-y-10">
        {places.map((place) => (
          <PlaceListItem
            key={place.id}
            id={place.id}
            name={place.name}
            imageUrl={place.imageUrl}
            stationName={place.stationName}
            rating={place.rating}
            reviewCount={place.reviewCount}
            bookmarkCount={place.bookmarkCount}
            foodTypes={place.foodTypes}
          />
        ))}
        {isFetchingNextPage && <LoadingIndicator />}
      </ul>
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </>
  )
}
