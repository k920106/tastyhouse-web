import Header, { HeaderCenter, HeaderLeft, HeaderRight } from '@/components/layouts/Header'
import { CartButton, MenuButton } from '@/components/layouts/header-parts'
import Image from 'next/image'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header height={83} showBorder={false}>
        <HeaderLeft>
          <MenuButton />
        </HeaderLeft>
        <HeaderCenter>
          <div className="relative w-[93px] h-[43px]">
            <Image
              src="/images/header-logo.png"
              alt="로고"
              fill
              sizes="83px"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </HeaderCenter>
        <HeaderRight>
          <CartButton count={0} />
        </HeaderRight>
      </Header>
      <div className="pb-[100px]">{children}</div>
    </>
  )
}
