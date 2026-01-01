'use server'

import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { PlaceBookmarkResponse } from '@/types/api/place-detail'
import { revalidatePath } from 'next/cache'

export interface PlaceBookmarkResult {
  success: boolean
  isBookmarked?: boolean
  error?: string
}

export async function togglePlaceBookmark(placeId: number): Promise<PlaceBookmarkResult> {
  try {
    const { data, error, status } = await api.post<ApiResponse<PlaceBookmarkResponse>>(
      API_ENDPOINTS.PLACES_BOOKMARK(placeId),
    )

    if (status === 401) {
      return { success: false, error: '로그인이 필요합니다.' }
    }

    if (error || !data) {
      return { success: false, error: error || '북마크 처리에 실패했습니다.' }
    }

    revalidatePath(`/places/${placeId}`)

    return { success: true, isBookmarked: data.data.bookmarked }
  } catch (error) {
    console.error('[Server Action] togglePlaceBookmark error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '서버 오류가 발생했습니다.',
    }
  }
}
