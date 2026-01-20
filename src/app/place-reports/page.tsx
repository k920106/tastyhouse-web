'use client'

import BackButton from '@/components/layouts/header-parts/BackButton'
import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import AppButton from '@/components/ui/AppButton'
import Link from 'next/link'

export default function NewPlacePage() {
  return (
    <>
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <h1 className="text-[17px] font-bold leading-[55px]">맛집제보</h1>
        </HeaderCenter>
      </Header>

      <div className="px-[30px] pt-[30px] pb-[30px]">
        {/* 상호명 Section */}
        <div className="mb-[30px]">
          <label className="block mb-[10px]">
            <span className="text-[15px] leading-[15px]">상호명</span>
            <span className="text-[#b80000] ml-[3px]">*</span>
          </label>
          <input
            type="text"
            placeholder="상호명을 입력해주세요."
            className="w-full h-[50px] px-[15px] border border-[#eeeeee] text-[15px] placeholder:text-[#cccccc] focus:border-[#666666] focus:outline-none"
          />
        </div>

        {/* 위치 정보 Section */}
        <div className="mb-[30px]">
          <label className="block mb-[10px]">
            <span className="text-[15px] leading-[15px]">위치 정보</span>
            <span className="text-[#b80000] ml-[3px]">*</span>
          </label>
          <div className="flex gap-[10px] mb-[10px]">
            <input
              type="text"
              className="flex-1 h-[50px] px-[15px] border border-[#eeeeee] text-[15px] bg-[#f8f8f8] focus:outline-none"
              disabled
            />
            <button className="w-[120px] h-[50px] bg-[#f0f0f0] text-[15px] font-normal flex items-center justify-center">
              우편번호 검색
            </button>
          </div>
          <input
            type="text"
            placeholder="상세주소를 입력해주세요."
            className="w-full h-[50px] px-[15px] border border-[#eeeeee] text-[15px] placeholder:text-[#cccccc] focus:border-[#666666] focus:outline-none"
          />
        </div>

        {/* Points Info */}
        <p className="text-[13px] leading-[20px] text-[#666666] mb-[30px]">
          맛집으로 등록될 경우 1,000포인트를 지급해드립니다.
        </p>

        {/* Confirm Button */}
        <AppButton className="bg-[#db8888] text-white hover:bg-[#db8888]/90">
          확인
        </AppButton>

        {/* Bottom Link */}
        <div className="flex justify-end mt-[30px]">
          <Link
            href="#"
            className="text-[13px] text-[#333333] flex items-center gap-[5px] hover:underline"
          >
            <span>검색 결과가 없으신가요?</span>
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-[1px]"
            >
              <path d="M1 1L5 5L1 9" stroke="#333333" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  )
}
