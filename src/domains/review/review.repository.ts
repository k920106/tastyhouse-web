import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { ReviewDetail, ReviewProductDetail } from '.'

export const reviewRepository = {
  async getReviewDetail(reviewId: number) {
    return api.get<ApiResponse<ReviewDetail>>(API_ENDPOINTS.REVIEW_DETAIL(reviewId))
  },
  async getReviewProductDetail(reviewId: number) {
    return api.get<ApiResponse<ReviewProductDetail>>(API_ENDPOINTS.REVIEW_DETAIL_PRODUCT(reviewId))
  },
}
