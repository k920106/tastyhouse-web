import { orderRepository } from './order.repository'
import type { OrderCreateRequest } from './order.type'

export const orderService = {
  async createOrder(request: OrderCreateRequest) {
    return await orderRepository.createOrder(request)
  },
  async getOrderDetail(orderId: number) {
    return await orderRepository.getOrderDetail(orderId)
  },
}
