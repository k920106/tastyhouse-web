import type { OrderCreateRequest } from './order.type'
import { orderRepository } from './order.repository'

export const orderService = {
  async createOrder(request: OrderCreateRequest) {
    return await orderRepository.createOrder(request)
  },
  async getOrderDetail(orderId: number) {
    return await orderRepository.getOrderDetail(orderId)
  },
}
