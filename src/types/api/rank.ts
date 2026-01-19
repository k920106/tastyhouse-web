import { MemberGradeCode } from '@/domains/member'

type RankType = 'ALL' | 'MONTHLY' | 'WEEKLY'

export type RankPeriod = 'all' | 'monthly'

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

export type RankMemberMeResponse = {
  nickname: string
  profileImageUrl: string
  reviewCount: number
  rankNo: number
  grade: MemberGradeCode
}

export type RankEventDurationResponse = {
  startAt: Date
  endAt: Date
}

export type RankMemberListItemResponse = {
  memberId: number
  nickname: string
  profileImageUrl: string
  reviewCount: number
  rankNo: number
  grade: MemberGradeCode
}
