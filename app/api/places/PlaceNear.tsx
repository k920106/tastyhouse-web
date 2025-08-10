import axios from 'axios'

interface PlaceNearProps {
  latitude: number
  longitude: number
}

export default async function PlaceNear({ latitude, longitude }: PlaceNearProps) {
  try {
    const response = await axios.get('/api/places', {
      params: {
        latitude,
        longitude,
      },
    })
    return response.data
  } catch (err) {
    console.error('주변 장소 조회 실패:', err)
    return []
  }
}
