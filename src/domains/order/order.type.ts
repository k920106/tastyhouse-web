import type { OrderItem } from '@/types/api/order'

export type OrderMethod = 'TABLE_ORDER' | 'RESERVATION' | 'DELIVERY' | 'TAKEOUT'

export type OrderMethodItem = {
  code: OrderMethod
  name: string
}

export interface OrderCreateRequest {
  placeId: number
  orderItems: OrderItem[]
  memberCouponId: number | null
  usePoint: number
  totalProductAmount: number
  totalDiscountAmount: number
  productDiscountAmount: number
  couponDiscountAmount: number
  finalAmount: number
}

export interface OrderResponse {
  orderId: number
}
