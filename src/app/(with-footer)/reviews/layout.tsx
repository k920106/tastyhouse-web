import Header, { HeaderCenter, HeaderLeft, HeaderRight } from '@/components/layouts/Header'
import { CartButton, MenuButton } from '@/components/layouts/header-parts'

export default function ReviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header height={55} showBorder={false}>
        <HeaderLeft>
          <MenuButton />
        </HeaderLeft>
        <HeaderCenter>
          <h1 className="text-[17px] leading-[17px] text-white">리뷰</h1>
        </HeaderCenter>
        <HeaderRight>
          <CartButton count={0} />
        </HeaderRight>
      </Header>
      <div className="pb-[70px]">{children}</div>
    </>
  )
}
