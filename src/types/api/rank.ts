export type MemberGrade = 'NEWCOMER' | 'ACTIVE' | 'INSIDER' | 'GOURMET' | 'TEHA'

export interface MemberRankItem {
  memberId: number
  nickname: string
  profileImageUrl: string
  reviewCount: number
  rankNo: number
  grade: MemberGrade
}

export type RankType = 'ALL' | 'MONTHLY' | 'WEEKLY'
