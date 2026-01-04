'use server'

import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { PlaceBookmarkResponse } from '@/types/api/place-detail'

export async function togglePlaceBookmark(placeId: number) {
  return await api.post<ApiResponse<PlaceBookmarkResponse>>(API_ENDPOINTS.PLACES_BOOKMARK(placeId))
}
