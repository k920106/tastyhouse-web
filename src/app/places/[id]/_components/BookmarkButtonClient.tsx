'use client'

import { toast } from '@/components/ui/AppToaster'
import { useState, useTransition } from 'react'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { togglePlaceBookmark } from '../actions'

interface BookmarkButtonClientProps {
  placeId: number
  initialIsBookmarked: boolean
}

export default function BookmarkButtonClient({
  placeId,
  initialIsBookmarked,
}: BookmarkButtonClientProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked)
  const [isPending, startTransition] = useTransition()

  const handleBookmark = () => {
    if (isPending) return

    const previousIsBookmarked = isBookmarked
    setIsBookmarked(!isBookmarked)

    startTransition(async () => {
      const { success, error } = await togglePlaceBookmark(placeId)

      if (!success) {
        setIsBookmarked(previousIsBookmarked)
        toast(error || '북마크 처리에 실패했습니다.')
      }
    })
  }

  return (
    <button
      onClick={handleBookmark}
      className={`flex items-center justify-center w-[35px] h-[35px] shrink-0 border rounded-full cursor-pointer ${isBookmarked ? 'border-main' : 'border-[#eeeeee]'}`}
    >
      {isBookmarked ? (
        <FaBookmark size={16} className="text-main" />
      ) : (
        <FaRegBookmark size={16} className="text-[#eeeeee]" />
      )}
    </button>
  )
}
