import { orderRepository } from './order.repository'
import type { OrderCreateRequest } from './order.type'

export const orderService = {
  async createOrder(request: OrderCreateRequest) {
    return await orderRepository.createOrder(request)
  },
  async getOrderList(page: number = 0, size: number = 9) {
    return await orderRepository.getOrderList({ page, size })
  },
  async getOrderDetail(orderId: number) {
    return await orderRepository.getOrderDetail(orderId)
  },
}
