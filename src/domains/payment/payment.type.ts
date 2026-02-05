import type { PaymentMethod } from '@/domains/order'

export interface PaymentCreateRequest {
  orderId: number
  paymentMethod: PaymentMethod
}

export interface PaymentConfirmRequest {
  paymentKey: string
  orderId: string
  amount: number
}

export interface PaymentResponse {
  id: number
}
