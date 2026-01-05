import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { PlaceSummaryResponse } from '@/types/api/place-detail'
import PlaceDetailHeader from './PlaceDetailHeader'

interface PlaceDetailHeaderServerProps {
  placeId: number
}

export default async function PlaceDetailHeaderServer({ placeId }: PlaceDetailHeaderServerProps) {
  // API 호출
  const { error, data } = await api.get<ApiResponse<PlaceSummaryResponse>>(
    API_ENDPOINTS.PLACES_SUMMARY(placeId),
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <div>-</div>
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data.success || !data.data) {
    return <div>-</div>
  }

  const { name } = data.data

  return <PlaceDetailHeader name={name} />
}
