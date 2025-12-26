export interface BestReview {
  id: number
  content: string
  imageUrl: string
  stationName: string
  title: string
  totalRating: number
}

export interface Review {
  id: number
  userName: string
  userProfileImage: string | null
  createdAt: string
  images: string[]
  content: string
  likeCount: number
  commentCount: number
  placeName?: string
  menuName?: string
  hashtags?: string[]
}

export interface Comment {
  id: number
  userName: string
  userProfileImage: string | null
  content: string
  createdAt: string
  replies?: CommentReply[]
}

export interface CommentReply {
  id: number
  userName: string
  userProfileImage: string | null
  content: string
  createdAt: string
}

export type ReviewType = 'ALL' | 'FOLLOWING'

export interface LatestReviewListItem {
  id: number
  imageUrls: string[]
  stationName: string
  totalRating: number
  title: string
  content: string
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  createdAt: string
}

export type LatestReviewQuery = {
  page: number
  size: number
  type: ReviewType
}
