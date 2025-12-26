import ErrorMessage from '@/components/ui/ErrorMessage'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { MyRankItem, RankPeriod, rankPeriodToRankType } from '@/types/api/rank'
import { cookies } from 'next/headers'
import RankItem from './RankItem'

export default async function MyRankInfo({ rankPeriod }: { rankPeriod: RankPeriod }) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')

  if (!accessToken) {
    return (
      <div className="w-full text-sm leading-[14px] text-[#999999] text-center whitespace-pre-line">
        로그인 후 이용할 수 있어요
      </div>
    )
  }

  // API 호출
  const query = {
    params: {
      type: rankPeriodToRankType(rankPeriod),
    },
  }
  const { error, data } = await api.get<ApiResponse<MyRankItem>>(
    API_ENDPOINTS.RANK_MEMBERS_ME,
    query,
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data?.success || !data.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('내 랭킹')} />
  }

  const info = data.data

  return (
    <RankItem
      rankNo={info.rankNo}
      profileImageUrl={info.profileImageUrl}
      nickname={info.nickname}
      grade={info.grade}
      reviewCount={info.reviewCount}
      isMe
    />
  )
}
