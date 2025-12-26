import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Suspense } from 'react'
import ChoiceList from './ChoiceList'
import { ChoiceSwiperSkeleton } from './ChoiceSwiper'

export default async function ChoiceSection() {
  return (
    <section className="w-full bg-white pt-[60px]">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-[30px] text-center">
          <h2 className="mb-[15px] text-[23px] text-gray-900 font-[family-name:var(--font-nanum-myeongjo-bold)] font-bold">
            테하 초이스
          </h2>
          <p className="text-sm text-[#aaaaaa]">요즘 주목받고 있는 플레이스를 소개합니다.</p>
        </header>
      </div>
      <div className="mx-auto max-w-[1200px] pl-4">
        <Suspense fallback={<ChoiceSwiperSkeleton />}>
          <ChoiceList />
        </Suspense>
      </div>
    </section>
  )
}
