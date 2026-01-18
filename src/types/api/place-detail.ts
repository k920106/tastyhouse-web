import { PlaceAmenityListItem } from './place'

/**
 * Domain types
 */
export type PlaceMenuCategory = {
  categoryName: string
  menus: PlaceMenu[]
}

export type PlaceMenu = {
  id: number
  imageUrl: string
  spiciness: number | null
  name: string
  originalPrice: number
  discountPrice: number
  discountRate: number | null
  rating: number | null
  reviewCount: number | null
  isRepresentative: boolean | null
}

export type PlacePhotoCategory = {
  categoryName: string
  imageUrls: string[]
}

/**
 * private types
 */
type PlaceBusinessHour = {
  dayType: string
  dayTypeDescription: string
  openTime: string
  closeTime: string
  isClosed: boolean
}

type PlaceBreakTimes = {
  dayType: string
  dayTypeDescription: string
  startTime: string
  endTime: string
}

type PlaceClosedDay = {
  closedDayType: string
  description: string
}

/**
 * Response types
 */
export type PlaceNameResponse = {
  id: number
  name: string
}

export type PlaceSummaryResponse = {
  id: number
  name: string
  roadAddress: string
  lotAddress: string
  rating: number
}

export type PlaceBookmarkResponse = {
  bookmarked: boolean
}

export type PlaceInfoResponse = {
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
  ownerMessageCreatedAt: string | null
  businessHours: PlaceBusinessHour[]
  breakTimes: PlaceBreakTimes[]
  closedDays: PlaceClosedDay[]
  amenities: PlaceAmenityListItem[]
}

export type PlaceThumbnailListItemResponse = {
  id: number
  imageUrl: string
}

export type PlaceReviewListItemResponse = {
  id: number
  imageUrls: string[]
  totalRating: number
  content: string
  memberNickname: string
  memberProfileImageUrl: string | null
  createdAt: string
  productId: number | null
  productName: string | null
}

export type PlaceReviewStatistics = {
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

export type PlaceReviewsByRatingResponse = {
  reviewsByRating: Record<string, PlaceReviewListItemResponse[]>
  allReviews: PlaceReviewListItemResponse[]
  totalReviewCount: number
}
