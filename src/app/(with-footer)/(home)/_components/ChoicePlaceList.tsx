import ErrorMessage from '@/components/ui/ErrorMessage'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { ApiResponse } from '@/types/api/api'
import { ChoicePlace } from '@/types/api/place'
import ChoiceSwiper from './ChoiceSwiper'

export default async function ChoicePlaceList() {
  const { data, error } = await api.get<ApiResponse<ChoicePlace[]>>(
    '/api/places/v1/editor-choice',
    {
      params: {
        page: 0,
        size: 4,
      },
    },
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data?.success || !data.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />
  }

  return <ChoiceSwiper places={data.data} />
}
