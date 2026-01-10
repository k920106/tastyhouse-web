/**
 * Code types
 */
export type MemberGradeCode = 'NEWCOMER' | 'ACTIVE' | 'INSIDER' | 'GOURMET' | 'TEHA'

/**
 * Domain types
 */
export type MemberInfo = {
  id: number
  profileImageUrl: string | null
}
