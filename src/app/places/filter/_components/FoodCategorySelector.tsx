'use client'

import { FoodTypeListItem } from '@/types/api/place'
import Image from 'next/image'

interface FoodCategorySelectorProps {
  foodTypes: FoodTypeListItem[]
  selectedFoodTypes: string[]
  onToggle: (id: string) => void
}

export default function FoodCategorySelector({
  foodTypes,
  selectedFoodTypes,
  onToggle,
}: FoodCategorySelectorProps) {
  return (
    <section className="px-4 py-5 bg-white border-y border-[#eeeeee] box-border">
      <h2 className="mb-[15px] text-sm leading-[14px]">음식종류</h2>
      <div className="grid grid-cols-4 gap-2">
        {foodTypes.map((foodType) => {
          const isSelected = selectedFoodTypes.includes(foodType.code)
          return (
            <button
              key={foodType.code}
              onClick={() => onToggle(foodType.code)}
              className={`flex flex-col items-center justify-center border ${
                isSelected ? 'border-main' : 'border-[#eeeeee]'
              } px-5 py-[17px]`}
              style={{ aspectRatio: '80 / 95' }}
            >
              <div
                className={`relative flex items-center justify-center w-full h-12 mb-[15px] ${!isSelected ? 'opacity-50' : ''}`}
              >
                <Image
                  src={foodType.imageUrl}
                  alt={foodType.name}
                  width={56}
                  height={35}
                  className="object-contain max-w-full max-h-full"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
              <span
                className={`text-xs leading-[12px] whitespace-nowrap ${isSelected ? 'text-main' : 'text-[#cccccc] opacity-50'}`}
              >
                {foodType.name}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
