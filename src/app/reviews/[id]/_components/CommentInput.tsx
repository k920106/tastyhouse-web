'use client'

import Avatar from '@/components/ui/Avatar'
import { Spinner } from '@/components/ui/shadcn/spinner'
import { useCallback, useRef, useState } from 'react'
import { RxPaperPlane } from 'react-icons/rx'
import { createComment } from '../actions'

interface CommentInputProps {
  reviewId: number
  userProfileImage: string | null
}

export default function CommentInput({ reviewId, userProfileImage }: CommentInputProps) {
  const [commentText, setCommentText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSubmitComment = async () => {
    const content = commentText.trim()

    if (!content) {
      alert('댓글을 입력해 주세요.')
    }

    if (!content || isSubmitting) return

    setIsSubmitting(true)

    const { success, error } = await createComment(reviewId, content)

    if (error) {
      alert(error || '댓글 등록에 실패했습니다.')
    }

    if (success) {
      setCommentText('')
      setIsFocused(false)
      textareaRef.current?.blur()
    }

    setIsSubmitting(false)
  }

  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      // relatedTarget: blur 시 다음으로 focus되는 요소
      // 버튼 클릭 시 blur가 먼저 발생하므로, 컨테이너 내부 요소로 이동하는 경우 focus 유지
      if (containerRef.current?.contains(e.relatedTarget as Node)) {
        return
      }
      // 텍스트가 있으면 focus 상태 유지 (사용자가 입력 중일 수 있음)
      if (commentText.trim()) {
        return
      }
      setIsFocused(false)
    },
    [commentText],
  )

  // 버튼 표시 조건: focus 상태이거나 텍스트가 있을 때
  const showButton = isFocused || commentText.trim()

  return (
    <div ref={containerRef} className="flex items-center gap-[7px] flex-1">
      <Avatar src={userProfileImage} alt="내 프로필" />
      <div className="flex-1 px-4 py-2.5 border border-[#eeeeee] box-border rounded-[20px] grid">
        <textarea
          ref={textareaRef}
          rows={1}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="댓글을 입력하세요."
          className="min-w-0 text-sm leading-normal bg-transparent outline-none resize-none overflow-y-hidden placeholder:text-[#aaaaaa] [field-sizing:content]"
        />
      </div>
      {showButton &&
        (!isSubmitting ? (
          <button
            type="button"
            className="flex justify-end items-center w-[22px] h-[44px] disabled:opacity-50"
            onClick={handleSubmitComment}
            disabled={isSubmitting}
          >
            <RxPaperPlane size={22} color="#cccccc" />
          </button>
        ) : (
          <Spinner />
        ))}
    </div>
  )
}
