export interface TodayDiscountProduct {
  id: number
  discountPrice: number
  discountRate: number
  imageUrl: string
  name: string
  originalPrice: number
  placeName: string
}

export interface ChoiceProduct {
  id: number
  placeName: string
  name: string
  imageUrl: string
  originalPrice: number
  discountPrice: number
  discountRate: number
}
