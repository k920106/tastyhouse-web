'use client'

import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getMyBookmarks } from '@/services/member'
import { useQuery } from '@tanstack/react-query'
import BookmarkList from './BookmarkList'

function BookmarkListSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-20 w-full" />
        </div>
      ))}
    </div>
  )
}

export default function BookmarkListFetcher() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['mypage', 'bookmarks'],
    queryFn: async () => {
      const response = await getMyBookmarks(0, 10)
      return {
        bookmarks: response.data?.data || [],
        hasMoreBookmarks: (response.data?.pagination?.totalElements ?? 0) > 10,
      }
    },
  })

  if (isLoading) {
    return <BookmarkListSkeleton />
  }

  if (error) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('즐겨찾기')}
        className="py-10 bg-white"
      />
    )
  }

  if (!data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('즐겨찾기')}
        className="py-10 bg-white"
      />
    )
  }

  return <BookmarkList bookmarks={data.bookmarks} hasMoreBookmarks={data.hasMoreBookmarks} />
}
