'use client'

import Image from 'next/image'

interface MyPageTabsProps {
  activeTab: 'reviews' | 'payments' | 'places'
  onTabChange: (tab: 'reviews' | 'payments' | 'places') => void
}

export default function MyPageTabs({ activeTab, onTabChange }: MyPageTabsProps) {
  return (
    <div className="sticky top-0 z-40 flex bg-white border-b border-gray-200">
      <button
        onClick={() => onTabChange('reviews')}
        className={`flex-1 h-[60px] flex items-center justify-center ${
          activeTab === 'reviews' ? '' : 'opacity-40'
        }`}
      >
        <Image src="/images/icon-mypage-review.png" alt="리뷰" width={32} height={32} />
        {activeTab === 'reviews' && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-main" />
        )}
      </button>
      <button
        onClick={() => onTabChange('payments')}
        className={`flex-1 h-[60px] flex items-center justify-center ${
          activeTab === 'payments' ? '' : 'opacity-40'
        }`}
      >
        <Image src="/images/icon-mypage-payment.png" alt="결제" width={32} height={32} />
        {activeTab === 'payments' && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-main" />
        )}
      </button>
      <button
        onClick={() => onTabChange('places')}
        className={`flex-1 h-[60px] flex items-center justify-center ${
          activeTab === 'places' ? '' : 'opacity-40'
        }`}
      >
        <Image src="/images/icon-mypage-place.png" alt="저장된 장소" width={32} height={32} />
        {activeTab === 'places' && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-main" />
        )}
      </button>
    </div>
  )
}
