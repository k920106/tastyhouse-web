import { api } from '@/lib/api'
import { ApiResponse } from '@/types/common'
import {
  MenuCategory,
  PlaceAmenity,
  PlaceBannerListItemResponse,
  PlaceBestListItemResponse,
  PlaceBestQuery,
  PlaceBookmarkResponse,
  PlaceChoiceListItemResponse,
  PlaceChoiceQuery,
  PlaceFoodTypeListItemResponse,
  PlaceInfoResponse,
  PlaceLatestListItemResponse,
  PlaceLatestQuery,
  PlaceNameResponse,
  PlaceOrderMethodResponse,
  PlacePhotoCategoryResponse,
  PlaceReviewStatisticsResponse,
  PlaceReviewsByRatingQuery,
  PlaceReviewsByRatingResponse,
  PlaceStationListItemResponse,
  PlaceSummaryResponse,
} from './place.type'

const ENDPOINT = '/api/places'

export const placeRepository = {
  async getLatestPlaces(params: PlaceLatestQuery) {
    return api.get<ApiResponse<PlaceLatestListItemResponse[]>>(`${ENDPOINT}/v1/latest`, { params })
  },
  async getBestPlaces(params: PlaceBestQuery) {
    return api.get<ApiResponse<PlaceBestListItemResponse[]>>(`${ENDPOINT}/v1/best`, { params })
  },
  async getChoicePlaces(params: PlaceChoiceQuery) {
    return api.get<ApiResponse<PlaceChoiceListItemResponse[]>>(`${ENDPOINT}/v1/editor-choice`, {
      params,
    })
  },
  async getPlaceStations() {
    return api.get<ApiResponse<PlaceStationListItemResponse[]>>(`${ENDPOINT}/v1/stations`)
  },
  async getPlaceFoodTypes() {
    return api.get<ApiResponse<PlaceFoodTypeListItemResponse[]>>(`${ENDPOINT}/v1/food-types`)
  },
  async getPlaceAmenities() {
    return api.get<ApiResponse<PlaceAmenity[]>>(`${ENDPOINT}/v1/amenities`)
  },
  async getPlaceName(placeId: number) {
    return api.get<ApiResponse<PlaceNameResponse>>(`${ENDPOINT}/v1/${placeId}/name`)
  },
  async getPlaceSummary(placeId: number) {
    return api.get<ApiResponse<PlaceSummaryResponse>>(`${ENDPOINT}/v1/${placeId}/summary`)
  },
  async getPlaceBanners(placeId: number) {
    return api.get<ApiResponse<PlaceBannerListItemResponse[]>>(`${ENDPOINT}/v1/${placeId}/banners`)
  },
  async getPlaceBookmark(placeId: number) {
    return api.get<ApiResponse<PlaceBookmarkResponse>>(`${ENDPOINT}/v1/${placeId}/bookmark`)
  },
  async togglePlaceBookmark(placeId: number) {
    return api.post<ApiResponse<PlaceBookmarkResponse>>(`${ENDPOINT}/v1/${placeId}/bookmark`)
  },
  async getPlaceInfo(placeId: number) {
    return api.get<ApiResponse<PlaceInfoResponse>>(`${ENDPOINT}/v1/${placeId}/info`)
  },
  async getPlaceMenus(placeId: number) {
    return api.get<ApiResponse<MenuCategory[]>>(`${ENDPOINT}/v1/${placeId}/menus`)
  },
  async getPlacePhotos(placeId: number) {
    return api.get<ApiResponse<PlacePhotoCategoryResponse[]>>(`${ENDPOINT}/v1/${placeId}/photos`)
  },
  async getPlaceReviewStatistics(placeId: number) {
    return api.get<ApiResponse<PlaceReviewStatisticsResponse>>(
      `${ENDPOINT}/v1/${placeId}/reviews/statistics`,
    )
  },
  async getPlaceReviews(placeId: number, params: PlaceReviewsByRatingQuery) {
    return api.get<ApiResponse<PlaceReviewsByRatingResponse>>(`${ENDPOINT}/v1/${placeId}/reviews`, {
      params,
    })
  },
  async getPlaceOrderMethods(placeId: number) {
    return api.get<ApiResponse<PlaceOrderMethodResponse>>(`${ENDPOINT}/v1/${placeId}/order-methods`)
  },
}
