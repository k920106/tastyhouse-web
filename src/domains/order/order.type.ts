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

export interface OrderDetailItemOption {
  groupName: string
  optionName: string
  additionalPrice: number
}

export interface OrderDetailItem {
  id: number
  productId: number
  name: string
  imageUrl: string
  quantity: number
  salePrice: number
  originalPrice: number
  discountPrice: number
  selectedOptions: OrderDetailItemOption[]
}

export interface OrderCustomerInfo {
  fullName: string
  phoneNumber: string
  email: string
}

export interface OrderReservationInfo {
  orderMethod: OrderMethod
  orderStatus: OrderStatus
  reservationDateTime: string
  numberOfPeople: number
  specialRequest: string
}

export interface OrderPaymentInfo {
  paymentDateTime: string
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  cardNumber?: string
}

export interface OrderPaymentBreakdown {
  totalProductAmount: number
  totalDiscountAmount: number
  productDiscountAmount: number
  couponDiscountAmount: number
  pointsUsed: number
  finalAmount: number
}

export interface OrderDetailResponse {
  id: number
  orderNumber: string
  placeId: number
  placeName: string
  orderStatus: OrderStatus
  orderItems: OrderDetailItem[]
  customerInfo: OrderCustomerInfo
  reservationInfo: OrderReservationInfo
  paymentInfo: OrderPaymentInfo
  paymentBreakdown: OrderPaymentBreakdown
}
