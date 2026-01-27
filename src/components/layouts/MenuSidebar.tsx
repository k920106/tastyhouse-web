'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/shadcn/sidebar'
import { IoSettingsOutline, IoSearchOutline, IoClose } from 'react-icons/io5'
import { RiEditLine } from 'react-icons/ri'
import { useSidebar } from '@/components/ui/shadcn/sidebar'
import Image from 'next/image'

const foodCategories = [
  { name: '한식', emoji: '🍚' },
  { name: '양식', emoji: '🍕' },
  { name: '일식', emoji: '🍱' },
  { name: '중식', emoji: '🥟' },
  { name: '세계음식', emoji: '🌮' },
  { name: '분식', emoji: '🍜' },
  { name: '주점', emoji: '🍺' },
  { name: '카페', emoji: '☕' },
]

export default function MenuSidebar() {
  const { setOpenMobile } = useSidebar()

  return (
    <Sidebar side="left" collapsible="offcanvas">
      <SidebarHeader className="border-b border-gray-100 pb-0">
        {/* Top Action Buttons */}
        <div className="flex items-center justify-end gap-2 px-3 pt-3 pb-2">
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <IoSettingsOutline size={22} color="#000" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <IoSearchOutline size={22} color="#000" />
          </button>
          <button
            onClick={() => setOpenMobile(false)}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose size={26} color="#000" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <Image
              src="/images/default-profile.png"
              alt="프로필"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-[15px] text-gray-900">
                낙네입술바라괴지
              </span>
              <RiEditLine size={16} className="text-gray-400 flex-shrink-0" />
            </div>
            <div className="text-[13px] text-gray-400 mt-0.5">
              @ 인내백만 <span className="text-gray-300">(2147r)</span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        {/* Food Categories Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {foodCategories.map((category) => (
            <button
              key={category.name}
              className="flex flex-col items-center justify-center py-5 px-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-14 h-14 mb-2.5 flex items-center justify-center">
                <span className="text-[42px] leading-none">{category.emoji}</span>
              </div>
              <span className="text-[13px] font-medium text-gray-800">
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {/* Banner Section */}
        <div className="mt-4 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-[#C9A577] via-[#D4B087] to-[#E5C9A8] p-4 relative">
            <div className="absolute inset-0 opacity-10">
              <div className="text-white text-6xl absolute top-2 right-4">❄</div>
              <div className="text-white text-4xl absolute bottom-3 left-6">✨</div>
            </div>
            <div className="relative z-10">
              <div className="text-[13px] font-bold text-white mb-0.5 leading-tight">
                아테케 크리스마스 시즌으로
              </div>
              <div className="text-[13px] font-bold text-white mb-3 leading-tight">
                스탬프 6개 모으면 1,000P 적립!
              </div>
              <button className="text-[11px] bg-white/25 backdrop-blur-sm text-white px-3 py-1.5 rounded-full inline-flex items-center gap-1 hover:bg-white/35 transition-colors">
                <span className="font-medium">캠페인 바로가기</span>
                <span className="text-sm">›</span>
              </button>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
