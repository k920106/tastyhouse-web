import { PaginationParams } from './api'

/**
 * Base types
 */
type Product = {
  id: number
  name: string
  placeName: string
  imageUrl: string
  originalPrice: number
  discountPrice: number
  discountRate: number
}

/**
 * Query types
 */
export type ProductTodayDiscountQuery = PaginationParams & {}

/**
 * Response types
 */
export type ProductTodayDiscountListItemResponse = Product & {}
export type ProductChoiceListItemResponse = Product & {}
