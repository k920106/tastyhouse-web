import { api } from '@/lib/api'
import { ApiResponse } from '@/types/common'
import {
  ProductDetailResponse,
  ProductReviewStatisticsResponse,
  ProductReviewsByRatingQuery,
  ProductReviewsByRatingResponse,
} from './product.type'

const ENDPOINT = '/api/products'

export const productRepository = {
  async getProductById(productId: number) {
    return api.get<ApiResponse<ProductDetailResponse>>(`${ENDPOINT}/v1/${productId}`)
  },
  async getProductReviewStatistics(productId: number) {
    return api.get<ApiResponse<ProductReviewStatisticsResponse>>(
      `${ENDPOINT}/v1/${productId}/reviews/statistics`,
    )
  },
  async getProductReviews(productId: number, params: ProductReviewsByRatingQuery) {
    return api.get<ApiResponse<ProductReviewsByRatingResponse>>(
      `${ENDPOINT}/v1/${productId}/reviews`,
      {
        params,
      },
    )
  },
}
