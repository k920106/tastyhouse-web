import { api } from '@/lib/api'
import { ApiResponse } from '@/types/api/api'
import type { OrderCreateRequest, OrderResponse } from './order.type'

const ENDPOINT = '/api/orders'

export const orderRepository = {
  async createOrder(request: OrderCreateRequest) {
    return api.post<ApiResponse<OrderResponse>>(`${ENDPOINT}/v1`, request)
  },
}
