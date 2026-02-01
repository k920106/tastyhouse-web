'use client'

import type { ProductDetailResponse } from '@/domains/product'
import type { CartSelectedOption } from '@/lib/cart'
import { getCartData } from '@/lib/cart'
import { getPlaceName } from '@/services/place'
import { getProductById } from '@/services/product'
import { OrderItem } from '@/types/api/order'
import { useCallback, useEffect, useState } from 'react'

export interface OrderInfo {
  placeName: string
  items: OrderItem[]
  firstProductName: string
}

const INITIAL_ORDER_INFO: OrderInfo = {
  placeName: '',
  items: [],
  firstProductName: '',
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
): { price: number; originalPrice: number; discountPrice: number } {
  const basePrice = detail.discountPrice ?? detail.originalPrice
  const originalPrice = detail.originalPrice
  const discountPrice = originalPrice - basePrice

  const optionAdditionalPrice = selectedOptions.reduce((sum, so) => {
    const group = detail.optionGroups.find((g) => g.id === so.groupId)
    const option = group?.options.find((o) => o.id === so.optionId)
    return sum + (option?.additionalPrice ?? 0)
  }, 0)

  return {
    price: basePrice + optionAdditionalPrice,
    originalPrice: originalPrice + optionAdditionalPrice,
    discountPrice,
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

    const placeId = cart.placeId
    const placeNameResult = await getPlaceName(placeId)

    const uniqueProductIds = [...new Set(cart.products.map((p) => p.productId))]
    const productDetailMap = await fetchProductDetails(uniqueProductIds)

    const items: OrderItem[] = cart.products
      .map((cartProduct) => {
        const productDetail = productDetailMap.get(cartProduct.productId)
        if (!productDetail) return null

        const { price, originalPrice, discountPrice } = calculateItemPrice(
          productDetail,
          cartProduct.selectedOptions,
        )

        return {
          name: productDetail.name,
          imageUrl: productDetail.imageUrls[0] ?? '',
          price,
          originalPrice,
          discountPrice,
          quantity: cartProduct.quantity,
        }
      })
      .filter((item): item is OrderItem => item !== null)

    setOrderInfo({
      placeName: placeNameResult.data?.data?.name ?? '',
      items,
      firstProductName: items[0]?.name ?? '',
    })
  }, [])

  useEffect(() => {
    loadOrderInfo()
  }, [loadOrderInfo])

  return orderInfo
}
