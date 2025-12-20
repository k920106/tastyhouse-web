import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/api'
import { ApiResponse } from '@/types/api/common'
import { RankEventInfo, RankPeriod } from '@/types/api/rank'
import RankHeaderContent from './RankHeaderContent'

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
  // API 호출
  const { error, data } = await api.get<ApiResponse<RankEventInfo>>(
    '/api/event/v1/ranking/duration',
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return (
      <div className="w-full text-sm text-[#999999] text-center whitespace-pre-line">
        {`일시적인 오류로 데이터를 불러오지 못했어요.\n잠시 후 다시 시도해주세요.`}
      </div>
    )
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data?.success || !data.data) {
    const errorMessage =
      data?.message || '이벤트 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.'
    return (
      <div className="w-full text-sm text-[#999999] text-center whitespace-pre-line">
        {errorMessage}
      </div>
    )
  }

  return <RankHeaderContent eventInfo={data.data} initialTab={rankPeriod} />
}
