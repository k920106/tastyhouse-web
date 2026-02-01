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

export type MemberCouponListItemResponse = {
  id: number
  couponId: number
  name: string
  description: string
  discountType: 'AMOUNT' | 'RATE'
  discountAmount: number
  maxDiscountAmount: number | null
  minOrderAmount: number
  useStartAt: string
  useEndAt: string
  expiredAt: string
  isUsed: boolean
  usedAt: string | null
  daysRemaining: number
}
