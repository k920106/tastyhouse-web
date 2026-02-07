export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'

export type PaymentMethod =
  | 'CASH_ON_SITE'
  | 'CARD_ON_SITE'
  | 'CREDIT_CARD'
  | 'MOBILE'
  | 'KAKAO_PAY'
  | 'ZERO_PAY'

export interface PaymentCreateRequest {
  orderId: number
  paymentMethod: PaymentMethod
}

export interface PaymentConfirmRequest {
  paymentKey: string
  pgOrderId: string
  amount: number
}

export interface PaymentCancelRequest {
  reason?: string
}

export interface PaymentResponse {
  id: number
  orderId: number
  pgOrderId: string
}
