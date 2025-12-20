import { RankPeriod } from '@/types/api/rank'
import { Suspense } from 'react'
import RankHeader, { RankHeaderSkeleton } from './RankHeader'

export default function RankHeaderSection({ rankPeriod }: { rankPeriod: RankPeriod }) {
  return (
    <section>
      <Suspense fallback={<RankHeaderSkeleton />}>
        <RankHeader rankPeriod={rankPeriod} />
      </Suspense>
    </section>
  )
}
