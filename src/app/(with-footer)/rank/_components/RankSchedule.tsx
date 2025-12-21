import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { formatDate, formatRemainingTime, getTimeDifference } from '@/lib/date'
import { ApiResponse } from '@/types/api/common'
import { RankEventInfo } from '@/types/api/rank'

export default async function RankSchedule() {
  // API 호출
  const { error, data } = await api.get<ApiResponse<RankEventInfo>>(
    '/api/event/v1/ranking/duration',
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return (
      <div className="w-full text-sm text-[#999999] text-center whitespace-pre-line">
        {COMMON_ERROR_MESSAGES.API_FETCH_ERROR}
      </div>
    )
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data?.success || !data.data) {
    const errorMessage = data?.message || COMMON_ERROR_MESSAGES.FETCH_ERROR('이벤트')
    return (
      <div className="w-full text-sm text-[#999999] text-center whitespace-pre-line">
        {errorMessage}
      </div>
    )
  }

  const rankEventInfo = data.data

  const timeDifference = getTimeDifference(rankEventInfo.endAt)
  const remainingTime = formatRemainingTime(timeDifference)

  const startDateFormatted = formatDate(rankEventInfo.startAt, 'YYYY.MM.DD')
  const endDateFormatted = formatDate(rankEventInfo.endAt, 'MM.DD')
  const dateRange = `${startDateFormatted} ~ ${endDateFormatted}`

  return (
    <div>
      <p className="text-sm text-right">남은 기간 : {remainingTime}</p>
      <p className="text-sm text-[#aaaaaa] text-right">({dateRange})</p>
    </div>
  )
}
