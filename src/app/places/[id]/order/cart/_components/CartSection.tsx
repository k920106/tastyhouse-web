'use client'

import CartItem from '@/components/cart/CartItem'
import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import SelectAllCheckbox from '@/components/order/SelectAllCheckbox'
import AppButton from '@/components/ui/AppButton'
import BorderedSection from '@/components/ui/BorderedSection'
import FixedBottomSection from '@/components/ui/FixedBottomSection'
import SectionStack from '@/components/ui/SectionStack'
import type { ProductDetailResponse } from '@/domains/product'
import { CartProduct, getCartData, removeFromCart, updateCartItemQuantity } from '@/lib/cart'
import { formatNumber } from '@/lib/number'
import { PAGE_PATHS } from '@/lib/paths'
import { getProductById } from '@/services/product'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { LiaPlusSolid } from 'react-icons/lia'

interface CartSectionProps {
  placeId: number
}

interface CartDisplayItem {
  optionKey: string
  productId: number
  productName: string
  imageUrl: string
  basePrice: number
  originalPrice: number
  quantity: number
  selectedOptions: Array<{
    groupId: number
    groupName: string
    optionId: number
    optionName: string
    additionalPrice: number
  }>
  selected: boolean
}

function buildDisplayItems(
  cartProducts: CartProduct[],
  productDetails: Map<number, ProductDetailResponse>,
): CartDisplayItem[] {
  return cartProducts
    .map((cartProduct) => {
      const detail = productDetails.get(cartProduct.productId)
      if (!detail) return null

      const selectedOptions = cartProduct.selectedOptions.map((so) => {
        const group = detail.optionGroups.find((g) => g.id === so.groupId)
        const option = group?.options.find((o) => o.id === so.optionId)
        return {
          groupId: so.groupId,
          groupName: group?.name ?? '',
          optionId: so.optionId,
          optionName: option?.name ?? '',
          additionalPrice: option?.additionalPrice ?? 0,
        }
      })

      const basePrice = detail.discountPrice ?? detail.originalPrice

      return {
        optionKey: cartProduct.optionKey,
        productId: cartProduct.productId,
        productName: detail.name,
        imageUrl: detail.imageUrls[0] ?? '',
        basePrice,
        originalPrice: detail.originalPrice,
        quantity: cartProduct.quantity,
        selectedOptions,
        selected: true as boolean,
      }
    })
    .filter((item): item is CartDisplayItem => item !== null)
}

