'use server'

import { paymentService } from '@/domains/payment'
import type { PaymentConfirmRequest, PaymentCreateRequest } from '@/domains/payment'

export async function createPayment(request: PaymentCreateRequest) {
  return await paymentService.createPayment(request)
}

export async function completeOnSitePayment(paymentId: number) {
  return await paymentService.completeOnSitePayment(paymentId)
}

export async function confirmPayment(request: PaymentConfirmRequest) {
  return await paymentService.confirmPayment(request)
}
