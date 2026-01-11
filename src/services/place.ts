'use server'

import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse, PagedApiResponse } from '@/types/api/api'
import { PlaceLatestListItemResponse, PlaceListQuery } from '@/types/api/place'
import {
  PlaceInfoResponse,
  PlaceMenuCategory,
  PlaceOwnerMessageHistoryResponse,
  PlacePhotoResponse,
} from '@/types/api/place-detail'

export async function getLatestPlaces(params: PlaceListQuery) {
  const { data, error } = await api.get<PagedApiResponse<PlaceLatestListItemResponse>>(
    API_ENDPOINTS.PLACES_LATEST,
    { params },
  )

  if (error || !data || !data.success || !data.data) {
    throw new Error(error || 'Failed to fetch places')
  }

  return data
}

export async function getPlaceInfo(placeId: number) {
  const { data, error } = await api.get<ApiResponse<PlaceInfoResponse>>(
    API_ENDPOINTS.PLACES_INFO(placeId),
  )

  if (error || !data || !data.success || !data.data) {
    throw new Error(error || 'Failed to fetch places')
  }

  return data
}

export async function getPlaceMenus(placeId: number) {
  return await api.get<ApiResponse<PlaceMenuCategory[]>>(API_ENDPOINTS.PLACES_MENUS(placeId))
}

export async function getPlacePhotos(placeId: number) {
  const { data, error } = await api.get<PagedApiResponse<PlacePhotoResponse>>(
    API_ENDPOINTS.PLACES_PHOTOS(placeId),
    {
      params: {
        page: 0,
        size: 10,
      },
    },
  )

  if (error || !data || !data.success || !data.data) {
    throw new Error(error || 'Failed to fetch places')
  }

  return data
}

export async function getPlaceOwnerMessageHistory(placeId: number) {
  const { data, error } = await api.get<ApiResponse<PlaceOwnerMessageHistoryResponse>>(
    API_ENDPOINTS.PLACES_OWNER_MESSAGE_HISTORY(placeId),
  )

  if (error || !data || !data.success || !data.data) {
    throw new Error(error || 'Failed to fetch owner message history')
  }

  return data
}
