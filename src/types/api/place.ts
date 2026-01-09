import { PaginationParams } from './api'
import { ProductChoiceListItem } from './product'

/**
 * Base types
 */
type Place = {
  id: number
  name: string
  imageUrl: string
}

/**
 * Code types
 */
export type PlaceFoodType =
  | 'KOREAN'
  | 'JAPANESE'
  | 'WESTERN'
  | 'CHINESE'
  | 'WORLD'
  | 'SNACK'
  | 'BAR'
  | 'CAFE'

export type PlaceAmenityCode =
  | 'PARKING'
  | 'RESTROOM'
  | 'RESERVATION'
  | 'BABY_CHAIR'
  | 'PET_FRIENDLY'
  | 'OUTLET'
  | 'TAKEOUT'
  | 'DELIVERY'

export type PlaceImageCategoryCode = 'EXTERIOR' | 'INTERIOR' | 'FOOD' | 'OTHER'

/**
 * Query types
 */
export type PlaceBestQuery = PaginationParams

export type PlaceChoiceQuery = PaginationParams

export type PlaceListQuery = PaginationParams & {
  stationId: number | null
  foodTypes: PlaceFoodType[] | null
  amenities: PlaceAmenityCode[] | null
}

/**
 * Filter types
 */

export type PlaceFilterParams = {
  stationId: number | null
  foodTypes: PlaceFoodType[] | null
  amenities: PlaceAmenityCode[] | null
}

/**
 * Response types
 */
export type PlaceBestListItemResponse = Place & {
  stationName: string
  rating: number
  foodTypes: PlaceFoodType[]
}

export type PlaceChoiceListItemResponse = Place & {
  title: string
  content: string
  products: ProductChoiceListItem[]
}

export type PlaceLatestListItemResponse = Place & {
  stationName: string
  rating: number
  reviewCount: number
  bookmarkCount: number
  createdAt: string
  foodTypes: PlaceFoodType[]
}

export type PlaceMapListItemResponse = {
  id: number
  name: string
  latitude: number
  longitude: number
}

/**
 * List item types
 *
 * 특정 API 엔드포인트의 응답 구조와 직접 대응하나요?
 * 예 (단, 여러 곳에서도 사용됨)
 *
 * 여러 곳(다른 API, 컴포넌트, 상태 관리)에서 재사용되나요?
 * 예 — API 응답, 다른 Response 타입 내부, 컴포넌트 props에서 사용
 *
 * 도메인 엔티티나 비즈니스 모델을 표현하나요?
 * 예 — 편의시설(amenity) 도메인 개념
 */

export type PlaceAmenityListItem = {
  code: PlaceAmenityCode
  name: string
  imageUrlOn: string
  imageUrlOff: string
}

export type PlaceFoodTypeListItem = {
  code: PlaceFoodType
  name: string
  imageUrl: string
}

export type PlaceStationListItem = {
  id: number
  name: string
}

/**
 *
 *
 *
 *
 *
 *
 */
