export interface Coupon {
  id: number
  couponName: string
  couponCode: string
  discountPoints: number
  minOrderAmount: number
  startDate: string
  endDate: string
  daysRemaining: number
  isExpired: boolean
}

export interface CouponListResponse {
  coupons: Coupon[]
  totalCount: number
}
