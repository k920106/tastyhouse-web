import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { MenuButton } from '@/components/layouts/header-parts'

export default function PlaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header height={55} showBorder={false}>
        <HeaderLeft>
          <MenuButton />
        </HeaderLeft>
        <HeaderCenter>
          <h1 className="text-[17px] leading-[17px] text-white">플레이스</h1>
        </HeaderCenter>
      </Header>
      <div className="min-h-screen px-[15px] py-[30px] pb-[90px]">{children}</div>
    </>
  )
}
