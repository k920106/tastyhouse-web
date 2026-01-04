'use client'

import { toast } from '@/components/ui/AppToaster'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { useState, useTransition } from 'react'
import { togglePlaceBookmark } from '../actions'
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
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked)
  const [isPending, startTransition] = useTransition()

  const handleBookmark = () => {
    if (isPending) return

    startTransition(async () => {
      const { error, data } = await togglePlaceBookmark(placeId)

      if (error || !data || !data.success || !data.data) {
        toast(error || '북마크 처리에 실패했습니다.')
        return
      }

      const { bookmarked } = data.data

      setIsBookmarked(bookmarked)
    })
  }

  return (
    <PlaceBookmarkButton
      onClick={handleBookmark}
      isBookmarked={isBookmarked}
      disabled={isPending}
    />
  )
}
