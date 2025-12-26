'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface ReviewTabsProps {
  activeTab: 'all' | 'following'
}

export default function ReviewTabs({ activeTab }: ReviewTabsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleTabChange = (tab: 'all' | 'following') => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('type', tab)
    router.push(`/reviews?${params.toString()}`)
  }

  return (
    <div className="sticky top-0 flex w-full max-w-[500px] bg-white z-40 mx-auto">
      <button
        onClick={() => handleTabChange('all')}
        className={`relative flex-1 h-[50px] text-sm leading-[14px] cursor-pointer ${
          activeTab === 'all' ? 'text-main font-bold' : 'text-[#333333]/40'
        }`}
      >
        전체
        <div
          className={`absolute bottom-0 left-0 right-0 ${activeTab === 'all' ? 'h-[2px] bg-main' : 'h-[1px] bg-[#eeeeee]'}`}
        />
      </button>
      <button
        onClick={() => handleTabChange('following')}
        className={`relative flex-1 h-[50px] text-sm leading-[14px] cursor-pointer ${
          activeTab === 'following' ? 'text-main font-bold' : 'text-[#333333]/40'
        }`}
      >
        팔로잉
        <div
          className={`absolute bottom-0 left-0 right-0 ${activeTab === 'following' ? 'h-[2px] bg-main' : 'h-[1px] bg-[#eeeeee]'}`}
        />
      </button>
    </div>
  )
}
