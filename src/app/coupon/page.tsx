'use client'

import CouponCard from '@/components/coupon/CouponCard'
import type { Coupon } from '@/domains/member'
import { useState } from 'react'

const dummyCoupons: Coupon[] = [
  {
    id: 1,
    couponName: '10% 할인 쿠폰',
    couponCode: 'D-30',
    discountPoints: 2000,
    minOrderAmount: 20000,
    startDate: '2020-10-01',
    endDate: '2020-10-31',
    daysRemaining: 30,
    isExpired: false,
  },
  {
    id: 2,
    couponName: '9% 할인 쿠폰',
    couponCode: 'D-81',
    discountPoints: 5000,
    minOrderAmount: 10000,
    startDate: '2020-10-01',
    endDate: '2020-12-31',
    daysRemaining: 81,
    isExpired: false,
  },
]


export default function CouponPage() {
  const [coupons] = useState<Coupon[]>(dummyCoupons)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center h-14 px-4">
          <button onClick={() => window.history.back()} className="p-2 -ml-2" aria-label="뒤로가기">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="flex-1 text-center text-[17px] font-semibold -ml-10">쿠폰</h1>
        </div>
      </header>

      {/* 쿠폰 목록 */}
      <div className="pt-14 pb-6">
        <div className="py-4">
          {coupons.length > 0 ? (
            coupons.map((coupon) => <CouponCard key={coupon.id} coupon={coupon} />)
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 mb-4">
                <svg viewBox="0 0 100 100" className="text-gray-300 fill-current">
                  <rect x="10" y="30" width="80" height="40" rx="5" />
                  <circle cx="10" cy="50" r="5" className="fill-white" />
                  <circle cx="90" cy="50" r="5" className="fill-white" />
                  <line
                    x1="10"
                    y1="50"
                    x2="90"
                    y2="50"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                </svg>
              </div>
              <p className="text-gray-400 text-[15px]">쿠폰이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
