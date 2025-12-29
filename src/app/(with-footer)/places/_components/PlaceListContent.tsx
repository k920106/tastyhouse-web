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
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getLatestPlaces } from '@/services/place'
import type { PlaceListItem as PlaceListItemType } from '@/types/api/place'
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

function PlaceListItem({ place }: { place: PlaceListItemType }) {
  return (
    <li>
      <PlaceCard placeId={place.id}>
        <PlaceCardImage src={place.imageUrl} alt={place.name} />
        <PlaceCardContent>
          <PlaceCardHeader>
            <PlaceCardStation>{place.stationName}</PlaceCardStation>
            <PlaceCardRating value={place.rating} />
          </PlaceCardHeader>
          <PlaceCardName>{place.name}</PlaceCardName>
          <PlaceCardStats reviewCount={place.reviewCount} bookmarkCount={place.bookmarkCount} />
          <PlaceCardTags tags={place.tags} variant="secondary" />
        </PlaceCardContent>
      </PlaceCard>
    </li>
  )
}

export default function PlaceListContent() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['places', 'latest'],
      queryFn: ({ pageParam }) =>
        getLatestPlaces({
          page: pageParam,
          size: PAGE_SIZE,
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
      <PlaceFilterBar totalCount={totalCount} />
      <ul className="grid grid-cols-2 gap-x-[15px] gap-y-10">
        {places.map((place) => (
          <PlaceListItem key={place.id} place={place} />
        ))}
        {isFetchingNextPage && <LoadingIndicator />}
      </ul>

      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </>
  )
}
