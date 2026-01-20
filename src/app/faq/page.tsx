'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/shadcn/accordion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type FaqCategory = '전체' | '주문/결제' | '취소/환불' | '회원정보' | '기타'

interface FaqItem {
  id: string
  category: FaqCategory
  question: string
  answer: string
}

const FAQ_DATA: FaqItem[] = [
  {
    id: '1',
    category: '취소/환불',
    question: '주문취소를 하고싶어요.',
    answer: `주문 직후, '주문 완료' 상태에서는 마이페이지에서 직접 주문 취소가 가능합니다. 단, 부분 취소가 불가능하므로 전체 취소 후, 원하는 상품으로 재주문 해주셔야합니다.

'결제 완료' 상태에서는 업체 정책에 따라 취소가 불가할 수 있습니다.
주가 문의 사항은 고객센터(02-1234-5678)로 연락바랍니다.`,
  },
  {
    id: '2',
    category: '취소/환불',
    question: '주문취소를 하고싶어요.',
    answer: `주문 직후, '주문 완료' 상태에서는 마이페이지에서 직접 주문 취소가 가능합니다. 단, 부분 취소가 불가능하므로 전체 취소 후, 원하는 상품으로 재주문 해주셔야합니다.

'결제 완료' 상태에서는 업체 정책에 따라 취소가 불가할 수 있습니다.
주가 문의 사항은 고객센터(02-1234-5678)로 연락바랍니다.`,
  },
  {
    id: '3',
    category: '취소/환불',
    question: '주문취소를 하고싶어요.',
    answer: `주문 직후, '주문 완료' 상태에서는 마이페이지에서 직접 주문 취소가 가능합니다. 단, 부분 취소가 불가능하므로 전체 취소 후, 원하는 상품으로 재주문 해주셔야합니다.

'결제 완료' 상태에서는 업체 정책에 따라 취소가 불가할 수 있습니다.
주가 문의 사항은 고객센터(02-1234-5678)로 연락바랍니다.`,
  },
  {
    id: '4',
    category: '취소/환불',
    question: '주문취소를 하고싶어요.',
    answer: `주문 직후, '주문 완료' 상태에서는 마이페이지에서 직접 주문 취소가 가능합니다. 단, 부분 취소가 불가능하므로 전체 취소 후, 원하는 상품으로 재주문 해주셔야합니다.

'결제 완료' 상태에서는 업체 정책에 따라 취소가 불가할 수 있습니다.
주가 문의 사항은 고객센터(02-1234-5678)로 연락바랍니다.`,
  },
  {
    id: '5',
    category: '취소/환불',
    question: '주문취소를 하고싶어요.',
    answer: `주문 직후, '주문 완료' 상태에서는 마이페이지에서 직접 주문 취소가 가능합니다. 단, 부분 취소가 불가능하므로 전체 취소 후, 원하는 상품으로 재주문 해주셔야합니다.

'결제 완료' 상태에서는 업체 정책에 따라 취소가 불가할 수 있습니다.
주가 문의 사항은 고객센터(02-1234-5678)로 연락바랍니다.`,
  },
]

const CATEGORIES: FaqCategory[] = ['전체', '주문/결제', '취소/환불', '회원정보', '기타']

export default function FaqPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>('취소/환불')

  const filteredFaqs =
    selectedCategory === '전체'
      ? FAQ_DATA
      : FAQ_DATA.filter((faq) => faq.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="relative flex items-center h-14 px-4">
          <button onClick={() => router.back()} className="p-2 -ml-2" aria-label="뒤로가기">
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
          <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-medium">
            자주하는 질문
          </h1>
        </div>
      </header>

      {/* 카테고리 탭 */}
      <div className="sticky top-14 z-40 bg-white border-b border-gray-100">
        <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-5 py-2.5 text-[15px] font-medium rounded-md whitespace-nowrap border ${
                selectedCategory === category
                  ? 'text-[#a11c20] border-[#a11c20]'
                  : 'text-[#aaaaaa] border-[#eeeeee]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ 아코디언 리스트 */}
      <Accordion type="single" collapsible className="w-full">
        {filteredFaqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id} className="border-b border-gray-100">
            <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50">
              <div className="flex flex-col items-start gap-2 text-left pr-4">
                <div className="flex items-start gap-3">
                  <span className="text-[14px] text-[#a11c20] font-medium flex-shrink-0">
                    {faq.category}
                  </span>
                  <h2 className="text-[15px] text-gray-900 font-normal leading-tight">
                    {faq.question}
                  </h2>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="bg-gray-50 rounded-lg p-5">
                <p className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
