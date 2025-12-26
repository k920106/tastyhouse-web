'use client'

import { formatDecimal } from '@/lib/number'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import { LuSlidersHorizontal } from 'react-icons/lu'
import { TbQrcode } from 'react-icons/tb'

interface Place {
  id: number
  imageUrl: string
  name: string
  rating: number
  stationName: string
  reviewCount: number
  favoriteCount: number
  tags: string[]
}

// Mock data - 실제 API 연동 시 교체
const MOCK_PLACES: Place[] = [
  {
    id: 1,
    imageUrl: '/images/sample/place-sample-01.jpg',
    name: '가게이름이길어지면...',
    rating: 4.9,
    stationName: '이태원역',
    reviewCount: 89,
    favoriteCount: 14,
    tags: ['브런치', '스테이크'],
  },
  {
    id: 2,
    imageUrl: '/images/sample/place-sample-02.jpg',
    name: '리틀넥 창단',
    rating: 4.8,
    stationName: '압구정로데오역',
    reviewCount: 89,
    favoriteCount: 14,
    tags: ['브런치', '스테이크'],
  },
  {
    id: 3,
    imageUrl: '/images/sample/place-sample-01.jpg',
    name: '가게이름이길어지면...',
    rating: 4.9,
    stationName: '이태원역',
    reviewCount: 89,
    favoriteCount: 14,
    tags: ['브런치', '스테이크'],
  },
  {
    id: 4,
    imageUrl: '/images/sample/place-sample-02.jpg',
    name: '리틀넥 창단',
    rating: 4.8,
    stationName: '압구정로데오역',
    reviewCount: 89,
    favoriteCount: 14,
    tags: ['브런치', '스테이크'],
  },
]

export default function PlacePage() {
  const [sortOption, setSortOption] = useState('전체')
  const [showSortMenu, setShowSortMenu] = useState(false)

  const totalCount = 127

  return (
    <>
      <header className="relative flex items-center h-[60px] bg-main">
        <button className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center cursor-pointer">
          <Image src="/images/icon-menu.png" alt="메뉴" width={22} height={22} />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-[17px] text-white">플레이스</h1>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
          <button className="w-14 h-14 flex items-center justify-center cursor-pointer">
            <TbQrcode size={26} color="white" strokeWidth={1.5} />
          </button>
          <button className="w-14 h-14 flex items-center justify-center cursor-pointer">
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Image
                src="/images/icon-cart.png"
                alt="장바구니"
                width={44}
                height={44}
                className="z-1"
              />
              <span className="absolute top-2 right-1 flex items-center justify-center w-4 h-4 text-[10px] text-white bg-main">
                99
              </span>
            </div>
          </button>
        </div>
      </header>

      <div className="min-h-screen bg-white pb-[100px]">
        {/* Filter bar */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#eeeeee]">
          <div className="text-[15px] text-[#333333]">총 {totalCount}개</div>
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-1 text-[15px] text-[#333333]"
              >
                {sortOption}
                <IoChevronDown size={16} />
              </button>
              {showSortMenu && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-[#eeeeee] rounded shadow-lg z-10">
                  {['전체', '최신순', '평점순', '리뷰많은순'].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortOption(option)
                        setShowSortMenu(false)
                      }}
                      className="block w-full px-4 py-2 text-left text-sm hover:bg-[#f9f9f9] whitespace-nowrap"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="p-1">
              <LuSlidersHorizontal size={20} color="#333333" />
            </button>
          </div>
        </div>

        {/* Places grid */}
        <div className="px-[15px] pt-5">
          <ul className="grid grid-cols-2 gap-3">
            {MOCK_PLACES.map((place, index) => (
              <li key={`${place.id}-${index}`}>
                <Link href={PAGE_PATHS.PLACE_DETAIL(place.id)} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-sm">
                    <Image
                      src={place.imageUrl}
                      alt={place.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="py-[15px]">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs text-[#999999]">{place.stationName}</span>
                      <span className="text-[19px] text-main">
                        {formatDecimal(place.rating, 1)}
                      </span>
                    </div>
                    <h3 className="mb-1.5 text-[15px] truncate">{place.name}</h3>
                    <div className="mb-2.5 flex items-center gap-1.5 text-xs text-[#999999]">
                      <span>리뷰 {place.reviewCount}</span>
                      <span>찜 {place.favoriteCount}</span>
                    </div>
                    <div className="flex gap-1.5 overflow-hidden">
                      {place.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="inline-block px-2.5 py-1 text-xs text-[#666666] bg-[#f5f5f5] rounded-[14px] whitespace-nowrap flex-shrink-0"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
