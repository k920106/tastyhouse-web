// Place Info Types
export interface PlaceInfoResponse {
  id: number
  name: string
  rating: number
  roadAddress: string | null
  lotAddress: string | null
  latitude: number
  longitude: number
  stationName: string
  phoneNumber: string | null
  ownerMessage: string | null
  closedDays: string | null
  businessHours: BusinessHour[]
}

export interface BusinessHour {
  dayOfWeek: string
  openTime: string
  closeTime: string
  breakStartTime?: string
  breakEndTime?: string
}

// Place Thumbnail Types
export interface PlaceThumbnailResponse {
  id: number
  imageUrl: string
  // sort: number | null
}

// Place Summary Types
export interface PlaceSummaryResponse {
  id: number
  name: string
  roadAddress: string
  lotAddress: string
  rating: number
}

// Place Menu Types
export interface PlaceMenuResponse {
  id: number
  name: string
  imageUrl: string
  originalPrice: number
  discountPrice: number
  discountRate: number | null
  rating: number | null
  reviewCount: number | null
  isRepresentative: boolean | null
}

// Place Photo Types
export interface PlacePhotoResponse {
  id: number
  imageUrl: string
  categoryCode: string | null
  categoryName: string | null
  sort: number | null
}

export enum PlaceImageCategory {
  EXTERIOR = 'EXTERIOR',
  INTERIOR = 'INTERIOR',
  FOOD = 'FOOD',
  OTHER = 'OTHER',
}

// Place Review Types
export interface PlaceReviewResponse {
  id: number
  memberId: number
  memberNickname: string | null
  content: string
  totalRating: number
  tasteRating: number
  amountRating: number
  priceRating: number
  atmosphereRating: number
  kindnessRating: number
  hygieneRating: number
  willRevisit: boolean
  images: ReviewImage[]
  createdAt: string
}

export interface ReviewImage {
  id: number
  imageUrl: string
  sort: number
}

// Place Review Statistics Types
export interface PlaceReviewStatisticsResponse {
  totalRating: number
  totalReviewCount: number
  averageTasteRating: number
  averageAmountRating: number
  averagePriceRating: number
  averageAtmosphereRating: number
  averageKindnessRating: number
  averageHygieneRating: number
  willRevisitPercentage: number
  monthlyReviewCounts: Record<string, number>
  ratingCounts: Record<string, number>
}
