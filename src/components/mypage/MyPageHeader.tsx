'use client'

import Image from 'next/image'
import { IoSettingsOutline } from 'react-icons/io5'

export default function MyPageHeader() {
  return (
    <header className="relative h-[200px] bg-main">
      <div className="flex items-center justify-end px-4 pt-4 gap-3">
        <button className="flex items-center justify-center w-10 h-10">
          <IoSettingsOutline size={28} className="text-white" />
        </button>
        <button className="relative flex items-center justify-center w-10 h-10">
          <Image src="/images/icon-cart.png" alt="장바구니" width={24} height={24} />
          <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 flex items-center justify-center text-[11px] font-bold bg-white text-main rounded-full border border-white">
            99
          </span>
        </button>
      </div>
    </header>
  )
}
