import ErrorMessage from '@/components/ui/ErrorMessage'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { BestReview } from '@/types/api/review'
import BestReviewSwiper from './BestReviewSwiper'

export default async function BestReviewList() {
  const { data, error } = await api.get<ApiResponse<BestReview[]>>(API_ENDPOINTS.REVIEWS_BEST, {
    params: {
      page: 0,
      size: 5,
    },
  })

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data?.success || !data.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />
  }

  return <BestReviewSwiper reviews={data.data} />
}
