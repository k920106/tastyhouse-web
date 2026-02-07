'use server'

import type { OrderCreateRequest } from '@/domains/order'
import { orderService } from '@/domains/order'

export async function createOrder(request: OrderCreateRequest) {
  return await orderService.createOrder(request)
}

export async function getOrderDetail(orderId: number) {
  return await orderService.getOrderDetail(orderId)
}
