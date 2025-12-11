import { ChoiceProduct } from './product'

export interface PlaceData {
  id: number
  latitude: number
  longitude: number
  name: string
}

export interface BestPlace {
  id: number
  imageUrl: string
  name: string
  rating: number
  stationName: string
  tags: string[]
}

export interface ChoicePlace {
  id: number
  content: string
  imageUrl: string
  name: string
  products: ChoiceProduct[]
  title: string
}
