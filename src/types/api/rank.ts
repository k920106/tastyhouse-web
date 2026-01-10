/**
 * Code types
 */

import { MemberGradeCode } from './member'

type RankType = 'ALL' | 'MONTHLY' | 'WEEKLY'

export type RankPeriod = 'all' | 'monthly'

/**
 * Helper functions
 */
export const rankPeriodToRankType = (period: RankPeriod): RankType => {
  const periodMap: Record<RankPeriod, RankType> = {
    all: 'ALL',
    monthly: 'MONTHLY',
  }
  return periodMap[period]
}

/**
 * Query types
 */
export type RankMemberQuery = {
  type: RankType
  limit: number
}

/**
 * Response types
 */
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
