import Header from '@/components/layouts/Header'

export default function RankLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <h1 className="text-[17px] text-white">랭킹</h1>
      </Header>
      <main>{children}</main>
    </>
  )
}
