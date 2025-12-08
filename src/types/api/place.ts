export interface PlaceData {
  id: number
  latitude: number
  longitude: number
  placeName: string
}

export interface BestPlace {
  id: number
  placeName: string
  stationName: string
  rating: number
  imageUrl: string
  tags: string[]
}
