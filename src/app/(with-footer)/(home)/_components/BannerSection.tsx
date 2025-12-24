import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { ApiResponse } from '@/types/api/api'
import { Banner } from '@/types/api/banner'
import { Suspense } from 'react'
import BannerSwiper, { BannerSwiperSkeleton } from './BannerSwiper'

export default async function BannerSection() {
  const { data, error } = await api.get<ApiResponse<Banner[]>>('/api/banners/v1')

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return (
      <div className="w-full py-10 text-sm text-[#999999] text-center whitespace-pre-line">
        {COMMON_ERROR_MESSAGES.API_FETCH_ERROR}
      </div>
    )
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data?.success || !data.data) {
    const errorMessage = data?.message || COMMON_ERROR_MESSAGES.FETCH_ERROR('경품')
    return (
      <div className="w-full py-10 text-sm text-[#999999] text-center whitespace-pre-line">
        {errorMessage}
      </div>
    )
  }

  return (
    <section className="w-full">
      <Suspense fallback={<BannerSwiperSkeleton />}>
        <BannerSwiper banners={data.data} />
      </Suspense>
    </section>
  )
}
