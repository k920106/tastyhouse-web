import { PaginationParams } from '@/types/api/api'

export type Banner = {
  id: number
  imageUrl: string
  linkUrl: string | null
  title: string
}

export type BannerQuery = PaginationParams & {}
