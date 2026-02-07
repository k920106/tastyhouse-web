import { api } from '@/lib/api'
import { ApiResponse } from '@/types/common'
import type {
  OrderCancelRequest,
  OrderCreateRequest,
  OrderDetailResponse,
  OrderResponse,
} from './order.type'

const ENDPOINT = '/api/orders'

export const orderRepository = {
  async createOrder(request: OrderCreateRequest) {
    return api.post<ApiResponse<OrderResponse>>(`${ENDPOINT}/v1`, request)
  },
  async getOrderDetail(orderId: number) {
    return api.get<ApiResponse<OrderDetailResponse>>(`${ENDPOINT}/v1/${orderId}`)
  },
  async cancelOrder(orderId: number, request?: OrderCancelRequest) {
    return api.post<ApiResponse<OrderResponse>>(`${ENDPOINT}/v1/${orderId}/cancel`, request)
  },
}
