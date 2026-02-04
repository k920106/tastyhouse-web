import { api } from '@/lib/api'
import type { ApiResponse } from '@/types/common'
import type { PaymentCreateRequest, PaymentResponse } from './payment.type'

const ENDPOINT = '/api/payments'

export const paymentRepository = {
  async createPayment(request: PaymentCreateRequest) {
    return api.post<ApiResponse<PaymentResponse>>(`${ENDPOINT}/v1`, request)
  },

  async completeOnSitePayment(paymentId: number) {
    return api.post<ApiResponse<PaymentResponse>>(`${ENDPOINT}/v1/${paymentId}/complete`)
  },
}
