import Header from '@/components/layouts/Header'

export default function ReviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header height={55}>
        <h1 className="text-[17px] leading-[16px] text-white">리뷰</h1>
      </Header>
      <main>{children}</main>
    </>
  )
}
