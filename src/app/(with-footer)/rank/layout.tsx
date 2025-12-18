import Header from '@/components/layouts/Header'

export default function RankLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <h1 className="text-[17px] text-white">랭킹</h1>
      </Header>
      <main>
        <div className="flex flex-col gap-2.5 min-h-screen bg-[#f9f9f9] pb-[140px]">{children}</div>
      </main>
    </>
  )
}
