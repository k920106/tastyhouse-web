import { PaginationParams } from './api'
import { ChoiceProduct } from './product'

export type MapPlace = {
  id: number
  name: string
  latitude: number
  longitude: number
}

export type BestPlaceQuery = PaginationParams & {}

export type BestPlace = Place & {
  stationName: string
  rating: number
  foodTypes: FoodType[]
}

export type ChoicePlaceQuery = PaginationParams & {}

export type ChoicePlace = Place & {
  title: string
  content: string
  products: ChoiceProduct[]
}

export type PlaceListQuery = PaginationParams & {
  stationId: number | null
  foodTypes: FoodType[] | null
  amenities: PlaceAmenityCode[] | null
}

export type PlaceListItem = Place & {
  stationName: string
  rating: number
  reviewCount: number
  bookmarkCount: number
  createdAt: string
  foodTypes: FoodType[]
}

type Place = {
  id: number
  name: string
  imageUrl: string
}

export type PlaceFilterParams = {
  stationId: number | null
  foodTypes: FoodType[] | null
  amenities: PlaceAmenityCode[] | null
}

export type FoodType =
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

export type PlaceStation = {
  id: number
  name: string
}

export type FoodTypeListItem = {
  code: FoodType
  name: string
  imageUrl: string
}

export type PlaceAmenity = {
  code: PlaceAmenityCode
  name: string
  imageUrlOn: string
  imageUrlOff: string
}
