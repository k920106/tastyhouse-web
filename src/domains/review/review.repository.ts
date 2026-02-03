import { api } from '@/lib/api'
import { ApiResponse } from '@/types/common'
import {
  CommentCreateRequest,
  CommentCreateResponse,
  CommentListResponse,
  ReplyCreateRequest,
  ReplyCreateResponse,
  ReviewBestListItemResponse,
  ReviewBestQuery,
  ReviewDetailResponse,
  ReviewLatestListItemResponse,
  ReviewLatestQuery,
  ReviewLikeResponse,
  ReviewProductDetailResponse,
} from './review.type'

const ENDPOINT = '/api/reviews'

export const reviewRepository = {
  async getBestReviews(params: ReviewBestQuery) {
    return api.get<ApiResponse<ReviewBestListItemResponse[]>>(`${ENDPOINT}/v1/best`, { params })
  },
  async getLatestReviews(params: ReviewLatestQuery) {
    return api.get<ApiResponse<ReviewLatestListItemResponse[]>>(`${ENDPOINT}/v1/latest`, { params })
  },
  async getReviewDetail(reviewId: number) {
    return api.get<ApiResponse<ReviewDetailResponse>>(`${ENDPOINT}/v1/${reviewId}`)
  },
  async getReviewProductDetail(reviewId: number) {
    return api.get<ApiResponse<ReviewProductDetailResponse>>(`${ENDPOINT}/v1/${reviewId}/product`)
  },
  async toggleReviewLike(reviewId: number) {
    return api.post<ApiResponse<ReviewLikeResponse>>(`${ENDPOINT}/v1/${reviewId}/like`)
  },
  async getReviewLike(reviewId: number) {
    return api.get<ApiResponse<ReviewLikeResponse>>(`${ENDPOINT}/v1/${reviewId}/like`)
  },
  async createReviewComment(reviewId: number, request: CommentCreateRequest) {
    return api.post<ApiResponse<CommentCreateResponse>>(
      `${ENDPOINT}/v1/${reviewId}/comments`,
      request,
    )
  },
  async getReviewComments(reviewId: number) {
    return api.get<ApiResponse<CommentListResponse>>(`${ENDPOINT}/v1/${reviewId}/comments`)
  },
  async createReviewReply(reviewId: number, commentId: number, request: ReplyCreateRequest) {
    return api.post<ApiResponse<ReplyCreateResponse>>(
      `${ENDPOINT}/v1/comments/${commentId}/replies`,
      request,
    )
  },
}
