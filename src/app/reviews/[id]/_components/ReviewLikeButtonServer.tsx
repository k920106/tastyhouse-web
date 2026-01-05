import ReviewLikeButtonError from '@/app/reviews/[id]/_components/ReviewLikeButtonError'
import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { PAGE_PATHS } from '@/lib/paths'
import { ApiResponse } from '@/types/api/api'
import { ReviewLikeResponse } from '@/types/api/review'
import { cookies } from 'next/headers'
import Link from 'next/link'
import ReviewLikeButton from './ReviewLikeButton'
import ReviewLikeButtonClient from './ReviewLikeButtonClient'

interface ReviewLikeButtonServerProps {
  reviewId: number
}

export default async function ReviewLikeButtonServer({ reviewId }: ReviewLikeButtonServerProps) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')

  if (!accessToken) {
    return (
      <Link href={PAGE_PATHS.LOGIN}>
        <ReviewLikeButton isLiked={false} />
      </Link>
    )
  }

  // API 호출
  const { error, data } = await api.get<ApiResponse<ReviewLikeResponse>>(
    API_ENDPOINTS.REVIEW_LIKE(reviewId),
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ReviewLikeButtonError />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data.success || !data.data) {
    return <ReviewLikeButtonError />
  }

  return <ReviewLikeButtonClient initialIsLiked={data.data.liked} reviewId={reviewId} />
}
