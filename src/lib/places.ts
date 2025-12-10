import { ApiClient } from './api-client'

interface PlaceNearParams {
  latitude: number
  longitude: number
}

export async function getPlacesNear({ latitude, longitude }: PlaceNearParams) {
  try {
    const response = await ApiClient.get('/places', {
      latitude,
      longitude,
    })
    return response
  } catch (err) {
    console.error('주변 장소 조회 실패:', err)
    return []
  }
}
