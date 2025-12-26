'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'
import { RxReset } from 'react-icons/rx'

interface FoodCategory {
  id: string
  label: string
  imagePath: string
}

interface Facility {
  id: string
  label: string
  imagePath?: string
  text?: string
}

const FOOD_CATEGORIES: FoodCategory[] = [
  { id: 'korean', label: '한식', imagePath: '/images/filter/korean.png' },
  { id: 'japanese', label: '일식', imagePath: '/images/filter/japanese.png' },
  { id: 'western', label: '양식', imagePath: '/images/filter/western.png' },
  { id: 'chinese', label: '중식', imagePath: '/images/filter/chinese.png' },
  { id: 'world', label: '세계음식', imagePath: '/images/filter/world.png' },
  { id: 'snack', label: '분식', imagePath: '/images/filter/snack.png' },
  { id: 'alcohol', label: '주점', imagePath: '/images/filter/alcohol.png' },
  { id: 'cafe', label: '카페', imagePath: '/images/filter/cafe.png' },
]

const FACILITIES: Facility[] = [
  { id: 'parking', label: '주차', text: 'P' },
  { id: 'group', label: '내부화장실', imagePath: '/images/filter/group.png' },
  { id: 'reservation', label: '예약', imagePath: '/images/filter/reservation.png' },
  { id: 'kids', label: '아기의자', imagePath: '/images/filter/kids.png' },
  { id: 'pet', label: '애견동반', imagePath: '/images/filter/pet.png' },
  { id: 'outlet', label: '개별 콘센트', imagePath: '/images/filter/outlet.png' },
  { id: 'packing', label: '포장', imagePath: '/images/filter/packing.png' },
  { id: 'delivery', label: '배달', imagePath: '/images/filter/delivery.png' },
]

export default function FilterPage() {
  const router = useRouter()
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedFoodCategories, setSelectedFoodCategories] = useState<string[]>([])
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])

  const toggleFoodCategory = (id: string) => {
    setSelectedFoodCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const toggleFacility = (id: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const handleReset = () => {
    setSelectedLocation('')
    setSelectedFoodCategories([])
    setSelectedFacilities([])
  }

  const handleApplyFilter = () => {
    router.back()
  }

  const hasSelection =
    selectedLocation || selectedFoodCategories.length > 0 || selectedFacilities.length > 0

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="relative flex items-center h-[60px] border-b border-[#eeeeee]">
        <button
          onClick={() => router.back()}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center cursor-pointer"
        >
          <IoChevronBack size={24} color="#333333" />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-[17px] text-[#333333]">필터</h1>
        </div>
        <button
          onClick={handleReset}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
        >
          <RxReset size={22} color="#333333" />
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-[80px]">
        {/* 지역 섹션 */}
        <section className="px-4 py-5 border-b border-[#eeeeee]">
          <h2 className="mb-3 text-[15px] text-[#333333]">지역</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              placeholder="지역을 선택해주세요."
              className="flex-1 h-10 px-3 text-[15px] text-[#333333] placeholder:text-[#cccccc] border border-[#eeeeee] rounded focus:outline-none focus:border-[#666666]"
              readOnly
            />
            <button
              onClick={() => setSelectedLocation('서울시 마포구')}
              className="px-4 h-10 text-[14px] text-[#333333] border border-[#eeeeee] rounded whitespace-nowrap"
            >
              지역선택
            </button>
          </div>
        </section>

        {/* 음식종류 섹션 */}
        <section className="px-4 py-5 border-b border-[#eeeeee]">
          <h2 className="mb-3 text-[15px] text-[#333333]">음식종류</h2>
          <div className="grid grid-cols-4 gap-2">
            {FOOD_CATEGORIES.map((category) => {
              const isSelected = selectedFoodCategories.includes(category.id)
              return (
                <button
                  key={category.id}
                  onClick={() => toggleFoodCategory(category.id)}
                  className={`flex flex-col items-center justify-center aspect-square border rounded-lg transition-colors ${
                    isSelected
                      ? 'border-main bg-white'
                      : 'border-[#eeeeee] bg-white hover:bg-[#f9f9f9]'
                  }`}
                >
                  <div className="relative w-12 h-12 mb-2">
                    <Image
                      src={category.imagePath}
                      alt={category.label}
                      fill
                      className={`object-contain ${isSelected ? '' : 'opacity-40 grayscale'}`}
                    />
                  </div>
                  <span className={`text-[13px] ${isSelected ? 'text-main' : 'text-[#999999]'}`}>
                    {category.label}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* 편의시설 섹션 */}
        <section className="px-4 py-5">
          <h2 className="mb-3 text-[15px] text-[#333333]">편의시설</h2>
          <div className="grid grid-cols-4 gap-2">
            {FACILITIES.map((facility) => {
              const isSelected = selectedFacilities.includes(facility.id)
              return (
                <button
                  key={facility.id}
                  onClick={() => toggleFacility(facility.id)}
                  className={`flex flex-col items-center justify-center aspect-square border rounded-lg transition-colors ${
                    isSelected
                      ? 'border-main bg-white'
                      : 'border-[#eeeeee] bg-white hover:bg-[#f9f9f9]'
                  }`}
                >
                  <div className="relative w-12 h-12 mb-2 flex items-center justify-center">
                    {facility.text ? (
                      <span
                        className={`text-4xl font-light ${isSelected ? 'text-main' : 'text-[#cccccc]'}`}
                      >
                        {facility.text}
                      </span>
                    ) : (
                      <Image
                        src={facility.imagePath!}
                        alt={facility.label}
                        fill
                        className={`object-contain ${isSelected ? '' : 'opacity-40 grayscale'}`}
                      />
                    )}
                  </div>
                  <span className={`text-[13px] ${isSelected ? 'text-main' : 'text-[#999999]'}`}>
                    {facility.label}
                  </span>
                </button>
              )
            })}
          </div>
        </section>
      </div>

      {/* Apply Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#eeeeee]">
        <button
          onClick={handleApplyFilter}
          className={`w-full h-[52px] text-white rounded transition-colors ${
            hasSelection ? 'bg-main' : 'bg-[#ffb3ad]'
          }`}
        >
          필터 적용
        </button>
      </div>
    </div>
  )
}
