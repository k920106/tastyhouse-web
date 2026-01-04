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
  likeCount: number
  commentCount: number
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
}

export type ReviewLikeResponse = {
  liked: boolean
}

export type CommentListResponse = {
  comments: Comment[]
  totalCount: number
}

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
