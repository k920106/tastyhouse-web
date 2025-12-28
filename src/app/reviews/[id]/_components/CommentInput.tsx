'use client'

import Avatar from '@/components/ui/Avatar'
import { useState } from 'react'
import { RxPaperPlane } from 'react-icons/rx'

interface CommentInputProps {
  reviewId: number
  userProfileImage: string | null
}

export default function CommentInput({ reviewId, userProfileImage }: CommentInputProps) {
  const [commentText, setCommentText] = useState('')

  const handleSubmitComment = () => {
    // TODO: 댓글 등록 API 호출 (reviewId 사용)
    console.log('Submit comment for review:', reviewId)
    setCommentText('')
  }

  return (
    <>
      <div className="flex-1 flex items-center gap-[7px]">
        <Avatar src={userProfileImage} alt="내 프로필" />
        <div className="flex-1 px-4 py-2.5 border border-[#eeeeee] box-border rounded-[20px]">
          <textarea
            rows={1}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 입력하세요."
            className="w-full text-sm leading-[14px] bg-transparent outline-none resize-none overflow-y-hidden placeholder:text-[#aaaaaa] [field-sizing:content]"
          />
        </div>
      </div>
      {commentText.trim() && (
        <button
          className="flex justify-end items-center w-[22px] h-[44px]"
          onClick={handleSubmitComment}
        >
          <RxPaperPlane size={22} color="#cccccc" />
        </button>
      )}
    </>
  )
}
