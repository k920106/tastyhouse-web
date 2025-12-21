import { RankPeriod } from '@/types/api/rank'
import { Suspense } from 'react'
import MyRankInfo from './MyRankInfo'
import { RankListSkeletonItem } from './RankList'
import FixedPositionWrapper from './FixedPositionWrapper'

export default function MyRankFixedSection({ rankPeriod }: { rankPeriod: RankPeriod }) {
  return (
    <FixedPositionWrapper className="bottom-[70px]">
      <section className="bg-[#eeeeee] border border-[#cccccc]">
        <div className="flex justify-between items-center py-[15px] pl-8 pr-[35px] bg-[#eeeeee] border border-[#eeeeee] rounded-[2.5px]">
          <Suspense fallback={<RankListSkeletonItem />}>
            <MyRankInfo rankPeriod={rankPeriod} />
          </Suspense>
        </div>
      </section>
    </FixedPositionWrapper>
  )
}
