'use server'

import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { ReviewLikeResponse, ReviewLikeResult } from '@/types/api/review'

export async function toggleReviewLike(reviewId: number): Promise<ReviewLikeResult> {
  try {
    // API 호출
    const { data, error, status } = await api.post<ApiResponse<ReviewLikeResponse>>(
      API_ENDPOINTS.REVIEW_LIKE(reviewId),
    )

    if (status === 401) {
      return { success: false, error: '로그인이 필요합니다.' }
    }

    if (error || !data) {
      return { success: false, error: error || '좋아요 처리에 실패했습니다.' }
    }

    return { success: true, liked: data.data.liked }
  } catch (error) {
    console.error('[Server Action] toggleReviewLike error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '서버 오류가 발생했습니다.',
    }
  }
}
