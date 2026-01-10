'use client'

import { toast } from '../ui/AppToaster'
import ReviewOptionButton from './ReviewOptionButton'

export default function ReviewOptionError() {
  const handleClick = () => {
    toast('오류가 발생했습니다')
  }

  return <ReviewOptionButton onClick={handleClick} />
}
