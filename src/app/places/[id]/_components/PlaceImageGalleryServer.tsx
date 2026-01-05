import ErrorMessage from '@/components/ui/ErrorMessage'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { PlaceThumbnailResponse } from '@/types/api/place-detail'
import PlaceImageGallery from './PlaceImageGallery'

interface PlaceImageGalleryServerProps {
  placeId: number
}

export default async function PlaceImageGalleryServer({ placeId }: PlaceImageGalleryServerProps) {
  const { data, error } = await api.get<ApiResponse<PlaceThumbnailResponse[]>>(
    API_ENDPOINTS.PLACES_THUMBNAILS(placeId),
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data.success || !data.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('썸네일')} />
  }

  return <PlaceImageGallery imageUrls={data.data.map((thumbnail) => thumbnail.imageUrl)} />
}
