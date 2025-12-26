import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { ApiResponse } from '@/types/api/api'
import { BestReview } from '@/types/api/review'
import BestReviewSwiper from './BestReviewSwiper'

export default async function BestReviewList() {
  const { data, error } = await api.get<ApiResponse<BestReview[]>>('/api/reviews/v1/best', {
    params: {
      page: 0,
      size: 5,
    },
  })

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
    const errorMessage = data?.message || COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')
    return (
      <div className="w-full text-sm text-[#999999] text-center whitespace-pre-line">
        {errorMessage}
      </div>
    )
  }
  return <BestReviewSwiper reviews={data.data} />
}
