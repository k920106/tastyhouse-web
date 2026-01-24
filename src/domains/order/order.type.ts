export type OrderMethod = 'TABLE_ORDER' | 'RESERVATION' | 'DELIVERY' | 'TAKEOUT'

export type OrderMethodItem = {
  code: OrderMethod
  name: string
}
