'use client'

import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

interface MenuItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  discountRate?: number
  imageUrl: string
  rating: number
  reviewCount: number
  isSpicy?: boolean
}

export default function MenusPage() {
  const router = useRouter()
  const params = useParams()
  const placeId = params.id as string

  // Mock data - 실제로는 API에서 가져와야 함
  const mainMenus: MenuItem[] = [
    {
      id: 1,
      name: '명란 크림 파스타',
      price: 18000,
      originalPrice: 18500,
      discountRate: 10,
      imageUrl: '/placeholder-menu.jpg',
      rating: 3.5,
      reviewCount: 24,
      isSpicy: true,
    },
    {
      id: 2,
      name: '명란 크림 파스타',
      price: 18000,
      imageUrl: '/placeholder-menu.jpg',
      rating: 3.5,
      reviewCount: 24,
      isSpicy: true,
    },
    {
      id: 3,
      name: '명란 크림 파스타',
      price: 18000,
      originalPrice: 18500,
      imageUrl: '/placeholder-menu.jpg',
      rating: 3.5,
      reviewCount: 24,
    },
  ]

  const sideMenus: MenuItem[] = [
    {
      id: 4,
      name: '명란 크림 파스타',
      price: 18000,
      originalPrice: 18500,
      imageUrl: '/placeholder-menu.jpg',
      rating: 3.5,
      reviewCount: 24,
      isSpicy: true,
    },
    {
      id: 5,
      name: '명란 크림 파스타',
      price: 18000,
      originalPrice: 18500,
      imageUrl: '/placeholder-menu.jpg',
      rating: 3.5,
      reviewCount: 24,
      isSpicy: true,
    },
    {
      id: 6,
      name: '명란 크림 파스타',
      price: 18000,
      originalPrice: 18500,
      imageUrl: '/placeholder-menu.jpg',
      rating: 3.5,
      reviewCount: 24,
      isSpicy: true,
    },
  ]

  const renderMenuItem = (menu: MenuItem) => (
    <Link
      key={menu.id}
      href={PAGE_PATHS.ORDER_MENU_DETAIL(placeId, menu.id)}
      className="flex items-center gap-3 py-4 border-b border-gray-100"
    >
      {/* Menu Image */}
      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={menu.imageUrl}
          alt={menu.name}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
          }}
        />
      </div>

      {/* Menu Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-1 mb-1">
          {/* Spicy Icon */}
          {menu.isSpicy && (
            <div className="flex gap-0.5 flex-shrink-0">
              <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2Z" />
              </svg>
              <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2Z" />
              </svg>
            </div>
          )}

          {/* Menu Name */}
          <h3 className=" text-gray-900 leading-tight">{menu.name}</h3>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg font-bold text-gray-900">{menu.price.toLocaleString()}원</span>
          {menu.originalPrice && (
            <>
              <span className="text-sm text-gray-400 line-through">
                {menu.originalPrice.toLocaleString()}원
              </span>
              {menu.discountRate && (
                <span className="text-sm font-bold text-red-600">{menu.discountRate}%</span>
              )}
            </>
          )}
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span className="text-red-600">{menu.rating}</span>
          <span>리뷰({menu.reviewCount})</span>
        </div>
      </div>

      {/* Rating Badge */}
      <div className="flex-shrink-0 text-right">
        <div className="text-2xl font-bold text-red-600">{menu.rating}</div>
        <div className="text-xs text-gray-400">리뷰({menu.reviewCount})</div>
      </div>
    </Link>
  )

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b sticky top-0 bg-white z-10">
        <button onClick={() => router.back()} className="p-2" aria-label="뒤로가기">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center">바로 주문하기</h1>
        <button className="p-2 text-gray-700">변경</button>
      </header>

      {/* Content */}
      <div className="flex-1 px-4">
        {/* Main Menus Section */}
        <section className="py-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">대표 메뉴</h2>
          <div className="space-y-0">{mainMenus.map((menu) => renderMenuItem(menu))}</div>
        </section>

        {/* Side Menus Section */}
        <section className="py-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">사이드 메뉴</h2>
          <div className="space-y-0">{sideMenus.map((menu) => renderMenuItem(menu))}</div>
        </section>
      </div>

      {/* Bottom Cart Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-4">
        <Link
          href={PAGE_PATHS.ORDER_CART(placeId)}
          className="w-full py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg text-white text-lg font-bold transition-colors"
        >
          장바구니 (0)
        </Link>
      </div>
    </div>
  )
}
