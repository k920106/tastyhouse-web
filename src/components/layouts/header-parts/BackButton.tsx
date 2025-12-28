'use client'

import { IoChevronBackOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { useHeaderContext } from '@/components/layouts/Header'

interface BackButtonProps {
  onClick?: () => void
}

export default function BackButton({ onClick }: BackButtonProps) {
  const router = useRouter()
  const { variant } = useHeaderContext()
  const isPrimary = variant === 'primary'

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.back()
    }
  }

  return (
    <button
      onClick={handleClick}
      className="w-[55px] h-[55px] flex items-center justify-center cursor-pointer"
    >
      <IoChevronBackOutline size={24} color={isPrimary ? 'white' : 'black'} />
    </button>
  )
}
