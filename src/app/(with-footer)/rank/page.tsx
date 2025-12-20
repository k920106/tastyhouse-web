import { RankPeriod } from '@/types/api/rank'
import { Suspense } from 'react'
import MyRankInfo from './_components/MyRankInfo'
import PrizeList, { PrizeListSkeleton } from './_components/PrizeList'
import RankHeader, { RankHeaderSkeleton } from './_components/RankHeader'
import RankList, { RankListSkeleton, RankListSkeletonItem } from './_components/RankList'

const isValidRankType = (type: string | undefined): type is RankPeriod => {
  return type === 'all' || type === 'monthly'
}

export default async function RankPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const params = await searchParams
  const rankPeriod: RankPeriod = isValidRankType(params.type) ? params.type : 'all'

  return (
    <>
      <section className="px-7 py-[30px] bg-white">
        <div className="flex justify-between items-end gap-2">
          <Suspense fallback={<PrizeListSkeleton />}>
            <PrizeList />
          </Suspense>
        </div>
      </section>
      <section className="px-4 py-5 bg-white">
        <section>
          <Suspense fallback={<RankHeaderSkeleton />}>
            <RankHeader rankPeriod={rankPeriod} />
          </Suspense>
        </section>
        <section className="flex flex-col gap-2.5 pt-[25px]">
          <Suspense fallback={<RankListSkeleton />}>
            <RankList rankPeriod={rankPeriod} />
          </Suspense>
        </section>
      </section>
      <div className="fixed bottom-[70px] left-1/2 -translate-x-1/2 w-full max-w-[500px]">
        <section className="bg-[#eeeeee] border border-[#cccccc]">
          <div className="flex justify-between items-center py-[15px] pl-8 pr-[35px] bg-[#eeeeee] border border-[#eeeeee] rounded-[2.5px]">
            <Suspense fallback={<RankListSkeletonItem />}>
              <MyRankInfo />
            </Suspense>
          </div>
        </section>
      </div>
    </>
  )
}
