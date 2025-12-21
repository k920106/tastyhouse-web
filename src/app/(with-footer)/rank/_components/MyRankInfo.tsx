import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { ApiResponse } from '@/types/api/common'
import { MyRankItem, RankPeriod, rankPeriodToRankType } from '@/types/api/rank'
import RankItem from './RankItem'

export default async function MyRankInfo({ rankPeriod }: { rankPeriod: RankPeriod }) {
  // API 호출
  const query = {
    params: {
      type: rankPeriodToRankType(rankPeriod),
    },
  }
  const { error, data } = await api.get<ApiResponse<MyRankItem>>('/api/ranks/v1/members/me', query)

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
    const errorMessage =
      data?.message || '내 랭킹 정보를 불러오지 못했어요.\n잠시 후 다시 시도해주세요.'
    return (
      <div className="w-full text-sm text-[#999999] text-center whitespace-pre-line">
        {errorMessage}
      </div>
    )
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
