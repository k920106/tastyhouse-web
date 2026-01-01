import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { api } from '@/lib/api'
import { ApiResponse } from '@/types/api/api'
import { PlaceInfoResponse } from '@/types/api/place-detail'

export function PlaceDetailHeaderSkeleton() {
  return <Skeleton className="h-[17px] w-[120px]" />
}

interface PlaceDetailHeaderProps {
  placeId: number
}

export default async function PlaceDetailHeader({ placeId }: PlaceDetailHeaderProps) {
  const { error, data } = await api.get<ApiResponse<PlaceInfoResponse>>(
    `/api/places/v1/${placeId}/info`,
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <div>-</div>
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data?.success || !data.data) {
    return <div>-</div>
  }

  return <h1 className="text-[17px] leading-[17px]">{data.data.name}</h1>
}
