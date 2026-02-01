export type OrderMethod = 'TABLE_ORDER' | 'RESERVATION' | 'DELIVERY' | 'TAKEOUT'
export type PaymentMethod = 'CASH' | 'CARD' | 'CREDIT' | 'PHONE'

export type OrderMethodItem = {
  code: OrderMethod
  name: string
}
