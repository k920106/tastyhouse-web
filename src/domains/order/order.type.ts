export type OrderMethod = 'TABLE_ORDER' | 'RESERVATION' | 'DELIVERY' | 'TAKEOUT'
export type PaymentMethod =
  | 'CASH_ON_SITE'
  | 'CARD_ON_SITE'
  | 'CREDIT_CARD'
  | 'MOBILE'
  | 'KAKAO_PAY'
  | 'ZERO_PAY'

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
  id: number
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'

export interface OrderItemOption {
  id: number
  optionGroupName: string
  optionName: string
  additionalPrice: number
}

export interface OrderItemResponse {
  id: number
  productId: number
  productName: string
  productImageUrl: string
  quantity: number
  unitPrice: number
  discountPrice: number | null
  optionTotalPrice: number
  totalPrice: number
  options: OrderItemOption[]
}

export interface PaymentSummaryResponse {
  approvedAt: string
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  cardNumber?: string
}

export interface OrderDetailResponse {
  id: number
  orderNumber: string
  orderStatus: OrderStatus
  placeName: string
  ordererName: string
  ordererPhone: string
  ordererEmail: string
  totalProductAmount: number
  productDiscountAmount: number
  couponDiscountAmount: number
  pointDiscountAmount: number
  totalDiscountAmount: number
  finalAmount: number
  usedPoint: number
  earnedPoint: number
  orderItems: OrderItemResponse[]
  payment: PaymentSummaryResponse
  createdAt: string
}
