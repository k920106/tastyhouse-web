'use client'

import { RxHamburgerMenu } from 'react-icons/rx'
import { useHeaderContext } from '@/components/layouts/Header'

interface MenuButtonProps {
  onClick?: () => void
}

export default function MenuButton({ onClick }: MenuButtonProps) {
  const { variant } = useHeaderContext()
  const isPrimary = variant === 'primary'

  return (
    <button
      onClick={onClick}
      className="w-[55px] h-[55px] flex items-center justify-center cursor-pointer"
    >
      <RxHamburgerMenu size={22} color={isPrimary ? 'white' : 'black'} />
    </button>
  )
}
