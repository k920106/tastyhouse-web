import { Suspense } from 'react'
import MyRankInfo from './MyRankInfo'
import { RankListSkeletonItem } from './RankList'

export default function MyRankFixedSection() {
  return (
    <div className="fixed bottom-[70px] left-1/2 -translate-x-1/2 w-full max-w-[500px]">
      <section className="bg-[#eeeeee] border border-[#cccccc]">
        <div className="flex justify-between items-center py-[15px] pl-8 pr-[35px] bg-[#eeeeee] border border-[#eeeeee] rounded-[2.5px]">
          <Suspense fallback={<RankListSkeletonItem />}>
            <MyRankInfo />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
