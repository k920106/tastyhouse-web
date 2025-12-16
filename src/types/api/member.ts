export interface MemberProfile {
  id: number
  userName: string
  userProfileImage: string | null
  memberBadge: string
  description: string
  reviewCount: number
  followingCount: number
  followerCount: number
}

export interface UpdateMemberProfileRequest {
  userName: string
  description: string
  userProfileImage?: string | null
}
