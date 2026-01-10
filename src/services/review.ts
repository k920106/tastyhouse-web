'use server'

import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse, PagedApiResponse } from '@/types/api/api'
import { MemberInfoResponse } from '@/types/api/member'
import { ReviewLatestListItemResponse, ReviewLatestQuery } from '@/types/api/review'

export async function getLatestReviews(params: ReviewLatestQuery) {
  const { data, error } = await api.get<PagedApiResponse<ReviewLatestListItemResponse>>(
    API_ENDPOINTS.REVIEWS_LATEST,
    { params },
  )

  if (error || !data || !data.success || !data.data) {
    throw new Error(error || 'Failed to fetch reviews')
  }

  return data
}

export async function getCurrentMemberId(): Promise<number | null> {
  const { data, error } = await api.get<ApiResponse<MemberInfoResponse>>(API_ENDPOINTS.MEMBER_ME)

  if (error || !data || !data.success || !data.data) {
    throw new Error(error || 'Failed to fetch reviews')
  }

  return data.data.id
}
