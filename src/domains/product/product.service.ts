import { ProductReviewsByRatingQuery } from './product.type'
import { productRepository } from './product.repository'

export const productService = {
  async getProductById(productId: number) {
    return productRepository.getProductById(productId)
  },
  async getProductReviewStatistics(productId: number) {
    return productRepository.getProductReviewStatistics(productId)
  },
  async getProductReviews(productId: number, query: ProductReviewsByRatingQuery) {
    return productRepository.getProductReviews(productId, query)
  },
}
