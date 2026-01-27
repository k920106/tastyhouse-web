'use client'

import { RxHamburgerMenu } from 'react-icons/rx'
import { useHeaderContext } from '@/components/layouts/Header'
import { useSidebar } from '@/components/ui/shadcn/sidebar'

interface MenuButtonProps {
  onClick?: () => void
}

export default function MenuButton({ onClick }: MenuButtonProps) {
  const { variant } = useHeaderContext()
  const isPrimary = variant === 'primary'
  const { setOpenMobile } = useSidebar()

  const handleClick = () => {
    onClick?.()
    setOpenMobile(true)
  }

  return (
    <button
      onClick={handleClick}
      className="w-[55px] h-[55px] flex items-center justify-center cursor-pointer"
    >
      <RxHamburgerMenu size={22} color={isPrimary ? 'white' : 'black'} />
    </button>
  )
}
