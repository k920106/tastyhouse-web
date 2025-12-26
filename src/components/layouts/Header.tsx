import Image from 'next/image'
import { RxHamburgerMenu } from 'react-icons/rx'

interface HeaderProps {
  children: React.ReactNode
  cartCount?: number
  height: number
}

export default function Header({ children, cartCount = 99, height }: HeaderProps) {
  return (
    <header className="relative flex items-center bg-main" style={{ height: `${height}px` }}>
      <button className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center cursor-pointer">
        <RxHamburgerMenu size={22} color="white" />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2">{children}</div>
      <button className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center cursor-pointer">
        <div className="relative w-[22px] h-[22px] flex items-center justify-center">
          <Image
            src="/images/icon-cart.png"
            alt="장바구니"
            width={22}
            height={22}
            className="z-1"
          />
          <span className="absolute top-1.5 flex items-center justify-center w-4 h-4 text-[10px] text-white bg-main">
            {cartCount}
          </span>
        </div>
      </button>
    </header>
  )
}
