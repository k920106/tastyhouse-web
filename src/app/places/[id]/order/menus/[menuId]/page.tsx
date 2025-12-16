'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoChevronBack, IoShareOutline } from 'react-icons/io5'

// Mock data - Replace with actual API call
const MOCK_MENU = {
  id: 1,
  name: '아보카도 햄치즈 샌드위치',
  description:
    '슬라이스 아보카도와 리코타치즈, 수란, 베이컨에 페퍼론치노를 곁들인 샌드위치 입니다.',
  price: 18500,
  imageUrl: '/images/sample/place-sample-01.jpg',
  placeName: '리틀넥 청담',
}

type SpiceLevel = '순한맛' | '기본맛' | '매운맛'

export default function MenuDetailPage({
  params,
}: {
  params: { placeId: string; menuId: string }
}) {
  const router = useRouter()
  const [selectedSpice, setSelectedSpice] = useState<SpiceLevel>('순한맛')

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Added to cart:', {
      menuId: params.menuId,
      placeId: params.placeId,
      spiceLevel: selectedSpice,
    })
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between h-[60px] px-4 bg-white">
        <button onClick={() => router.back()} className="p-2 -ml-2">
          <IoChevronBack size={24} />
        </button>
        <div className="flex items-center gap-2">
          <button className="p-2">
            <IoShareOutline size={24} />
          </button>
          <button className="p-2 -mr-2 relative">
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Image
                src="/images/icon-cart.png"
                alt="장바구니"
                width={44}
                height={44}
                className="z-1"
              />
              <span className="absolute top-2 right-1 flex items-center justify-center w-4 h-4 text-[10px] text-white bg-main">
                0
              </span>
            </div>
          </button>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative w-full aspect-[16/9]">
        <Image src={MOCK_MENU.imageUrl} alt={MOCK_MENU.name} fill className="object-cover" />
      </div>

      {/* Menu Info */}
      <div className="px-4 py-5">
        <h2 className="text-[19px] font-medium mb-3">{MOCK_MENU.name}</h2>

        <p className="text-[15px] text-[#666666] leading-[1.6] mb-4">{MOCK_MENU.description}</p>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-[26px] text-main font-medium">
            {MOCK_MENU.price.toLocaleString()}원
          </span>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-[#eeeeee] -mx-4 mb-6" />

        {/* Spice Level Selection */}
        <div className="mb-6">
          <h3 className="text-[15px] font-medium mb-3">맵기조절</h3>
          <div className="space-y-3">
            {(['순한맛', '기본맛', '매운맛'] as SpiceLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setSelectedSpice(level)}
                className="flex items-center gap-3 w-full"
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedSpice === level ? 'border-main' : 'border-[#dddddd]'
                  }`}
                >
                  {selectedSpice === level && <div className="w-4 h-4 rounded-full bg-main" />}
                </div>
                <span className="text-[15px]">{level}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
        <button
          onClick={handleAddToCart}
          className="w-full max-w-[500px] py-4 px-4 bg-main text-white text-[17px] font-medium"
        >
          장바구니 담기
        </button>
      </div>
    </div>
  )
}
