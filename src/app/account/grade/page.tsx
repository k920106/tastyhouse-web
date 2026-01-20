'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getMemberGradeName, getMemberGradeColor } from '@/constants/member'
import type { MemberGradeCode } from '@/domains/member'

const CURRENT_GRADE: MemberGradeCode = 'INSIDER'
const CURRENT_REVIEW_COUNT = 75
const TOTAL_REVIEW_COUNT = 625

export default function GradePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => router.back()} className="p-2 -ml-2">
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
            등급
          </h1>
        </div>
      </header>

      {/* 현재 등급 섹션 */}
      <div className="px-6 pt-10 pb-8">
        <div className="text-center">
          <div className="mb-6">
            <p className="text-[15px] text-gray-900">
              <span className="font-bold">닉네임을위라고하지</span> 님의 현재 등급은
            </p>
          </div>

          {/* 등급 아이콘 */}
          <div className="flex justify-center mb-4">
            <Image
              src="/images/rank/icon-rank-03.png"
              alt={getMemberGradeName(CURRENT_GRADE)}
              width={120}
              height={120}
            />
          </div>

          {/* 등급 이름 */}
          <div className="mb-8">
            <p className={`text-[28px] font-bold ${getMemberGradeColor(CURRENT_GRADE)}`}>
              {getMemberGradeName(CURRENT_GRADE)}
            </p>
          </div>

          {/* 리뷰 카운트 박스 */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-[15px] text-gray-900">리뷰</span>
              <span className="text-[20px] font-bold text-[#f4aa14]">
                {CURRENT_REVIEW_COUNT}
              </span>
              <span className="text-[15px] text-gray-900">개 추가 작성시</span>
              <span className="text-[20px] font-bold text-[#f4aa14]">미식멤버</span>
              <span className="text-[15px] text-gray-900">달성</span>
            </div>
            <p className="text-[14px] text-gray-500">
              현재 작성 리뷰 수 {TOTAL_REVIEW_COUNT}개
            </p>
          </div>
        </div>
      </div>

      {/* 등급 세부 조건 안내 */}
      <div className="px-6 pb-6">
        <h2 className="text-[17px] font-bold text-gray-900 mb-2">등급 세부 조건 안내</h2>
        <p className="text-[14px] text-gray-500 mb-6">
          리뷰 작성 수에 따라 등급이 변경됩니다.
        </p>

        <div className="space-y-3">
          {/* 신입멤버 */}
          <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5">
            <Image
              src="/images/rank/icon-level-01-40.png"
              alt="신입멤버"
              width={56}
              height={56}
            />
            <div className="flex-1">
              <p className="text-[17px] font-bold text-[#4a6db3] mb-1">신입멤버</p>
              <p className="text-[14px] text-gray-900">리뷰 작성 개수 99개 이하</p>
            </div>
          </div>

          {/* 열심멤버 */}
          <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5">
            <Image
              src="/images/rank/icon-level-02-40.png"
              alt="열심멤버"
              width={56}
              height={56}
            />
            <div className="flex-1">
              <p className="text-[17px] font-bold text-[#ed771f] mb-1">열심멤버</p>
              <p className="text-[14px] text-gray-900">리뷰 작성 개수 100개 이상</p>
            </div>
          </div>

          {/* 인싸멤버 */}
          <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5">
            <Image
              src="/images/rank/icon-level-03-40.png"
              alt="인싸멤버"
              width={56}
              height={56}
            />
            <div className="flex-1">
              <p className="text-[17px] font-bold text-[#a5a5a5] mb-1">인싸멤버</p>
              <p className="text-[14px] text-gray-900">리뷰 작성 개수 500개 이상</p>
            </div>
          </div>

          {/* 미식멤버 */}
          <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5">
            <Image
              src="/images/rank/icon-level-04-40.png"
              alt="미식멤버"
              width={56}
              height={56}
            />
            <div className="flex-1">
              <p className="text-[17px] font-bold text-[#f4aa14] mb-1">미식멤버</p>
              <p className="text-[14px] text-gray-900">리뷰 작성 개수 700개 이상</p>
            </div>
          </div>

          {/* 테하멤버 */}
          <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5">
            <Image
              src="/images/rank/icon-level-05-40.png"
              alt="테하멤버"
              width={56}
              height={56}
            />
            <div className="flex-1">
              <p className="text-[17px] font-bold text-main mb-1">테하멤버</p>
              <p className="text-[14px] text-gray-900">리뷰 작성 개수 1,000개 이상</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
