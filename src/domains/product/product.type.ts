export type ProductOption = {
  id: number
  name: string
  additionalPrice: number
  isSoldOut: boolean
}

export type ProductOptionGroup = {
  id: number
  name: string
  description: string | null
  isRequired: boolean
  isMultipleSelect: boolean
  minSelect: number
  maxSelect: number
  isCommon: boolean
  options: ProductOption[]
}

export type ProductDetailResponse = {
  id: number
  placeId: number
  placeName: string
  name: string
  description: string
  imageUrls: string[]
  originalPrice: number
  discountPrice: number | null
  discountRate: number | null
  rating: number | null
  reviewCount: number
  isRepresentative: boolean
  isSoldOut: boolean
  categoryName: string
  optionGroups: ProductOptionGroup[]
}
