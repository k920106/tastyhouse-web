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

export type PlaceThumbnailResponse = {
  id: number
  imageUrl: string
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
  businessHours: BusinessHour[]
  breakTimes: BreakTimes[]
  closedDays: ClosedDay[]
}

export type PlaceOwnerMessageHistoryResponse = {
  message: string
  createdAt: string
}

type BusinessHour = {
  dayType: string
  dayTypeDescription: string
  openTime: string
  closeTime: string
  isClosed: boolean
}

type BreakTimes = {
  dayType: string
  dayTypeDescription: string
  startTime: string
  endTime: string
}

type ClosedDay = {
  closedDayType: string
  description: string
}

export type PlaceMenuResponse = {
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

export type PlacePhotoResponse = {
  id: number
  imageUrl: string
  categoryCode: string | null
  categoryName: string | null
  sort: number | null
}

export type PlaceReviewResponse = {
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

type ReviewImage = {
  id: number
  imageUrl: string
  sort: number
}

export type PlaceReviewStatisticsResponse = {
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
