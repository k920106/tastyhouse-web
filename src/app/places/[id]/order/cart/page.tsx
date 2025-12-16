'use client'

import CartItem from '@/components/cart/CartItem'
import { CartItem as CartItemType } from '@/types/api/cart'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function CartPage() {
  const params = useParams()
  const placeId = params.id as string

  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: 1,
      name: '매뉴이름은여기까지표시...',
      imageUrl: '/placeholder-food.jpg',
      price: 7900,
      originalPrice: undefined,
      quantity: 1,
      selected: true,
      placeName: '땡스오트',
    },
    {
      id: 2,
      name: '블루나잇',
      imageUrl: '/placeholder-food.jpg',
      price: 7500,
      originalPrice: 8500,
      quantity: 1,
      selected: true,
      placeName: '땡스오트',
    },
    {
      id: 3,
      name: '아보카도 햄치즈 샌드위치',
      imageUrl: '/placeholder-food.jpg',
      price: 17000,
      originalPrice: undefined,
      quantity: 2,
      selected: false,
      placeName: '땡스오트',
    },
  ])

  const allSelected = cartItems.length > 0 && cartItems.every((item) => item.selected)
  const selectedCount = cartItems.filter((item) => item.selected).length

  const totalProductPrice = cartItems
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)

  const totalDiscountAmount = cartItems
    .filter((item) => item.selected && item.originalPrice)
    .reduce((sum, item) => sum + (item.originalPrice! - item.price) * item.quantity, 0)

  const totalPaymentPrice = totalProductPrice

  const handleToggleSelectAll = () => {
    setCartItems((items) =>
      items.map((item) => ({
        ...item,
        selected: !allSelected,
      })),
    )
  }

  const handleToggleSelect = (id: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)),
    )
  }

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const handleRemove = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const handleDeleteSelected = () => {
    setCartItems((items) => items.filter((item) => !item.selected))
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 bg-white z-10 border-b border-[#eeeeee]">
        <div className="flex items-center h-14 px-4">
          <Link href="/" className="mr-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-medium">장바구니</h1>
        </div>
      </header>
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#eeeeee]">
        <button onClick={handleToggleSelectAll} className="flex items-center gap-2">
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              allSelected ? 'bg-main border-main' : 'border-[#dddddd]'
            }`}
          >
            {allSelected && (
              <svg width="12" height="9" viewBox="0 0 14 11" fill="none">
                <path
                  d="M1 5.5L5 9.5L13 1.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <span className="text-[15px]">
            전체선택 ({selectedCount}/{cartItems.length})
          </span>
        </button>
        <button onClick={handleDeleteSelected} className="text-[15px] text-[#aaaaaa]">
          삭제
        </button>
      </div>
      <div className="flex-1">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32">
            <p className="text-[#aaaaaa] mb-6">장바구니가 비어있습니다.</p>
            <Link href="/" className="text-main text-[15px] font-medium underline">
              메뉴 담으러 가기
            </Link>
          </div>
        ) : (
          <>
            <div className="px-4">
              <h2 className="text-[15px] font-medium py-3">땡스오트</h2>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  onToggleSelect={handleToggleSelect}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            <div className="mt-6 px-4">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 py-4 text-main text-[15px] font-medium"
              >
                <span className="text-xl">+</span>
                <span>메뉴 담으러 가기</span>
              </Link>
            </div>
          </>
        )}
      </div>
      <div className="px-4 py-6 border-t-8 border-[#f5f5f5]">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-[15px]">
            <span className="text-[#666666]">상품금액</span>
            <span>{totalProductPrice.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between text-[15px]">
            <span className="text-[#666666]">상품할인금액</span>
            <span>
              {totalDiscountAmount > 0 ? '-' : ''}
              {totalDiscountAmount.toLocaleString()}원
            </span>
          </div>
          <div className="flex justify-between text-base font-medium">
            <span>결제예정금액</span>
            <span className="text-main">{totalPaymentPrice.toLocaleString()}원</span>
          </div>
        </div>
        <Link
          href={`/places/${placeId}/order/checkout`}
          onClick={(e) => selectedCount === 0 && e.preventDefault()}
          className={`block w-full py-4 text-white text-base font-medium text-center ${
            selectedCount === 0 ? 'bg-[#cccccc] pointer-events-none' : 'bg-main'
          }`}
        >
          주문하기
        </Link>
      </div>
    </div>
  )
}
