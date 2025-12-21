import { Skeleton } from '@/components/ui/skeleton'
import { RankPeriod } from '@/types/api/rank'
import RankInfoModalButton from './RankInfoModalButton'
import RankPeriodTabs from './RankPeriodTabs'
import RankSchedule from './RankSchedule'

export function RankHeaderSkeleton() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-3 p-0 bg-white">
            <Skeleton className="w-10 h-7" />
            <Skeleton className="w-10 h-7" />
          </div>
          <Skeleton className="w-[15px] h-[15px]" />
        </div>
        <Skeleton className="w-40 h-5" />
      </div>
      <Skeleton className="w-30 h-5 ml-auto" />
    </>
  )
}

export default async function RankHeader({ rankPeriod }: { rankPeriod: RankPeriod }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2.5">
        <RankPeriodTabs initialTab={rankPeriod} />
        <RankInfoModalButton />
      </div>
      <RankSchedule />
    </div>
  )
}
