import { api } from '@/lib/api'
import { ApiResponse, PaginationParams } from '@/types/common'
import type {
  OrderCreateRequest,
  OrderDetailResponse,
  OrderListResponse,
  OrderResponse,
} from './order.type'

const ENDPOINT = '/api/orders'

export const orderRepository = {
  async createOrder(request: OrderCreateRequest) {
    return api.post<ApiResponse<OrderResponse>>(`${ENDPOINT}/v1`, request)
  },
  async getOrderList(params: PaginationParams) {
    return api.get<ApiResponse<OrderListResponse>>(`${ENDPOINT}/v1`, {
      params,
    })
  },
  async getOrderDetail(orderId: number) {
    return api.get<ApiResponse<OrderDetailResponse>>(`${ENDPOINT}/v1/${orderId}`)
  },
}
