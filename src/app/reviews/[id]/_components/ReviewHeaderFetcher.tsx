import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { ReviewDetail } from '@/types/api/review'
import ReviewDetailHeader from './ReviewDetailHeader'

interface ReviewHeaderFetcherProps {
  reviewId: number
}

export default async function ReviewHeaderFetcher({ reviewId }: ReviewHeaderFetcherProps) {
  const { error, data } = await api.get<ApiResponse<ReviewDetail>>(
    API_ENDPOINTS.REVIEW_DETAIL(reviewId),
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ReviewDetailHeader memberNickname="" />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data?.success || !data?.data) {
    return <ReviewDetailHeader memberNickname="" />
  }

  return <ReviewDetailHeader memberNickname={data.data.memberNickname} />
}
