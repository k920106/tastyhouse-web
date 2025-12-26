'use client'

import Image from 'next/image'

interface CartItemProps {
  id: number
  name: string
  imageUrl: string
  price: number
  originalPrice?: number
  quantity: number
  selected: boolean
  onToggleSelect: (id: number) => void
  onQuantityChange: (id: number, quantity: number) => void
  onRemove: (id: number) => void
}

export default function CartItem({
  id,
  name,
  imageUrl,
  price,
  originalPrice,
  quantity,
  selected,
  onToggleSelect,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-start gap-3 py-4 border-b border-[#eeeeee]">
      <button onClick={() => onToggleSelect(id)} className="w-6 h-6 flex-shrink-0 mt-6">
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            selected ? 'bg-main border-main' : 'border-[#dddddd]'
          }`}
        >
          {selected && (
            <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
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
      </button>

      <div className="relative w-[75px] h-[75px] flex-shrink-0">
        <Image src={imageUrl} alt={name} fill className="object-cover rounded" sizes="75px" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-[15px] mb-1 line-clamp-2">{name}</h3>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-[15px]">{price.toLocaleString()}원</span>
          {originalPrice && originalPrice > price && (
            <span className="text-xs text-[#aaaaaa] line-through">
              {originalPrice.toLocaleString()}원
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-[#eeeeee]">
            <button
              onClick={() => onQuantityChange(id, Math.max(1, quantity - 1))}
              className="w-9 h-9 flex items-center justify-center text-[#666666] text-xl"
            >
              −
            </button>
            <span className="w-12 h-9 flex items-center justify-center text-[15px] border-x border-[#eeeeee]">
              {quantity}
            </span>
            <button
              onClick={() => onQuantityChange(id, quantity + 1)}
              className="w-9 h-9 flex items-center justify-center text-[#666666] text-xl"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button onClick={() => onRemove(id)} className="w-5 h-5 flex-shrink-0 mt-1">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M15 5L5 15M5 5L15 15" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}
