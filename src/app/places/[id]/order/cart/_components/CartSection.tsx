'use client'

import CartItem from '@/components/cart/CartItem'
import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import SelectAllCheckbox from '@/components/order/SelectAllCheckbox'
import AppButton from '@/components/ui/AppButton'
import BorderedSection from '@/components/ui/BorderedSection'
import FixedBottomSection from '@/components/ui/FixedBottomSection'
import SectionStack from '@/components/ui/SectionStack'
import {
  CartItemData,
  getCartItemsByPlace,
  removeFromCart,
  updateCartItemQuantity,
} from '@/lib/cart'
import { formatNumber } from '@/lib/number'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LiaPlusSolid } from 'react-icons/lia'

interface CartSectionProps {
  placeId: number
}

interface CartItemWithSelection extends CartItemData {
  selected: boolean
}

export default function CartSection({ placeId }: CartSectionProps) {
  const router = useRouter()

  const [cartItems, setCartItems] = useState<CartItemWithSelection[]>([])

  useEffect(() => {
    const items = getCartItemsByPlace(placeId)
    setCartItems(items.map((item) => ({ ...item, selected: true })))
  }, [placeId])

  const allSelected = cartItems.length > 0 && cartItems.every((item) => item.selected)
  const selectedCount = cartItems.filter((item) => item.selected).length

  const totalProductPrice = cartItems
    .filter((item) => item.selected)
    .reduce((sum, item) => {
      const itemPrice = item.basePrice + item.selectedOptions.reduce((opt, o) => opt + o.additionalPrice, 0)
      return sum + itemPrice * item.quantity
    }, 0)

  const totalDiscountAmount = cartItems
    .filter((item) => item.selected && item.originalPrice > item.basePrice)
    .reduce((sum, item) => sum + (item.originalPrice - item.basePrice) * item.quantity, 0)

  const totalPaymentPrice = totalProductPrice

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
    const selectedOptionKeys = cartItems.filter((item) => item.selected).map((item) => item.optionKey)
    selectedOptionKeys.forEach((key) => removeFromCart(key))
    setCartItems((items) => items.filter((item) => !item.selected))
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
                  <h2 className="py-5 text-base leading-[16px]">{cartItems[0]?.placeName}</h2>
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
            <span className="text-sm leading-[14px]">{formatNumber(totalProductPrice)}원</span>
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
            <span className="text-[#a91201]">{formatNumber(totalPaymentPrice)}원</span>
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
