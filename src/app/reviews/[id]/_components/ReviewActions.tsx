'use client'

import { useState, useTransition } from 'react'
import { IoChatboxOutline } from 'react-icons/io5'
import { PiHeartFill, PiHeartThin } from 'react-icons/pi'
import { toggleReviewLike } from '../actions'
import { useReply } from './ReplyContext'

interface ReviewActionsProps {
  reviewId: number
  initialIsLiked: boolean
}

export default function ReviewActions({ reviewId, initialIsLiked }: ReviewActionsProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [isPending, startTransition] = useTransition()
  const { textareaRef } = useReply()

  const handleLike = () => {
    if (isPending) return

    const previousIsLiked = isLiked
    setIsLiked(!isLiked)

    startTransition(async () => {
      const { success, error } = await toggleReviewLike(reviewId)

      if (!success) {
        setIsLiked(previousIsLiked)
        alert(error || '좋아요 처리에 실패했습니다.')
      }
    })
  }

  return (
    <div className="flex items-center gap-5 mt-[15px] pt-[17px] border-t border-[#eeeeee] box-border">
      <button onClick={handleLike} className="flex items-center gap-1.5 cursor-pointer">
        {isLiked ? <PiHeartFill size={17} className="text-main" /> : <PiHeartThin size={17} />}
        <span className="text-xs leading-[12px]">좋아요</span>
      </button>
      <button
        onClick={() => textareaRef.current?.focus()}
        className="flex items-center gap-1.5 cursor-pointer"
      >
        <IoChatboxOutline size={17} />
        <span className="text-xs leading-[12px]">댓글</span>
      </button>
    </div>
  )
}
