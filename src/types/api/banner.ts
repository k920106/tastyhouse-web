import { PaginationParams } from './api'

export type BannerQuery = PaginationParams & {}

export type Banner = {
  id: number
  imageUrl: string
  linkUrl: string | null
  title: string
}
