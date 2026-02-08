'use client'

import { Skeleton } from '@/components/ui/shadcn/skeleton'
import usePlaceBookmark from '@/hooks/usePlaceBookmark'
import PlaceBookmarkButton from './PlaceBookmarkButton'

export function PlaceBookmarkButtonSkeleton() {
  return <Skeleton className="w-[35px] h-[35px] rounded-full" />
}

interface PlaceBookmarkButtonClientProps {
  initialIsBookmarked: boolean
  placeId: number
}

export default function PlaceBookmarkButtonClient({
  initialIsBookmarked,
  placeId,
}: PlaceBookmarkButtonClientProps) {
  const { isBookmarked, isPending, toggleBookmark } = usePlaceBookmark({
    placeId,
    initialIsBookmarked,
  })

  return (
    <PlaceBookmarkButton
      onClick={toggleBookmark}
      isBookmarked={isBookmarked}
      disabled={isPending}
    />
  )
}
