'use client'

import { toast } from '@/components/ui/AppToaster'
import CommentSubmitButton from './CommentSubmitButton'

export default function CommentSubmitButtonError() {
  const handleClick = () => {
    toast('오류가 발생했습니다')
  }

  return <CommentSubmitButton onClick={handleClick} isSubmitting={false} />
}
