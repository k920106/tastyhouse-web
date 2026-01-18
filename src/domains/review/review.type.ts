import { PaginationParams } from '@/types/api/api'
import { ReviewComment, ReviewReply, ReviewType } from '@/types/review'

export type ReviewBestQuery = PaginationParams & {}

export type ReviewLatestQuery = PaginationParams & {
  type: ReviewType
}

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

export type ReviewProductDetailResponse = {
  productId: number
  productName: string
  productImageUrl: string
  productPrice: number
  content: string
  totalRating: number
  tasteRating: number
  amountRating: number
  priceRating: number
  atmosphereRating: number
  kindnessRating: number
  hygieneRating: number
  willRevisit: boolean
  memberNickname: string
  memberProfileImageUrl: string | null
  createdAt: string
  imageUrls: string[]
  tagNames: string[]
}

export type ReviewLikeResponse = {
  liked: boolean
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
  replies: ReviewReply[]
}

export type CommentListResponse = {
  comments: ReviewComment[]
  totalCount: number
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
