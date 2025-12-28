import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { ReviewDetail } from '@/types/api/review'

export function ReviewInfoHeaderSkeleton() {
  return <Skeleton className="h-[17px] w-[120px]" />
}

interface ReviewInfoHeaderProps {
  reviewId: number
}

export default async function ReviewInfoHeader({ reviewId }: ReviewInfoHeaderProps) {
  const { error, data } = await api.get<ApiResponse<ReviewDetail>>(
    API_ENDPOINTS.REVIEW_DETAIL(reviewId),
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <div>-</div>
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data?.success || !data.data) {
    return <div>-</div>
  }

  return (
    <h1 className="text-[17px] leading-[17px]">
      <span className="font-bold">{data.data.memberNickname}</span>
      님의 리뷰
    </h1>
  )
}
