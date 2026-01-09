import ErrorMessage from '@/components/ui/ErrorMessage'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { PlaceAmenity } from '@/types/api/place'
import FacilitySelector from './FacilitySelector'

export default async function FacilityContent() {
  const { data, error } = await api.get<ApiResponse<PlaceAmenity[]>>(API_ENDPOINTS.PLACES_AMENITIES)

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-2" />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data.success || !data.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('편의시설')} className="py-2" />
  }

  return <FacilitySelector amenities={data.data} />
}
