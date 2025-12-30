'use client'

import { useHeaderContext } from '@/components/layouts/Header'
import { useRouter } from 'next/navigation'
import { IoChevronBackOutline } from 'react-icons/io5'

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
      className="w-[55px] h-[55px] flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <IoChevronBackOutline size={20} color={isPrimary ? 'white' : 'black'} />
    </button>
  )
}
