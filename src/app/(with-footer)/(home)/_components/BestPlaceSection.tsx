import { Suspense } from 'react'
import BestPlaceList, { BestPlaceListSkeleton } from './BestPlaceList'

export default async function BestPlaceSection() {
  return (
    <section className="w-full pt-[40px] pb-[30px] bg-[#f9f9f9]">
      <header className="mb-[30px] text-center">
        <h2 className="mb-[15px] text-[23px] font-nanum-myeongjo-bold font-bold">
          베스트 플레이스
        </h2>
        <p className="text-sm text-[#aaaaaa]">솔직한 평점으로 인증된 플레이스들을 만나보세요.</p>
      </header>
      <div className="px-[15px]">
        <Suspense fallback={<BestPlaceListSkeleton />}>
          <BestPlaceList />
        </Suspense>
      </div>
    </section>
  )
}
