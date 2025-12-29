import { PaginationParams } from './api'

export type TodayDiscountProductQuery = PaginationParams & {}

export type TodayDiscountProduct = Product & {}

export type ChoiceProduct = Product & {}

type Product = {
  id: number
  name: string
  placeName: string
  imageUrl: string
  originalPrice: number
  discountPrice: number
  discountRate: number
}
