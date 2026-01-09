import ErrorMessage from '@/components/ui/ErrorMessage'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { PlaceChoiceListItemResponse, PlaceChoiceQuery } from '@/types/api/place'
import ChoiceSwiper from './ChoiceSwiper'

export default async function ChoicePlaceContent() {
  // API 호출
  const query = {
    params: {
      page: 0,
      size: 4,
    } satisfies PlaceChoiceQuery,
  }
  const { data, error } = await api.get<ApiResponse<PlaceChoiceListItemResponse[]>>(
    API_ENDPOINTS.PLACES_EDITOR_CHOICE,
    query,
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data.success || !data.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('플레이스')} />
  }

  return <ChoiceSwiper places={data.data} />
}
