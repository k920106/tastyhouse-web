'use client'

import type { ProductDetailResponse } from '@/domains/product'
import type { CartSelectedOption } from '@/lib/cart'
import { getCartData, getCartProductTypeCount } from '@/lib/cart'
import { getProductById } from '@/services/product'
import { useCallback, useEffect, useState } from 'react'

export interface OrderItem {
  name: string
  imageUrl: string
  price: number
  quantity: number
  originalPrice: number
}

export interface OrderInfo {
  placeName: string
  items: OrderItem[]
  firstProductName: string
  totalItemCount: number
  totalProductDiscount: number
}

const INITIAL_ORDER_INFO: OrderInfo = {
  placeName: '',
  items: [],
  firstProductName: '',
  totalItemCount: 0,
  totalProductDiscount: 0,
}

/**
 * 상품 가격을 계산합니다.
 *
 * @param detail - 상품 상세 정보
 * @param selectedOptions - 선택된 옵션
 * @returns 상품 가격과 원래 가격
 */
function calculateItemPrice(
  detail: ProductDetailResponse,
  selectedOptions: CartSelectedOption[],
): { price: number; originalPrice: number } {
  const basePrice = detail.discountPrice ?? detail.originalPrice
  const baseOriginalPrice = detail.originalPrice

  const optionAdditionalPrice = selectedOptions.reduce((sum, so) => {
    const group = detail.optionGroups.find((g) => g.id === so.groupId)
    const option = group?.options.find((o) => o.id === so.optionId)
    return sum + (option?.additionalPrice ?? 0)
  }, 0)

  return {
    price: basePrice + optionAdditionalPrice,
    originalPrice: baseOriginalPrice + optionAdditionalPrice,
  }
}

/**
 * 상품 상세 정보를 조회합니다.
 *
 * @param productIds - 상품 ID 목록
 * @returns 상품 상세 정보 맵
 */
async function fetchProductDetails(
  productIds: number[],
): Promise<Map<number, ProductDetailResponse>> {
  const results = await Promise.all(productIds.map((id) => getProductById(id)))
  const detailMap = new Map<number, ProductDetailResponse>()

  results.forEach((result, index) => {
    if (result.data?.data) {
      detailMap.set(productIds[index], result.data.data)
    }
  })

  return detailMap
}

export function useOrderInfo() {
  const [orderInfo, setOrderInfo] = useState<OrderInfo>(INITIAL_ORDER_INFO)

  const loadOrderInfo = useCallback(async () => {
    const cart = getCartData()
    if (!cart || cart.products.length === 0) return

    const uniqueProductIds = [...new Set(cart.products.map((p) => p.productId))]
    const productDetailMap = await fetchProductDetails(uniqueProductIds)

    const items: OrderItem[] = cart.products
      .map((cartProduct) => {
        const detail = productDetailMap.get(cartProduct.productId)
        if (!detail) return null

        const { price, originalPrice } = calculateItemPrice(detail, cartProduct.selectedOptions)

        return {
          name: detail.name,
          imageUrl: detail.imageUrls[0] ?? '',
          price,
          originalPrice,
          quantity: cartProduct.quantity,
        }
      })
      .filter((item): item is OrderItem => item !== null)

    const firstDetail = productDetailMap.values().next().value

    const totalProductDiscount = items.reduce((sum, item) => {
      const itemDiscount = (item.originalPrice - item.price) * item.quantity
      return sum + itemDiscount
    }, 0)

    setOrderInfo({
      placeName: firstDetail?.placeName ?? '',
      items,
      firstProductName: items[0]?.name ?? '',
      totalItemCount: getCartProductTypeCount(),
      totalProductDiscount,
    })
  }, [])

  useEffect(() => {
    loadOrderInfo()
  }, [loadOrderInfo])

  return orderInfo
}
