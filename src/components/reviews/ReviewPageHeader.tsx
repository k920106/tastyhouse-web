'use client'

import Image from 'next/image'
import { RxHamburgerMenu } from 'react-icons/rx'

export default function ReviewPageHeader() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-[60px] px-4 bg-main text-white">
      <button className="flex items-center justify-center w-10 h-10">
        <RxHamburgerMenu size={24} />
      </button>

      <h1 className="text-[20px] font-bold">리뷰</h1>

      <button className="relative flex items-center justify-center w-10 h-10">
        <Image src="/images/icon-cart.png" alt="장바구니" width={24} height={24} />
        <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 flex items-center justify-center text-[11px] font-bold bg-white text-main rounded-full border border-white">
          99
        </span>
      </button>
    </header>
  )
}
