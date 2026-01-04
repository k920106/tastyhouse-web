'use server'

import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import {
  CommentCreateRequest,
  CommentCreateResponse,
  ReplyCreateRequest,
  ReplyCreateResponse,
  ReviewLikeResponse,
} from '@/types/api/review'
import { revalidatePath } from 'next/cache'

export async function toggleReviewLike(reviewId: number) {
  return await api.post<ApiResponse<ReviewLikeResponse>>(API_ENDPOINTS.REVIEW_LIKE(reviewId))
}

export async function createComment(reviewId: number, request: CommentCreateRequest) {
  const result = await api.post<ApiResponse<CommentCreateResponse>>(
    API_ENDPOINTS.REVIEW_COMMENTS(reviewId),
    request,
  )

  if (!result.error && result.data && result.data.success && result.data.data) {
    revalidatePath(`/reviews/${reviewId}`)
  }

  return result
}

export async function createReply(
  reviewId: number,
  commentId: number,
  request: ReplyCreateRequest,
) {
  const result = await api.post<ApiResponse<ReplyCreateResponse>>(
    API_ENDPOINTS.COMMENT_REPLIES(commentId),
    request,
  )

  if (!result.error && result.data && result.data.success && result.data.data) {
    revalidatePath(`/reviews/${reviewId}`)
  }

  return result
}
