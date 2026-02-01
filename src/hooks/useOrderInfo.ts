'use client'

import { useCallback, useEffect, useState } from 'react'
import type { CartSelectedOption } from '@/lib/cart'
import { getCartData, getCartProductTypeCount } from '@/lib/cart'
import type { ProductDetailResponse } from '@/domains/product'
import { getProductById } from '@/services/product'

export interface OrderItem {
  name: string
  imageUrl: string
  price: number
  quantity: number
}

export interface OrderInfo {
  placeName: string
  items: OrderItem[]
  firstProductName: string
  totalItemCount: number
}

const INITIAL_ORDER_INFO: OrderInfo = {
  placeName: '',
  items: [],
  firstProductName: '',
  totalItemCount: 0,
}

function calculateItemPrice(
  detail: ProductDetailResponse,
  selectedOptions: CartSelectedOption[],
): number {
  const basePrice = detail.discountPrice ?? detail.originalPrice

  const optionAdditionalPrice = selectedOptions.reduce((sum, so) => {
    const group = detail.optionGroups.find((g) => g.id === so.groupId)
    const option = group?.options.find((o) => o.id === so.optionId)
    return sum + (option?.additionalPrice ?? 0)
  }, 0)

  return basePrice + optionAdditionalPrice
}

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

        return {
          name: detail.name,
          imageUrl: detail.imageUrls[0] ?? '',
          price: calculateItemPrice(detail, cartProduct.selectedOptions),
          quantity: cartProduct.quantity,
        }
      })
      .filter((item): item is OrderItem => item !== null)

    const firstDetail = productDetailMap.values().next().value

    setOrderInfo({
      placeName: firstDetail?.placeName ?? '',
      items,
      firstProductName: items[0]?.name ?? '',
      totalItemCount: getCartProductTypeCount(),
    })
  }, [])

  useEffect(() => {
    loadOrderInfo()
  }, [loadOrderInfo])

  return orderInfo
}
