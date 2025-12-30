'use server'

import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse, PagedApiResponse } from '@/types/api/api'
import { MemberInfoResponse } from '@/types/api/member'
import { LatestReview, LatestReviewQuery } from '@/types/api/review'

export async function getLatestReviews(params: LatestReviewQuery) {
  const { data, error } = await api.get<PagedApiResponse<LatestReview>>(
    API_ENDPOINTS.REVIEWS_LATEST,
    { params },
  )

  if (error || !data?.success) {
    throw new Error(error || 'Failed to fetch reviews')
  }

  return data
}

export async function getCurrentMemberId(): Promise<number | null> {
  const { data } = await api.get<ApiResponse<MemberInfoResponse>>(API_ENDPOINTS.MEMBER_ME)

  return data?.success && data.data ? data.data.id : null
}
