'use client'

import Image from 'next/image'

interface CartButtonProps {
  count?: number
  onClick?: () => void
}

export default function CartButton({ count = 0, onClick }: CartButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-[55px] h-[55px] flex items-center justify-center cursor-pointer"
    >
      <div className="relative w-[22px] h-[22px] flex items-center justify-center">
        <Image src="/images/icon-cart.png" alt="장바구니" width={22} height={22} className="z-1" />
        {/* <span className="absolute top-1.5 flex items-center justify-center w-4 h-4 text-[10px] text-white bg-main"> */}
        <span className="absolute top-1.5 flex items-center justify-center w-4 h-4 text-[10px]">
          {count > 99 ? '99+' : count}
        </span>
      </div>
    </button>
  )
}
