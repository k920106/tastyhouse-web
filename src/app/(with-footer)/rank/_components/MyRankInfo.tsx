import ErrorFallback from '@/components/ui/error-fallback'
import { api } from '@/lib/api'
import { ApiResponse } from '@/types/api/common'
import { MyRankItem } from '@/types/api/rank'
import { retryRankPage } from '../actions'
import RankItem from './RankItem'

export default async function MyRankInfo() {
  // API 호출
  const { error, data } = await api.get<ApiResponse<MyRankItem>>('/api/ranks/v1/members/me')

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return (
      <ErrorFallback
        message={'네트워크 연결이 원활하지 않습니다. 인터넷 상태를 확인해주세요.'}
        showRetry
        onRetry={retryRankPage}
      />
    )
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data?.success || !data.data) {
    const errorMessage =
      data?.message || '내 랭킹 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.'
    return <ErrorFallback message={errorMessage} showRetry onRetry={retryRankPage} />
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
