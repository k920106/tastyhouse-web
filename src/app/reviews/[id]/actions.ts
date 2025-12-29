'use server'

import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import {
  CommentCreateRequest,
  CommentCreateResponse,
  CommentCreateResult,
  ReplyCreateRequest,
  ReplyCreateResponse,
  ReplyCreateResult,
  ReviewLikeResponse,
  ReviewLikeResult,
} from '@/types/api/review'
import { revalidatePath } from 'next/cache'

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

export async function createComment(
  reviewId: number,
  content: string,
): Promise<CommentCreateResult> {
  try {
    const request: CommentCreateRequest = { content }

    const { data, error, status } = await api.post<ApiResponse<CommentCreateResponse>>(
      API_ENDPOINTS.REVIEW_COMMENTS(reviewId),
      request,
    )

    if (status === 401) {
      return { success: false, error: '로그인이 필요합니다.' }
    }

    if (error || !data) {
      return { success: false, error: error || '댓글 등록에 실패했습니다.' }
    }

    revalidatePath(`/reviews/${reviewId}`)

    return { success: true, data: data.data }
  } catch (error) {
    console.error('[Server Action] createComment error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '서버 오류가 발생했습니다.',
    }
  }
}

export async function createReply(
  reviewId: number,
  commentId: number,
  content: string,
  replyToMemberId: number,
): Promise<ReplyCreateResult> {
  try {
    const request: ReplyCreateRequest = { content, replyToMemberId }

    const { data, error, status } = await api.post<ApiResponse<ReplyCreateResponse>>(
      API_ENDPOINTS.COMMENT_REPLIES(commentId),
      request,
    )

    if (status === 401) {
      return { success: false, error: '로그인이 필요합니다.' }
    }

    if (error || !data) {
      return { success: false, error: error || '답글 등록에 실패했습니다.' }
    }

    revalidatePath(`/reviews/${reviewId}`)

    return { success: true, data: data.data }
  } catch (error) {
    console.error('[Server Action] createReply error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '서버 오류가 발생했습니다.',
    }
  }
}
