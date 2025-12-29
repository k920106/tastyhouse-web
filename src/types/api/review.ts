import { PaginationParams } from './api'

export type ReviewType = 'ALL' | 'FOLLOWING'

export type BestReviewQuery = PaginationParams & {}

export type BestReview = {
  id: number
  content: string
  imageUrl: string
  stationName: string
  title: string
  totalRating: number
}

export type LatestReviewQuery = PaginationParams & {
  type: ReviewType
}

export type LatestReview = {
  id: number
  imageUrls: string[]
  stationName: string
  totalRating: number
  content: string
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  createdAt: string
}

export type ReviewDetail = {
  id: number
  placeId: number
  placeName: string
  stationName: string
  content: string
  totalRating: number
  tasteRating: number
  amountRating: number
  priceRating: number
  atmosphereRating: number
  kindnessRating: number
  hygieneRating: number
  willRevisit: boolean
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  createdAt: string
  imageUrls: string[]
  tagNames: string[]
  isLiked: boolean
}

export type ReviewLikeResponse = {
  liked: boolean
}

export type ReviewLikeResult = {
  success: boolean
  liked?: boolean
  error?: string
}

export type ReviewCommentResponse = {
  comments: Comment[]
  totalCount: number
}

type Comment = {
  id: number
  reviewId: number
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  content: string
  createdAt: string
  replies?: Reply[]
}

type Reply = {
  id: number
  commentId: number
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  content: string
  createdAt: string
}
