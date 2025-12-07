'use client'

import { MdMenu } from 'react-icons/md'

interface TabButtonProps {
  onClick?: () => void
}

export default function SideBarButton({ onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 left-4 z-50 p-3 bg-white text-black rounded-full shadow"
    >
      <MdMenu size={20} />
    </button>
  )
}
