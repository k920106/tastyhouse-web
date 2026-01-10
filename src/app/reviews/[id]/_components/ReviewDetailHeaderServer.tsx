import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { ReviewDetailResponse } from '@/types/api/review'
import ReviewDetailHeader from './ReviewDetailHeader'

interface ReviewDetailHeaderServerProps {
  reviewId: number
}

export default async function ReviewDetailHeaderServer({
  reviewId,
}: ReviewDetailHeaderServerProps) {
  // API 호출
  const { error, data } = await api.get<ApiResponse<ReviewDetailResponse>>(
    API_ENDPOINTS.REVIEW_DETAIL(reviewId),
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <div>-</div>
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data.success || !data.data) {
    return <div>-</div>
  }

  const { memberNickname } = data.data

  return <ReviewDetailHeader memberNickname={memberNickname} />
}
