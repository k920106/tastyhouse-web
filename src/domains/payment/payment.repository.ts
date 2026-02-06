import { api } from '@/lib/api'
import type { ApiResponse } from '@/types/common'
import type { PaymentConfirmRequest, PaymentCreateRequest, PaymentResponse } from './payment.type'

const ENDPOINT = '/api/payments'

export const paymentRepository = {
  async createPayment(request: PaymentCreateRequest) {
    return api.post<ApiResponse<PaymentResponse>>(`${ENDPOINT}/v1`, request)
  },

  async completeOnSitePayment(paymentId: number) {
    return api.post<ApiResponse<PaymentResponse>>(`${ENDPOINT}/v1/${paymentId}/complete`)
  },

  async confirmPaymentToss(request: PaymentConfirmRequest, accessToken?: string) {
    return api.post<ApiResponse<PaymentResponse>>(
      `${ENDPOINT}/v1/toss/confirm`,
      request,
      accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        : undefined,
    )
  },
}
