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

export type RankPeriod = 'all' | 'monthly'

type RankType = 'ALL' | 'MONTHLY' | 'WEEKLY'

export const rankPeriodToRankType = (period: RankPeriod): RankType => {
  const periodMap: Record<RankPeriod, RankType> = {
    all: 'ALL',
    monthly: 'MONTHLY',
  }
  return periodMap[period]
}

export type RankMemberQuery = {
  type: RankType
  limit: number
}