export default function CartSection({ placeId }: CartSectionProps) {
  const router = useRouter()

  const [cartItems, setCartItems] = useState<CartDisplayItem[]>([])
  const [placeName, setPlaceName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchCartData = useCallback(async () => {
    const cart = getCartData()
    if (!cart || cart.products.length === 0) {
      setCartItems([])
      setIsLoading(false)
      return
    }

    const uniqueProductIds = [...new Set(cart.products.map((p) => p.productId))]
    const productDetails = new Map<number, ProductDetailResponse>()

    await Promise.all(
      uniqueProductIds.map(async (productId) => {
        const result = await getProductById(productId)
        if (result.data?.data) {
          productDetails.set(productId, result.data.data)
        }
      }),
    )

    const firstDetail = productDetails.values().next().value
    if (firstDetail) {
      setPlaceName(firstDetail.placeName)
    }

    const displayItems = buildDisplayItems(cart.products, productDetails)
    setCartItems(displayItems)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchCartData()
  }, [fetchCartData])

  const allSelected = cartItems.length > 0 && cartItems.every((item) => item.selected)
  const selectedCount = cartItems.filter((item) => item.selected).length

  const totalProductAmount = cartItems
    .filter((item) => item.selected)
    .reduce((sum, item) => {
      const itemPrice =
        item.basePrice + item.selectedOptions.reduce((opt, o) => opt + o.additionalPrice, 0)
      return sum + itemPrice * item.quantity
    }, 0)

  const totalDiscountAmount = cartItems
    .filter((item) => item.selected && item.originalPrice > item.basePrice)
    .reduce((sum, item) => sum + (item.originalPrice - item.basePrice) * item.quantity, 0)

  const totalPaymentAmount = totalProductAmount

  const handleToggleSelectAll = () => {
    setCartItems((items) =>
      items.map((item) => ({
        ...item,
        selected: !allSelected,
      })),
    )
  }

  const handleToggleSelect = (optionKey: string) => {
    setCartItems((items) =>
      items.map((item) =>
        item.optionKey === optionKey ? { ...item, selected: !item.selected } : item,
      ),
    )
  }

  const handleQuantityChange = (optionKey: string, quantity: number) => {
    updateCartItemQuantity(optionKey, quantity)
    setCartItems((items) =>
      items.map((item) => (item.optionKey === optionKey ? { ...item, quantity } : item)),
    )
  }

  const handleRemove = (optionKey: string) => {
    removeFromCart(optionKey)
    setCartItems((items) => items.filter((item) => item.optionKey !== optionKey))
  }

  const handleDeleteSelected = () => {
    const selectedOptionKeys = cartItems
      .filter((item) => item.selected)
      .map((item) => item.optionKey)
    selectedOptionKeys.forEach((key) => removeFromCart(key))
    setCartItems((items) => items.filter((item) => !item.selected))
  }

  if (isLoading) {
    return (
      <section className="min-h-screen flex flex-col bg-white">
        <Header variant="white" height={55}>
          <HeaderLeft>
            <BackButton />
          </HeaderLeft>
          <HeaderCenter>
            <h1 className="text-[17px] leading-[17px]">장바구니</h1>
          </HeaderCenter>
        </Header>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-[#aaaaaa]">장바구니를 불러오는 중...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen flex flex-col bg-white">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <h1 className="text-[17px] leading-[17px]">장바구니</h1>
        </HeaderCenter>
      </Header>
      <SectionStack>
        <BorderedSection className="border-t-0">
          <div className="flex items-center p-[15px]">
            <SelectAllCheckbox
              label="전체선택"
              selectedCount={selectedCount}
              totalCount={cartItems.length}
              checked={allSelected}
              onChange={handleToggleSelectAll}
            />
            <button
              onClick={handleDeleteSelected}
              className="ml-auto text-xs leading-[12px] text-[#999999]"
            >
              삭제
            </button>
          </div>
        </BorderedSection>
        <BorderedSection>
          <div>
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-base leading-[16px] text-[#aaaaaa]">장바구니가 비어있습니다.</p>
                <div className="mt-[15px]">
                  <Link
                    href={PAGE_PATHS.HOME}
                    className="text-sm leading-[14px] text-[#a91201] underline"
                  >
                    메뉴 담으러 가기
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="px-[15px] divide-y divide-[#f2f2f2]">
                  <h2 className="py-5 text-base leading-[16px]">{placeName}</h2>
                  {cartItems.map((item) => {
                    const itemPrice =
                      item.basePrice +
                      item.selectedOptions.reduce((sum, opt) => sum + opt.additionalPrice, 0)
                    return (
                      <CartItem
                        key={item.optionKey}
                        optionKey={item.optionKey}
                        name={item.productName}
                        imageUrl={item.imageUrl}
                        price={itemPrice}
                        originalPrice={item.originalPrice}
                        quantity={item.quantity}
                        selected={item.selected}
                        selectedOptions={item.selectedOptions}
                        onToggleSelect={handleToggleSelect}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemove}
                      />
                    )
                  })}
                </div>
                <div className="py-[18px] border-t border-[#f2f2f2] box-border">
                  <div
                    className="flex items-center justify-center gap-2.5 text-[#a91201]"
                    onClick={() => router.back()}
                  >
                    {cartItems.length > 0 && <LiaPlusSolid size={20} />}
                    <span className="text-sm leading-[14px]">메뉴 담으러 가기</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </BorderedSection>
      </SectionStack>
      <div className="px-[15px] py-5 border-t-8 border-[#f5f5f5] box-border">
        <div className="space-y-5">
          <div className="flex justify-between">
            <span className="text-sm leading-[14px]">상품금액</span>
            <span className="text-sm leading-[14px]">{formatNumber(totalProductAmount)}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm leading-[14px]">상품할인금액</span>
            <span className="text-sm leading-[14px]">
              {totalDiscountAmount > 0 ? '-' : ''}
              {formatNumber(totalDiscountAmount)}원
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm leading-[14px]">결제예정금액</span>
            <span className="text-[#a91201]">{formatNumber(totalPaymentAmount)}원</span>
          </div>
        </div>
        <FixedBottomSection className="px-[15px] py-2.5 !bg-[#f9f9f9]">
          <Link href={PAGE_PATHS.ORDER_CHECKOUT(placeId)}>
            <AppButton className="!bg-[#a91201]">주문하기</AppButton>
          </Link>
        </FixedBottomSection>
      </div>
    </section>
  )
}
