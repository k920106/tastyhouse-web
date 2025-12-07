import Image from 'next/image'
import { RxHamburgerMenu } from 'react-icons/rx'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative flex items-center h-20 bg-main">
        <button className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center cursor-pointer">
          <RxHamburgerMenu size={22} color="white" />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2">
          <Image src="/images/header-logo.png" alt="로고" width={93} height={43} priority />
        </p>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center cursor-pointer">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <Image
              src="/images/icon-cart.png"
              alt="장바구니"
              width={44}
              height={44}
              className="z-1"
            />
            <p className="absolute top-2 right-1 flex items-center justify-center w-4 h-4 text-[10px] text-white bg-main">
              99
            </p>
          </div>
        </button>
      </div>
      <div>{children}</div>
    </>
  )
}
