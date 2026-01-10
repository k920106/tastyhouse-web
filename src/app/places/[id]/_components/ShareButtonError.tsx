'use client'

import { toast } from '@/components/ui/AppToaster'
import ShareButton from './ShareButton'

export default function ShareButtonError() {
  const handleClick = () => {
    toast('오류가 발생했습니다')
  }

  return <ShareButton onClick={handleClick} />
}
