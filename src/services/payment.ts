'use server'

import type { PaymentCancelRequest, PaymentConfirmRequest, PaymentCreateRequest } from '@/domains/payment'
import { paymentService } from '@/domains/payment'

export async function createPayment(request: PaymentCreateRequest) {
  return await paymentService.createPayment(request)
}

export async function completeOnSitePayment(paymentId: number) {
  return await paymentService.completeOnSitePayment(paymentId)
}

export async function confirmPaymentToss(request: PaymentConfirmRequest, accessToken?: string) {
  return await paymentService.confirmPaymentToss(request, accessToken)
}

export async function cancelPayment(paymentId: number, request: PaymentCancelRequest) {
  return await paymentService.cancelPayment(paymentId, request)
}
