import { RankPeriod } from '@/types/api/rank'
import { Suspense } from 'react'
import RankHeader, { RankHeaderSkeleton } from './RankHeader'
import RankList, { RankListSkeleton } from './RankList'

interface RankSectionProps {
  rankPeriod: RankPeriod
}

export default function RankSection({ rankPeriod }: RankSectionProps) {
  return (
    <section className="px-4 py-5 bg-white">
      <section>
        <Suspense fallback={<RankHeaderSkeleton />}>
          <RankHeader rankPeriod={rankPeriod} />
        </Suspense>
      </section>
      <Suspense fallback={<RankListSkeleton />}>
        <RankList rankPeriod={rankPeriod} />
      </Suspense>
    </section>
  )
}
