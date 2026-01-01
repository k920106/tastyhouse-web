'use client'

import FixedBottomSection from '@/components/ui/FixedBottomSection'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IoChevronBackOutline } from 'react-icons/io5'

const mockEvent = {
  id: 1,
  title: '산타의 식탁',
  subtitle: "wife's cuisine",
  description: '매일 산타가 드리는\n24시간 타임 특가 & 무료배송 쿠폰',
  mainImage: '/images/sample/event-main.jpg',
  sections: [
    {
      id: 1,
      title: 'EVERYDAY SANTA 1',
      subtitle: '24시간 타임 특가',
      content:
        '매일 24시간 동안만 만나볼 수 있는 특별한 가격!\n산타가 선물하는 타임 특가 상품들을 만나보세요.',
      backgroundColor: '#f5f0e8',
    },
  ],
  startDate: '2024-12-01',
  endDate: '2024-12-25',
  status: 'ongoing' as const,
}

const mockWinnerEvent = {
  id: 1,
  title: '8월 신규회원 특별 할인 이벤트 당첨자 발표',
  announcementDate: '2020-09-10',
  content: `이벤트에 참여해주신 모든 분들께 감사드리며, 당첨자분들의 당첨을 진심으로 축하드립니다.

<당첨자 5명>
홍*동 010-****-1234
김*수 010-****-6789
박*철 010-****-0123
홍*동 010-****-1234
김*수 010-****-6789

당첨자분들의 당첨을 진심으로 축하드립니다!
(당첨자 안내는 이벤트 응모시 등록해주신 연락처로 개별 문자가 발송됩니다.)

참여해주신 모든 분들께 다시한번 감사드리며, 앞으로도 다양한 이벤트로 찾아뵙겠습니다.`,
  type: 'winner' as const,
}

export default function EventDetailPage() {
  const router = useRouter()

  // 실제로는 eventId와 타입에 따라 다른 데이터를 가져와야 합니다
  const isWinnerPage = true // 임시로 당첨자 발표 페이지로 설정

  if (isWinnerPage) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => router.back()} className="p-1">
              <IoChevronBackOutline size={24} className="text-gray-900" />
            </button>
            <h1 className="text-[17px]">이벤트</h1>
            <div className="w-6" />
          </div>
        </header>

        {/* Winner Announcement Content */}
        <div className="px-4 py-6 space-y-8">
          {/* Repeat for each announcement */}
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="border-b border-gray-100 pb-8 last:border-b-0">
              <h2 className="mb-2 text-lg leading-[18px]">{mockWinnerEvent.title}</h2>
              <p className="text-sm leading-[14px] text-gray-400 mb-6">
                {mockWinnerEvent.announcementDate}
              </p>
              {index === 1 && (
                <div className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">
                  {mockWinnerEvent.content}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="h-20" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => router.back()} className="p-1">
            <IoChevronBackOutline size={24} className="text-gray-900" />
          </button>
          <h1 className="text-[17px]">이벤트</h1>
          <div className="w-6" />
        </div>
      </header>

      {/* Main Image Section */}
      <div className="relative w-full bg-[#1a5850]">
        <div className="relative w-full aspect-[3/4]">
          <Image
            src={mockEvent.mainImage}
            alt={mockEvent.title}
            fill
            className="object-cover"
            priority
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="text-white text-[13px] tracking-wider mb-3 font-light">
              {mockEvent.subtitle}
            </p>
            <h2 className="text-white text-[40px] font-light mb-6 leading-tight">
              {mockEvent.title}
            </h2>
            <div className="w-12 h-[1px] bg-white/50 mb-6" />
            <p className="text-white text-[15px] leading-relaxed whitespace-pre-line font-light">
              {mockEvent.description}
            </p>
          </div>
        </div>

        {/* Christmas Decoration */}
        <div className="relative w-full h-24 bg-gradient-to-b from-[#1a5850] to-[#f5f0e8]">
          <div className="absolute top-0 left-0 right-0">
            <div className="w-full h-16 relative">
              <Image
                src="/images/decoration/pine-branches.png"
                alt="decoration"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-[#f5f0e8]">
        {mockEvent.sections.map((section) => (
          <div key={section.id} className="px-4 py-12">
            {/* Santa Sleigh Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-24">
                <Image
                  src="/images/decoration/santa-sleigh.png"
                  alt="Santa Sleigh"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Section Title */}
            <div className="text-center mb-8">
              <div className="inline-block px-6 py-2 border border-[#c9b896] rounded-full mb-4">
                <p className="text-[#8b7355] text-[13px] tracking-wider">{section.title}</p>
              </div>
              <h3 className="text-[32px] font-light text-gray-800 mb-4 leading-tight">
                {section.subtitle}
              </h3>
              <p className="text-[15px] text-gray-600 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>

            {/* Product List Area */}
            <div className="mt-8">{/* TODO: Add special offer products component */}</div>
          </div>
        ))}

        {/* Bottom Spacing */}
        <div className="h-20" />
      </div>

      {/* Event Period Notice */}
      <FixedBottomSection>
        <div className="flex items-center justify-between">
          <div className="text-[13px] text-gray-500">
            이벤트 기간: {mockEvent.startDate} ~ {mockEvent.endDate}
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs leading-[12px] ${
              mockEvent.status === 'ongoing'
                ? 'bg-red-50 text-red-600'
                : mockEvent.status === 'upcoming'
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-gray-100 text-gray-600'
            }`}
          >
            {mockEvent.status === 'ongoing'
              ? '진행중'
              : mockEvent.status === 'upcoming'
                ? '예정'
                : '종료'}
          </div>
        </div>
      </FixedBottomSection>
    </div>
  )
}
