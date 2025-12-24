import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { ApiResponse } from '@/types/api/api'
import { BestPlace } from '@/types/api/place'
import { Suspense } from 'react'
import BestPlaceList, { BestPlaceListSkeleton } from './BestPlaceList'

function BestPlaceSectionnLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="w-full pt-[40px] pb-[30px] bg-[#f9f9f9]">
      <header className="mb-[30px] text-center">
        <h2 className="mb-[15px] text-[23px] text-gray-900 font-[family-name:var(--font-nanum-myeongjo-bold)] font-bold">
          베스트 플레이스
        </h2>
        <p className="text-sm text-[#aaaaaa]">솔직한 평점으로 인증된 플레이스들을 만나보세요.</p>
      </header>
      <div className="px-[15px]">{children}</div>
    </section>
  )
}

export default async function BestPlaceSection() {
  // API 호출
  const { data, error } = await api.get<ApiResponse<BestPlace[]>>('/api/places/v1/best', {
    params: {
      page: 0,
      size: 4,
    },
  })

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return (
      <BestPlaceSectionnLayout>
        <div className="w-full text-sm text-[#999999] text-center whitespace-pre-line">
          {COMMON_ERROR_MESSAGES.API_FETCH_ERROR}
        </div>
      </BestPlaceSectionnLayout>
    )
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data?.success || !data.data) {
    const errorMessage = data?.message || COMMON_ERROR_MESSAGES.FETCH_ERROR('장소')
    return (
      <BestPlaceSectionnLayout>
        <div className="w-full text-sm text-[#999999] text-center whitespace-pre-line">
          {errorMessage}
        </div>
      </BestPlaceSectionnLayout>
    )
  }

  return (
    <BestPlaceSectionnLayout>
      <ul className="grid grid-cols-2 gap-3 mb-[25px]">
        <Suspense fallback={<BestPlaceListSkeleton />}>
          <BestPlaceList places={data.data} />
        </Suspense>
        <div className="flex justify-center">
          <ViewMoreButton href="/places/best-places" />
        </div>
      </ul>
    </BestPlaceSectionnLayout>
  )
}
