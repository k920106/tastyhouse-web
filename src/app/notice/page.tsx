'use client'

import { useRouter } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/shadcn/accordion'

interface NoticeItem {
  id: string
  title: string
  date: string
  content: string
}

const NOTICE_DATA: NoticeItem[] = [
  {
    id: '1',
    title: '개인정보 처리방침 변경 사전 안내',
    date: '2020-08-03',
    content: `안녕하세요. (주)테이스티하우스입니다.
테이스티하우스 회원님께 더 나은 서비스를 제공할 수 있도록 개인정보 처리방침 문서를 변경하였음을 알려드립니다.

변경 시기
* 변경된 개인정보 처리방침은 시행일인 2020년 8월 10일부터 효력이 발생합니다.
* 변경되는 개인정보 처리방침에 대해 시행일 전까지 거부의사를 표시하지 않으면 변경에 동의한 것으로 간주합니다.`,
  },
  {
    id: '2',
    title: '개인정보 처리방침 변경 사전 안내',
    date: '2020-08-03',
    content: `안녕하세요. (주)테이스티하우스입니다.
테이스티하우스 회원님께 더 나은 서비스를 제공할 수 있도록 개인정보 처리방침 문서를 변경하였음을 알려드립니다.

변경 시기
* 변경된 개인정보 처리방침은 시행일인 2020년 8월 10일부터 효력이 발생합니다.
* 변경되는 개인정보 처리방침에 대해 시행일 전까지 거부의사를 표시하지 않으면 변경에 동의한 것으로 간주합니다.`,
  },
  {
    id: '3',
    title: '개인정보 처리방침 변경 사전 안내',
    date: '2020-08-03',
    content: `안녕하세요. (주)테이스티하우스입니다.
테이스티하우스 회원님께 더 나은 서비스를 제공할 수 있도록 개인정보 처리방침 문서를 변경하였음을 알려드립니다.

변경 시기
* 변경된 개인정보 처리방침은 시행일인 2020년 8월 10일부터 효력이 발생합니다.
* 변경되는 개인정보 처리방침에 대해 시행일 전까지 거부의사를 표시하지 않으면 변경에 동의한 것으로 간주합니다.`,
  },
  {
    id: '4',
    title: '개인정보 처리방침 변경 사전 안내',
    date: '2020-08-03',
    content: `안녕하세요. (주)테이스티하우스입니다.
테이스티하우스 회원님께 더 나은 서비스를 제공할 수 있도록 개인정보 처리방침 문서를 변경하였음을 알려드립니다.

변경 시기
* 변경된 개인정보 처리방침은 시행일인 2020년 8월 10일부터 효력이 발생합니다.
* 변경되는 개인정보 처리방침에 대해 시행일 전까지 거부의사를 표시하지 않으면 변경에 동의한 것으로 간주합니다.`,
  },
  {
    id: '5',
    title: '개인정보 처리방침 변경 사전 안내',
    date: '2020-08-03',
    content: `안녕하세요. (주)테이스티하우스입니다.
테이스티하우스 회원님께 더 나은 서비스를 제공할 수 있도록 개인정보 처리방침 문서를 변경하였음을 알려드립니다.

변경 시기
* 변경된 개인정보 처리방침은 시행일인 2020년 8월 10일부터 효력이 발생합니다.
* 변경되는 개인정보 처리방침에 대해 시행일 전까지 거부의사를 표시하지 않으면 변경에 동의한 것으로 간주합니다.`,
  },
  {
    id: '6',
    title: '개인정보 처리방침 변경 사전 안내',
    date: '2020-08-03',
    content: `안녕하세요. (주)테이스티하우스입니다.
테이스티하우스 회원님께 더 나은 서비스를 제공할 수 있도록 개인정보 처리방침 문서를 변경하였음을 알려드립니다.

변경 시기
* 변경된 개인정보 처리방침은 시행일인 2020년 8월 10일부터 효력이 발생합니다.
* 변경되는 개인정보 처리방침에 대해 시행일 전까지 거부의사를 표시하지 않으면 변경에 동의한 것으로 간주합니다.`,
  },
  {
    id: '7',
    title: '개인정보 처리방침 변경 사전 안내',
    date: '2020-08-03',
    content: `안녕하세요. (주)테이스티하우스입니다.
테이스티하우스 회원님께 더 나은 서비스를 제공할 수 있도록 개인정보 처리방침 문서를 변경하였음을 알려드립니다.

변경 시기
* 변경된 개인정보 처리방침은 시행일인 2020년 8월 10일부터 효력이 발생합니다.
* 변경되는 개인정보 처리방침에 대해 시행일 전까지 거부의사를 표시하지 않으면 변경에 동의한 것으로 간주합니다.`,
  },
]

export default function NoticePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#eeeeee]">
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
            공지사항
          </h1>
        </div>
      </header>

      {/* 공지사항 아코디언 리스트 */}
      <Accordion type="single" collapsible defaultValue="1" className="w-full">
        {NOTICE_DATA.map((notice) => (
          <AccordionItem key={notice.id} value={notice.id} className="border-b border-gray-100">
            <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50">
              <div className="flex flex-col items-start gap-2 text-left pr-4">
                <h2 className="text-[15px] text-gray-900 font-normal leading-tight">
                  {notice.title}
                </h2>
                <p className="text-[13px] text-gray-400 font-light">{notice.date}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="bg-gray-50 rounded-lg p-5">
                <p className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-line">
                  {notice.content}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
