import { PaginationParams } from './api'

/**
 * Code types
 */
export type ReviewType = 'ALL' | 'FOLLOWING'

/**
 * Domain types
 */
export type Comment = {
  id: number
  reviewId: number
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  content: string
  createdAt: string
  replies?: Reply[]
}

/**
 * Private types
 */
type Reply = {
  id: number
  commentId: number
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  replyToMemberId: number
  replyToMemberNickname: string
  content: string
  createdAt: string
}

/**
 * Query types
 */
export type ReviewBestQuery = PaginationParams & {}

export type ReviewLatestQuery = PaginationParams & {
  type: ReviewType
}

/**
 * Response types
 */
export type ReviewBestListItemResponse = {
  id: number
  content: string
  imageUrl: string
  stationName: string
  title: string
  totalRating: number
}

export type ReviewLatestListItemResponse = {
  id: number
  imageUrls: string[]
  stationName: string
  totalRating: number
  content: string
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  likeCount: number
  commentCount: number
  createdAt: string
}

export type ReviewDetailResponse = {
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
}

export type ReviewImage = {
  id: number
  imageUrl: string
  sort: number
}

export type ReviewLikeResponse = {
  liked: boolean
}

export type CommentListResponse = {
  comments: Comment[]
  totalCount: number
}

export type CommentCreateRequest = {
  content: string
}

export type CommentCreateResponse = {
  id: number
  reviewId: number
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  content: string
  createdAt: string
  replies: Reply[]
}

export type ReplyCreateRequest = {
  content: string
  replyToMemberId: number
}

export type ReplyCreateResponse = {
  id: number
  commentId: number
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  content: string
  createdAt: string
}
