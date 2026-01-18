'use server'

import { placeService } from '@/domains/place'
import { PlaceLatestQuery, PlaceReviewsByRatingQuery } from '@/domains/place/place.type'

export async function getLatestPlaces(query: PlaceLatestQuery) {
  return await placeService.getLatestPlaces(query)
}

export async function getPlaceInfo(placeId: number) {
  return await placeService.getPlaceInfo(placeId)
}

export async function togglePlaceBookmark(placeId: number) {
  return await placeService.togglePlaceBookmark(placeId)
}

export async function getPlaceMenus(placeId: number) {
  return await placeService.getPlaceMenus(placeId)
}

export async function getPlacePhotos(placeId: number) {
  return await placeService.getPlacePhotos(placeId)
}

export async function getPlaceReviewStatistics(placeId: number) {
  return await placeService.getPlaceReviewStatistics(placeId)
}

export async function getPlaceReviews(placeId: number, query: PlaceReviewsByRatingQuery) {
  return await placeService.getPlaceReviews(placeId, query)
}
