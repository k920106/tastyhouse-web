export type PaginationParams = {
  page: number
  size: number
}

type PageInfo = {
  page: number
  size: number
  totalElements: number
  totalPages: number
}

export type ApiResponse<T> = {
  success: boolean
  message: string | null
  data?: T
  pagination?: PageInfo
}
