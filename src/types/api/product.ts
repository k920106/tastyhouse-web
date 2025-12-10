export interface TodayDiscountProduct {
  id: number
  placeName: string
  name: string
  imageUrl: string
  originalPrice: number
  discountPrice: number
  discountRate: number
}

export interface ChoicePlace {
  id: number
  placeName: string
  imageUrl: string
  title: string
  content: string
  products: ChoiceProduct[]
}

interface ChoiceProduct {
  id: number
  placeName: string
  name: string
  imageUrl: string
  originalPrice: number
  discountPrice: number
  discountRate: number
}
