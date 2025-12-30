import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { AmenityListItem, FoodTypeListItem, PlaceStation } from '@/types/api/place'
import FilterForm from './FilterForm'

async function getStations() {
  const { data, error } = await api.get<ApiResponse<PlaceStation[]>>(API_ENDPOINTS.STATIONS)

  if (error || !data?.success) {
    throw new Error(error || 'Failed to fetch food types')
  }

  return data.data || []
}

async function getFoodTypes() {
  const { data, error } = await api.get<ApiResponse<FoodTypeListItem[]>>(API_ENDPOINTS.FOOD_TYPES)

  if (error || !data?.success) {
    throw new Error(error || 'Failed to fetch food types')
  }

  return data.data || []
}

async function getAmenities() {
  const { data, error } = await api.get<ApiResponse<AmenityListItem[]>>(API_ENDPOINTS.AMENITIES)

  if (error || !data?.success) {
    throw new Error(error || 'Failed to fetch amenities')
  }

  return data.data || []
}

export default async function PlaceFilterContent() {
  const [stations, foodTypes, amenities] = await Promise.all([
    getStations(),
    getFoodTypes(),
    getAmenities(),
  ])
  return <FilterForm stations={stations} foodTypes={foodTypes} amenities={amenities} />
}
