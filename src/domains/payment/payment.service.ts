import { paymentRepository } from './payment.repository'
import type { PaymentConfirmRequest, PaymentCreateRequest } from './payment.type'

export const paymentService = {
  async createPayment(request: PaymentCreateRequest) {
    return await paymentRepository.createPayment(request)
  },

  async completeOnSitePayment(paymentId: number) {
    return await paymentRepository.completeOnSitePayment(paymentId)
  },

  async confirmPaymentToss(request: PaymentConfirmRequest, accessToken?: string) {
    return await paymentRepository.confirmPaymentToss(request, accessToken)
  },
}
