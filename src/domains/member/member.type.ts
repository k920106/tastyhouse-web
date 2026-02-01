export type MemberGradeCode = 'NEWCOMER' | 'ACTIVE' | 'INSIDER' | 'GOURMET' | 'TEHA'

export type MemberInfo = {
  id: number
  profileImageUrl: string | null
}

export type MemberContactResponse = {
  fullName: string
  phoneNumber: string
  email: string
}
