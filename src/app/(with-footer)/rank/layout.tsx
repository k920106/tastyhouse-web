import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { MenuButton } from '@/components/layouts/header-parts'

export default function RankLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header height={55} showBorder={false}>
        <HeaderLeft>
          <MenuButton />
        </HeaderLeft>
        <HeaderCenter>
          <h1 className="text-[17px] leading-[17px] text-white">랭킹</h1>
        </HeaderCenter>
      </Header>
      <div className="flex flex-col gap-2.5 pb-[140px] bg-[#f9f9f9]">{children}</div>
    </>
  )
}
