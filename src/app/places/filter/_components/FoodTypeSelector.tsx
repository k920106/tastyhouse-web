'use client'

import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { PlaceFoodTypeListItem } from '@/types/api/place'
import Image from 'next/image'
import { useFilterState } from './FilterStateProvider'

export function FoodTypeSelectorSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center border border-[#eeeeee] px-5 py-[17px]"
          style={{ aspectRatio: '80 / 95' }}
        >
          <Skeleton className="w-[38px] h-[38px] mb-[15px]" />
          <Skeleton className="w-12 h-3" />
        </div>
      ))}
    </div>
  )
}

interface FoodTypeSelectorProps {
  foodTypes: PlaceFoodTypeListItem[]
}

export default function FoodTypeSelector({ foodTypes }: FoodTypeSelectorProps) {
  const { selectedFoodTypes, toggleFoodType } = useFilterState()

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {foodTypes.map((foodType) => {
        const isSelected = selectedFoodTypes.includes(foodType.code)
        return (
          <button
            key={foodType.code}
            onClick={() => toggleFoodType(foodType.code)}
            className={`flex flex-col items-center justify-center px-5 py-[17px] border box-border cursor-pointer ${
              isSelected ? 'bg-[#f8f5f4] border-main' : 'border-[#eeeeee]'
            }`}
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
  )
}
