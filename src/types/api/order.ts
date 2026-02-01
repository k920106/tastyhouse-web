export interface OrderItemOption {
  groupId: number
  groupName: string
  optionId: number
  optionName: string
  additionalPrice: number
}

export interface OrderItem {
  optionKey: string
  name: string
  imageUrl: string
  price: number
  quantity: number
  originalPrice: number
  discountPrice: number
  selectedOptions: OrderItemOption[]
}
