import type { PaymentMethod } from '@/domains/order'

export interface PaymentCreateRequest {
  orderId: number
  paymentMethod: PaymentMethod
}

export interface PaymentResponse {
  id: number
}
