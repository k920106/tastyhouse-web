'use client'

import { createContext, useCallback, useContext, useRef, useState } from 'react'

type ReplyTarget = {
  commentId: number
  nickname: string
  memberId: number
} | null

interface ReplyContextValue {
  replyTarget: ReplyTarget
  setReplyTarget: (target: ReplyTarget) => void
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  triggerReply: (commentId: number, nickname: string, memberId: number) => void
  clearReply: () => void
}

const ReplyContext = createContext<ReplyContextValue | null>(null)

export function ReplyProvider({ children }: { children: React.ReactNode }) {
  const [replyTarget, setReplyTarget] = useState<ReplyTarget>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const triggerReply = useCallback((commentId: number, nickname: string, memberId: number) => {
    setReplyTarget({ commentId, nickname, memberId })
    // 다음 렌더링 후 focus
    setTimeout(() => {
      textareaRef.current?.focus()
    }, 0)
  }, [])

  const clearReply = useCallback(() => {
    setReplyTarget(null)
  }, [])

  return (
    <ReplyContext.Provider
      value={{ replyTarget, setReplyTarget, textareaRef, triggerReply, clearReply }}
    >
      {children}
    </ReplyContext.Provider>
  )
}

export function useReply() {
  const context = useContext(ReplyContext)
  if (!context) {
    throw new Error('useReply must be used within a ReplyProvider')
  }
  return context
}
