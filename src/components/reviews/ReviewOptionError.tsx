'use client'

import { toast } from '../ui/AppToaster'
import ReviewOptionButton from './ReviewOptionButton'

interface ReviewOptionErrorProps {
  message?: string
}

export default function ReviewOptionError({
  message = '오류가 발생했습니다',
}: ReviewOptionErrorProps) {
  const handleClick = () => {
    toast(message)
  }

  return <ReviewOptionButton onClick={handleClick} />
}
