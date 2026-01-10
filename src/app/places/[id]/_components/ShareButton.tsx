'use client'

import { share } from '@/lib/share'
import { useCallback } from 'react'
import { BsShare } from 'react-icons/bs'

interface ShareButtonProps {
  placeId: number
  placeName: string
}

export default function ShareButton({ placeId, placeName }: ShareButtonProps) {
  const origin = window.location.origin

  const handleShare = useCallback(async () => {
    await share({
      title: `[테이스티하우스] ${placeName}`,
      text: `'${placeName}' 어때요? 테이스티하우스 앱에서 확인해 보세요.`,
      url: `${origin}/places/${placeId}`,
    })
  }, [origin, placeId, placeName])

  return (
    <button
      className="w-[55px] h-[55px] flex items-center justify-center cursor-pointer"
      onClick={handleShare}
    >
      <BsShare size={20} />
    </button>
  )
}
