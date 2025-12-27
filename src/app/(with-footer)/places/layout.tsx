import Header from '@/components/layouts/Header'

export default function PlaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header height={55}>
        <h1 className="text-[17px] leading-[16px] text-white">플레이스</h1>
      </Header>
      <div>{children}</div>
    </>
  )
}
