import { Suspense } from 'react'
import TodayDiscountProductList, {
  TodayDiscountProductListSkeleton,
} from './TodayDiscountProductList'

export function TodayDiscountSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return { children }
}

export default async function TodayDiscountSection() {
  return (
    <section className="w-full bg-white pt-[60px]">
      <div className="mx-auto max-w-[1200px] px-4">
        <header className="mb-[30px] text-center">
          <h2 className="mb-[15px] text-[23px] text-gray-900 font-[family-name:var(--font-nanum-myeongjo-bold)] font-bold">
            오늘의 할인
          </h2>
          <p className="text-sm text-[#aaaaaa]">
            테하 고객만이 누릴 수 있는 할인 혜택을 놓치지 마세요.
          </p>
        </header>
        <Suspense fallback={<TodayDiscountProductListSkeleton />}>
          <TodayDiscountProductList />
        </Suspense>
      </div>
    </section>
  )
}
