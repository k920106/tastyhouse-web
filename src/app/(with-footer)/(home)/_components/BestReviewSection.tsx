import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { ApiResponse } from '@/types/api/api'
import { BestReview } from '@/types/api/review'
import { Suspense } from 'react'
import BestReviewSwiper, { BestReviewSwiperSkeleton } from './BestReviewSwiper'

function BestReviewSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="w-full pt-[50px] pb-[60px]">
      <div className="mx-auto max-w-[1200px] px-4">
        <header className="mb-[30px] text-center">
          <h2 className="mb-[15px] text-[23px] font-nanum-myeongjo-bold font-bold">베스트 리뷰</h2>
          <p className="text-sm text-[#aaaaaa]">테하인들의 마음을 사로잡은 리뷰를 소개합니다.</p>
        </header>
        <div className="relative">{children}</div>
      </div>
    </section>
  )
}

export default async function BestReviewSection() {
  const { data, error } = await api.get<ApiResponse<BestReview[]>>('/api/reviews/v1/best', {
    params: {
      page: 0,
      size: 5,
    },
  })

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return (
      <BestReviewSectionLayout>
        <div className="w-full text-sm text-[#999999] text-center whitespace-pre-line">
          {COMMON_ERROR_MESSAGES.API_FETCH_ERROR}
        </div>
      </BestReviewSectionLayout>
    )
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data?.success || !data.data) {
    const errorMessage = data?.message || COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')
    return (
      <BestReviewSectionLayout>
        <div className="w-full text-sm text-[#999999] text-center whitespace-pre-line">
          {errorMessage}
        </div>
      </BestReviewSectionLayout>
    )
  }

  return (
    <BestReviewSectionLayout>
      <Suspense fallback={<BestReviewSwiperSkeleton />}>
        <BestReviewSwiper reviews={data.data} />
      </Suspense>
    </BestReviewSectionLayout>
  )
}
