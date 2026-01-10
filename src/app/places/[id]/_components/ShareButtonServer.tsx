import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { PlaceNameResponse } from '@/types/api/place-detail'
import ShareButtonClient from './ShareButtonClient'
import ShareButtonError from './ShareButtonError'

interface ShareButtonServerProps {
  placeId: number
}

export default async function ShareButtonServer({ placeId }: ShareButtonServerProps) {
  // API 호출
  const { error, data } = await api.get<ApiResponse<PlaceNameResponse>>(
    API_ENDPOINTS.PLACES_NAME(placeId),
  )

  if (error) {
    return <ShareButtonError />
  }

  if (!data || !data.success || !data.data) {
    return <ShareButtonError />
  }

  const { name } = data.data

  return <ShareButtonClient placeId={placeId} placeName={name} />
}
