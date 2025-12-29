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
  rating: number
  stationName: string
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
  createdAt: string
}

type Place = {
  id: number
  name: string
  imageUrl: string
}
