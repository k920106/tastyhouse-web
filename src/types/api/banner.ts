import { PaginationParams } from './api'

/**
 * Domain types
 */
export type Banner = {
  id: number
  imageUrl: string
  linkUrl: string | null
  title: string
}

/**
 * Query types
 */
export type BannerQuery = PaginationParams & {}
