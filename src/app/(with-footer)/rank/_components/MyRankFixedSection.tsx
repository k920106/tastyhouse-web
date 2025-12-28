import { RankPeriod } from '@/types/api/rank'
import { Suspense } from 'react'
import FixedPositionWrapper from './FixedPositionWrapper'
import MyRankInfo from './MyRankInfo'
import { RankListItemSkeleton } from './RankList'

export default function MyRankFixedSection({ rankPeriod }: { rankPeriod: RankPeriod }) {
  return (
    <FixedPositionWrapper className="bottom-[72px]">
      <section>
        <div className="flex justify-between items-center py-[15px] pl-8 pr-[35px] bg-[#eeeeee] border border-[#cccccc] box-border rounded-[2.5px]">
          <Suspense fallback={<RankListItemSkeleton />}>
            <MyRankInfo rankPeriod={rankPeriod} />
          </Suspense>
        </div>
      </section>
    </FixedPositionWrapper>
  )
}
