'use client'

import ReviewListItem from '@/components/reviews/ReviewListItem'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getCurrentMemberId, getLatestReviews } from '@/services/review'
import type { ReviewType } from '@/types/api/review'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const PAGE_SIZE = 10

export function LatestReviewListSkeleton() {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <LatestReviewListItemSkeleton key={i} />
      ))}
    </>
  )
}

function LatestReviewListItemSkeleton() {
  return (
    <div className="flex flex-col px-[15px] pt-3 pb-[30px] bg-white">
      <div className="flex justify-between mb-[15px]">
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-20 h-3.5" />
            <Skeleton className="w-16 h-3" />
          </div>
        </div>
        <Skeleton className="w-1 h-[18px] mr-2" />
      </div>
      <div className="mb-6">
        <Skeleton className="aspect-[345/190] w-full rounded-none" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-[14px] w-full" />
        <Skeleton className="h-[14px] w-full" />
        <Skeleton className="h-[14px] w-3/4" />
      </div>
      <div className="flex gap-4 mt-3.5">
        <Skeleton className="w-15 h-3" />
        <Skeleton className="w-15 h-3" />
      </div>
    </div>
  )
}

interface LatestReviewListProps {
  reviewType: ReviewType
}

export default function LatestReviewList({ reviewType }: LatestReviewListProps) {
  const { data: currentMemberId } = useQuery({
    queryKey: ['member', 'me'],
    queryFn: getCurrentMemberId,
    staleTime: 1000 * 60 * 5,
  })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['reviews', 'latest', reviewType],
      queryFn: ({ pageParam }) =>
        getLatestReviews({
          page: pageParam,
          size: PAGE_SIZE,
          type: reviewType,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const { page, totalPages } = lastPage.pagination
        return page + 1 < totalPages ? page + 1 : undefined
      },
    })

  const { targetRef, isIntersecting, resetIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    enabled: hasNextPage && !isFetchingNextPage,
  })

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      resetIntersecting()
      fetchNextPage()
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage, resetIntersecting])

  if (isLoading) {
    return <LatestReviewListSkeleton />
  }

  if (isError) {
    return (
      <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10 bg-white" />
    )
  }

  if (!data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')}
        className="py-10 bg-white"
      />
    )
  }

  const reviews = data.pages.flatMap((page) => page.data)

  if (reviews.length === 0) {
    return <div className="py-10 bg-white text-center text-sm text-[#aaaaaa]">리뷰가 없습니다.</div>
  }

  return (
    <>
      {reviews.map((review) => (
        <ReviewListItem
          key={review.id}
          className="px-[15px] pt-3 pb-[30px] bg-white"
          memberProfileImageUrl={review.memberProfileImageUrl}
          memberNickname={review.memberNickname}
          createdAt={review.createdAt}
          id={review.id}
          memberId={review.memberId}
          currentMemberId={currentMemberId ?? null}
          content={review.content}
          imageUrls={review.imageUrls}
          likeCount={review.likeCount}
          commentCount={review.commentCount}
        />
      ))}
      {isFetchingNextPage && <LatestReviewListSkeleton />}
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </>
  )
}
