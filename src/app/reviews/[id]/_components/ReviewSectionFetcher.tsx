import ErrorMessage from '@/components/ui/ErrorMessage'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { ReviewDetail } from '@/types/api/review'
import ReviewDetailSection from './ReviewDetailSection'

interface ReviewSectionFetcherProps {
  reviewId: number
}

export default async function ReviewSectionFetcher({ reviewId }: ReviewSectionFetcherProps) {
  const { error, data } = await api.get<ApiResponse<ReviewDetail>>(
    API_ENDPOINTS.REVIEW_DETAIL(reviewId),
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10" />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data?.success || !data?.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} className="py-10" />
  }

  return <ReviewDetailSection review={data.data} />
}
