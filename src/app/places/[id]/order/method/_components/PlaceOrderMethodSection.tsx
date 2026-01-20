'use client'

import { PAGE_PATHS } from '@/lib/paths'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type OrderMethod = 'immediate' | 'reservation' | 'takeout' | 'gift'

interface PlaceOrderMethodSectionProps {
  placeId: number
}

export default function PlaceOrderMethodSection({ placeId }: PlaceOrderMethodSectionProps) {
  const router = useRouter()

  const [selectedMethod, setSelectedMethod] = useState<OrderMethod | null>('immediate')

  const handleNext = () => {
    if (selectedMethod) {
      router.push(PAGE_PATHS.ORDER_MENUS(placeId))
    }
  }

  const methods = [
    {
      id: 'immediate' as OrderMethod,
      title: '바로 주문하기',
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
          <rect x="16" y="12" width="32" height="40" rx="4" stroke="currentColor" strokeWidth="2" />
          <path
            d="M28 28 L32 32 L28 36"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="32" r="2" fill="currentColor" />
        </svg>
      ),
      disabled: false,
    },
    {
      id: 'reservation' as OrderMethod,
      title: '예약하기',
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
          <rect x="12" y="16" width="40" height="36" rx="2" stroke="currentColor" strokeWidth="2" />
          <path
            d="M20 12 L20 20 M44 12 L44 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M12 24 L52 24" stroke="currentColor" strokeWidth="2" />
          <path
            d="M24 34 L32 34 M24 42 L40 42"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      disabled: true,
    },
    {
      id: 'takeout' as OrderMethod,
      title: '포장하기',
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
          <path
            d="M20 28 L44 28 L40 48 L24 48 Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M26 28 L28 20 L36 20 L38 28"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <rect x="28" y="36" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      disabled: true,
    },
    {
      id: 'gift' as OrderMethod,
      title: '선물하기 (e-Gift)',
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
          <path
            d="M20 28 L44 28 L40 48 L24 48 Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M26 28 L28 20 L36 20 L38 28"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <rect x="28" y="36" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      disabled: true,
    },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-center relative px-4 py-4 border-b">
        <button onClick={() => router.back()} className="absolute left-4 p-2" aria-label="뒤로가기">
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
        <h1 className="text-lg">주문방법 선택</h1>
      </header>

      {/* Content */}
      <div className="flex-1 px-4 py-8">
        {/* Instructions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-4">원하시는 주문방법을 선택해주세요.</h2>
          <p className="text-sm text-gray-500 text-center leading-relaxed">
            가게 사정에 따라 가능한 주문방법이 달라질 수 있으며,
            <br />
            자세한 사항은 가게 정보를 확인해주세요.
          </p>
        </div>

        {/* Order Method Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {methods.map((method) => (
            <button
              key={method.id}
              onClick={() => !method.disabled && setSelectedMethod(method.id)}
              disabled={method.disabled}
              className={`
                relative aspect-square rounded-lg border-2 transition-all
                ${
                  selectedMethod === method.id && !method.disabled
                    ? 'border-red-600 bg-red-50'
                    : method.disabled
                      ? 'border-gray-200 bg-gray-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                }
                ${method.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div
                  className={`mb-3 ${
                    selectedMethod === method.id && !method.disabled
                      ? 'text-red-600'
                      : method.disabled
                        ? 'text-gray-300'
                        : 'text-gray-400'
                  }`}
                >
                  {method.icon}
                </div>
                <span
                  className={`${
                    selectedMethod === method.id && !method.disabled
                      ? 'text-red-600'
                      : method.disabled
                        ? 'text-gray-300'
                        : 'text-gray-700'
                  }`}
                >
                  {method.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-4 pb-8 pt-4">
        <button
          onClick={handleNext}
          disabled={!selectedMethod}
          className={`
            w-full py-4 rounded-lg text-white text-lg font-bold
            ${
              selectedMethod
                ? 'bg-red-600 hover:bg-red-700 active:bg-red-800'
                : 'bg-gray-300 cursor-not-allowed'
            }
            transition-colors
          `}
        >
          다음
        </button>
      </div>
    </div>
  )
}
