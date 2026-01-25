'use server'

import { ProductReviewsByRatingQuery, productService } from '@/domains/product'

export async function getProductReviewStatistics(productId: number) {
  return await productService.getProductReviewStatistics(productId)
}

export async function getProductReviews(productId: number, query: ProductReviewsByRatingQuery) {
  return await productService.getProductReviews(productId, query)
}
