'use server'

import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { PagedApiResponse } from '@/types/api/api'
import { PlaceListItem, PlaceListQuery } from '@/types/api/place'

export async function getLatestPlaces(params: PlaceListQuery) {
  const { data, error } = await api.get<PagedApiResponse<PlaceListItem>>(
    API_ENDPOINTS.PLACES_LATEST,
    {
      params,
    },
  )

  if (error || !data?.success) {
    throw new Error(error || 'Failed to fetch places')
  }

  return data
}
