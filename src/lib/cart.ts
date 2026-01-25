'use client'

export interface SelectedOption {
  groupId: number
  groupName: string
  optionId: number
  optionName: string
  additionalPrice: number
}

export interface CartItemData {
  productId: number
  placeId: number
  placeName: string
  productName: string
  imageUrl: string
  basePrice: number
  originalPrice: number
  quantity: number
  selectedOptions: SelectedOption[]
  optionKey: string // 동일 상품+옵션 식별용 키
}

const CART_STORAGE_KEY = 'cart'

/**
 * 선택한 옵션들로 고유 키 생성
 * 같은 상품이라도 옵션이 다르면 다른 항목으로 취급
 */
export function generateOptionKey(productId: number, selectedOptions: SelectedOption[]): string {
  const sortedOptions = [...selectedOptions].sort((a, b) => a.groupId - b.groupId)
  const optionIds = sortedOptions.map((opt) => `${opt.groupId}:${opt.optionId}`).join('|')
  return `${productId}_${optionIds}`
}

/**
 * localStorage에서 장바구니 데이터 조회
 */
export function getCartItems(): CartItemData[] {
  if (typeof window === 'undefined') return []

  try {
    const data = localStorage.getItem(CART_STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

/**
 * 특정 가게의 장바구니 아이템 조회
 */
export function getCartItemsByPlace(placeId: number): CartItemData[] {
  return getCartItems().filter((item) => item.placeId === placeId)
}

/**
 * 장바구니에 상품 추가
 * 같은 상품+옵션 조합이면 수량만 증가
 */
export function addToCart(
  item: Omit<CartItemData, 'optionKey' | 'quantity'>,
  quantity: number = 1,
): CartItemData[] {
  const items = getCartItems()
  const optionKey = generateOptionKey(item.productId, item.selectedOptions)

  const existingIndex = items.findIndex((cartItem) => cartItem.optionKey === optionKey)

  if (existingIndex >= 0) {
    // 기존 항목이 있으면 수량 증가
    items[existingIndex].quantity += quantity
  } else {
    // 새 항목 추가
    items.push({
      ...item,
      optionKey,
      quantity,
    })
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  return items
}

/**
 * 장바구니 아이템 수량 변경
 */
export function updateCartItemQuantity(optionKey: string, quantity: number): CartItemData[] {
  const items = getCartItems()
  const index = items.findIndex((item) => item.optionKey === optionKey)

  if (index >= 0) {
    if (quantity <= 0) {
      items.splice(index, 1)
    } else {
      items[index].quantity = quantity
    }
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  return items
}

/**
 * 장바구니에서 아이템 제거
 */
export function removeFromCart(optionKey: string): CartItemData[] {
  const items = getCartItems().filter((item) => item.optionKey !== optionKey)
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  return items
}

/**
 * 특정 가게의 장바구니 전체 삭제
 */
export function clearCartByPlace(placeId: number): CartItemData[] {
  const items = getCartItems().filter((item) => item.placeId !== placeId)
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  return items
}

/**
 * 전체 장바구니 삭제
 */
export function clearCart(): void {
  localStorage.removeItem(CART_STORAGE_KEY)
}

/**
 * 특정 가게의 장바구니 아이템 수 조회
 */
export function getCartItemCount(placeId: number): number {
  return getCartItemsByPlace(placeId).reduce((sum, item) => sum + item.quantity, 0)
}
