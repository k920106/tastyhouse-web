export type MemberGrade = 'NEWCOMER' | 'ACTIVE' | 'INSIDER' | 'GOURMET' | 'TEHA'

export interface MemberRankItem {
  memberId: number
  nickname: string
  profileImageUrl: string
  reviewCount: number
  rankNo: number
  grade: MemberGrade
}

export interface PrizeItem {
  id: number
  prizeRank: number
  name: string
  brand: string
  imageUrl: string
}

export type RankType = 'ALL' | 'MONTHLY' | 'WEEKLY'
