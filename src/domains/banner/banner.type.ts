import type { PaginationParams } from '@/types/common'

export type Banner = {
  id: number
  imageUrl: string
  linkUrl: string | null
  title: string
}

export type BannerQuery = PaginationParams & {}
