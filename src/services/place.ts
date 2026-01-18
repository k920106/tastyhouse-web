'use server'

import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { PlaceLatestListItemResponse, PlaceListQuery } from '@/types/api/place'
import {
  PlaceInfoResponse,
  PlaceMenuCategory,
  PlacePhotoCategory,
  PlaceReviewStatistics,
  PlaceReviewsByRatingResponse,
} from '@/types/api/place-detail'

export async function getLatestPlaces(params: PlaceListQuery) {
  const { data, error } = await api.get<ApiResponse<PlaceLatestListItemResponse[]>>(
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
  return api.get<ApiResponse<PlacePhotoCategory[]>>(API_ENDPOINTS.PLACES_PHOTOS(placeId))
}

export async function getPlaceReviewStatistics(placeId: number) {
  return api.get<ApiResponse<PlaceReviewStatistics>>(
    API_ENDPOINTS.PLACES_REVIEWS_STATISTICS(placeId),
  )
}

export interface GetPlaceReviewsParams {
  page?: number
  size?: number
}

export async function getPlaceReviews(
  placeId: number,
  params?: GetPlaceReviewsParams,
) {
  const queryParams: Record<string, string | number> = {}

  if (params?.page !== undefined) {
    queryParams.page = params.page
  }
  if (params?.size !== undefined) {
    queryParams.size = params.size
  }

  return api.get<ApiResponse<PlaceReviewsByRatingResponse>>(
    API_ENDPOINTS.PLACES_REVIEWS(placeId),
    { params: queryParams },
  )
}
