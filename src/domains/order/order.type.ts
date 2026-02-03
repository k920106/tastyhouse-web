export type OrderMethod = 'TABLE_ORDER' | 'RESERVATION' | 'DELIVERY' | 'TAKEOUT'
export type PaymentMethod = 'CASH' | 'CARD' | 'CREDIT' | 'PHONE'

export type OrderMethodItem = {
  code: OrderMethod
  name: string
}

export interface OrderItemOption {
  groupId: number
  groupName: string
  optionId: number
  optionName: string
  additionalPrice: number
}

export interface OrderItem {
  productId: number
  optionKey: string
  name: string
  imageUrl: string
  quantity: number
  salePrice: number
  originalPrice: number
  discountPrice: number
  selectedOptions: OrderItemOption[]
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
