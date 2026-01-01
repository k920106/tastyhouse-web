import ErrorMessage from '@/components/ui/ErrorMessage'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { ApiResponse } from '@/types/api/api'
import { PlaceInfoResponse } from '@/types/api/place-detail'
import { PlaceInfo } from './PlaceInfo'

interface PlaceInfoContentProps {
  placeId: number
}

export default async function PlaceInfoContent({ placeId }: PlaceInfoContentProps) {
  const { error, data } = await api.get<ApiResponse<PlaceInfoResponse>>(
    `/api/places/v1/${placeId}/info`,
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data?.success || !data.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('기본 정보')} />
  }

  // console.log(data.data)

  return <PlaceInfo placeInfo={data.data} />
}
