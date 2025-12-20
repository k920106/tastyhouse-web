import { api } from './api'

interface PlaceNearParams {
  latitude: number
  longitude: number
}

export async function getPlacesNear({ latitude, longitude }: PlaceNearParams) {
  try {
    const response = await api.get('/places', {
      params: {
        latitude,
        longitude,
      },
    })
    return response
  } catch (err) {
    console.error('주변 장소 조회 실패:', err)
    return []
  }
}
