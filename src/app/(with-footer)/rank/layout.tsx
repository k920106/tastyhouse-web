import Header from '@/components/layouts/Header'

export default function RankLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header height={55}>
        <h1 className="text-[17px] leading-[16px] text-white">랭킹</h1>
      </Header>
      <div className="flex flex-col gap-2.5 pb-[140px] bg-[#f9f9f9]">{children}</div>
    </>
  )
}
