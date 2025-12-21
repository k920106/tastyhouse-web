import { formatDate, formatRemainingTime, getTimeDifference } from '@/lib/date'
import { RankEventInfo } from '@/types/api/rank'

interface RankScheduleProps {
  eventInfo: RankEventInfo
}

export default function RankSchedule({ eventInfo }: RankScheduleProps) {
  const timeDifference = getTimeDifference(eventInfo.endAt)
  const remainingTime = formatRemainingTime(timeDifference)

  const startDateFormatted = formatDate(eventInfo.startAt, 'YYYY.MM.DD')
  const endDateFormatted = formatDate(eventInfo.endAt, 'MM.DD')
  const dateRange = `${startDateFormatted} ~ ${endDateFormatted}`

  return (
    <div>
      <p className="text-sm text-right">남은 기간 : {remainingTime}</p>
      <p className="text-sm text-[#aaaaaa] text-right">({dateRange})</p>
    </div>
  )
}
