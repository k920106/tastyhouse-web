export interface PageInfo {
  page: number
  size: number
  totalElements: number
  totalPages: number
}

export interface PagedApiResponse<T> {
  success: boolean
  data: T[]
  pagination: PageInfo
  message: string | null
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string | null
}
