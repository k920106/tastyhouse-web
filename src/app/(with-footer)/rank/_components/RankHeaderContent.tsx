import { RankEventInfo, RankPeriod } from '@/types/api/rank'
import RankInfoModalButton from './RankInfoModalButton'
import RankPeriodTabs from './RankPeriodTabs'
import RankSchedule from './RankSchedule'

interface RankHeaderContentProps {
  eventInfo: RankEventInfo
  initialTab: RankPeriod
}

export default function RankHeaderContent({ eventInfo, initialTab }: RankHeaderContentProps) {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <RankPeriodTabs initialTab={initialTab} />
          <RankInfoModalButton />
        </div>
        <RankSchedule eventInfo={eventInfo} />
      </div>
    </>
  )
}
