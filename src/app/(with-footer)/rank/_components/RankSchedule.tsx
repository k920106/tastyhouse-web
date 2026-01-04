import { api } from '@/lib/api'
import { formatDate, formatRemainingTime, getTimeDifference } from '@/lib/date'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { RankEventInfo } from '@/types/api/rank'

export default async function RankSchedule() {
  // API 호출
  const { error, data } = await api.get<ApiResponse<RankEventInfo>>(
    API_ENDPOINTS.RANK_EVENT_DURATION,
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <div>-</div>
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data.success || !data.data) {
    return <div>-</div>
  }

  const rankEventInfo = data.data

  const timeDifference = getTimeDifference(rankEventInfo.endAt)
  const remainingTime = formatRemainingTime(timeDifference)

  const startDateFormatted = formatDate(rankEventInfo.startAt, 'YYYY.MM.DD')
  const endDateFormatted = formatDate(rankEventInfo.endAt, 'MM.DD')
  const dateRange = `${startDateFormatted} ~ ${endDateFormatted}`

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm leading-[14px] text-right">남은 기간 : {remainingTime}</p>
      <p className="text-sm leading-[14px] text-[#aaaaaa] text-right">({dateRange})</p>
    </div>
  )
}
