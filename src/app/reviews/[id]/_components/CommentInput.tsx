'use client'

import Avatar from '@/components/ui/Avatar'
import { Spinner } from '@/components/ui/shadcn/spinner'
import { useRef, useState } from 'react'
import { RxPaperPlane } from 'react-icons/rx'
import { createComment } from '../actions'

interface CommentInputProps {
  reviewId: number
  userProfileImage: string | null
}

export default function CommentInput({ reviewId, userProfileImage }: CommentInputProps) {
  const [commentText, setCommentText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value)
    adjustTextareaHeight()
  }

  const handleSubmitComment = async () => {
    const content = commentText.trim()
    if (!content || isSubmitting) return

    setIsSubmitting(true)

    // API 호출
    const { success, error } = await createComment(reviewId, content)

    if (error) {
      alert(error || '댓글 등록에 실패했습니다.')
    }

    if (success) {
      setCommentText('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }

    setIsSubmitting(false)
  }

  return (
    <>
      <div className="flex-1 flex items-center gap-[7px]">
        <Avatar src={userProfileImage} alt="내 프로필" />
        <div className="flex-1 px-4 py-2.5 border border-[#eeeeee] box-border rounded-[20px]">
          <textarea
            ref={textareaRef}
            rows={1}
            value={commentText}
            onChange={handleChange}
            placeholder="댓글을 입력하세요."
            className="w-full text-sm leading-[14px] bg-transparent outline-none resize-none overflow-y-hidden placeholder:text-[#aaaaaa]"
          />
        </div>
      </div>
      {commentText.trim() &&
        (!isSubmitting ? (
          <button
            className="flex justify-end items-center w-[22px] h-[44px] disabled:opacity-50"
            onClick={handleSubmitComment}
            disabled={isSubmitting}
          >
            <RxPaperPlane size={22} color="#cccccc" />
          </button>
        ) : (
          <Spinner />
        ))}
    </>
  )
}
