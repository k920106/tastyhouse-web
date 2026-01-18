import { reviewRepository } from './review.repository'

export const reviewService = {
  async getReviewDetail(reviewId: number) {
    return reviewRepository.getReviewDetail(reviewId)
  },
  async getReviewProductDetail(reviewId: number) {
    return reviewRepository.getReviewProductDetail(reviewId)
  },
}
