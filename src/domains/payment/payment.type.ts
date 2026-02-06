import type { PaymentMethod } from '@/domains/order'

export interface PaymentCreateRequest {
  orderId: number
  paymentMethod: PaymentMethod
}

export interface PaymentConfirmRequest {
  paymentKey: string
  pgOrderId: string
  amount: number
}

export interface PaymentResponse {
  id: number
  orderId: number
  pgOrderId: string
}
