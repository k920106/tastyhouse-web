'use client'

import ReviewLikeButton from '@/app/reviews/[id]/_components/ReviewLikeButton'
import { toast } from '@/components/ui/AppToaster'

export default function ReviewLikeButtonError() {
  const handleClick = () => {
    toast('오류가 발생했습니다')
  }

  return <ReviewLikeButton onClick={handleClick} isLiked={false} />
}
