import { api } from '@/lib/api'
import { ApiResponse } from '@/types/common'
import type { OrderCreateRequest, OrderDetailResponse, OrderResponse } from './order.type'

const ENDPOINT = '/api/orders'

export const orderRepository = {
  async createOrder(request: OrderCreateRequest) {
    return api.post<ApiResponse<OrderResponse>>(`${ENDPOINT}/v1`, request)
  },
  async getOrderDetail(orderId: number) {
    return api.get<ApiResponse<OrderDetailResponse>>(`${ENDPOINT}/v1/${orderId}`)
  },
}
