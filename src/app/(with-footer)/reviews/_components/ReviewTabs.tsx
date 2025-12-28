import Link from 'next/link'
import { PAGE_PATHS } from '@/lib/paths'

interface ReviewTabsProps {
  activeTab: 'all' | 'following'
}

export default function ReviewTabs({ activeTab }: ReviewTabsProps) {
  return (
    <div className="sticky top-0 flex w-full bg-white z-40">
      <Link
        href={`${PAGE_PATHS.REVIEWS}?type=all`}
        className={`relative flex-1 h-[50px] text-sm leading-[14px] flex items-center justify-center ${
          activeTab === 'all' ? 'text-main font-bold' : 'text-[#333333]/40'
        }`}
      >
        전체
        <div
          className={`absolute bottom-0 left-0 right-0 ${activeTab === 'all' ? 'h-[2px] bg-main' : 'h-[1px] bg-[#eeeeee]'}`}
        />
      </Link>
      <Link
        href={`${PAGE_PATHS.REVIEWS}?type=following`}
        className={`relative flex-1 h-[50px] text-sm leading-[14px] flex items-center justify-center ${
          activeTab === 'following' ? 'text-main font-bold' : 'text-[#333333]/40'
        }`}
      >
        팔로잉
        <div
          className={`absolute bottom-0 left-0 right-0 ${activeTab === 'following' ? 'h-[2px] bg-main' : 'h-[1px] bg-[#eeeeee]'}`}
        />
      </Link>
    </div>
  )
}
