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
  tags: string[]
}

export type ChoicePlaceQuery = PaginationParams & {}

export type ChoicePlace = Place & {
  title: string
  content: string
  products: ChoiceProduct[]
}

export type PlaceListQuery = PaginationParams & {}

export type PlaceListItem = Place & {
  stationName: string
  rating: number
  tags: string[]
  reviewCount: number
  bookmarkCount: number
  createdAt: string
}

type Place = {
  id: number
  name: string
  imageUrl: string
}
