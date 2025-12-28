import ErrorMessage from '@/components/ui/ErrorMessage'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { ReviewDetail } from '@/types/api/review'
import CommentSection from './CommentSection'
import ReviewDetailHeader from './ReviewDetailHeader'
import ReviewDetailSection from './ReviewDetailSection'

interface ReviewDetailContentProps {
  reviewId: string
}

export default async function ReviewDetailContent({ reviewId }: ReviewDetailContentProps) {
  const { error, data } = await api.get<ApiResponse<ReviewDetail>>(
    API_ENDPOINTS.REVIEW_DETAIL(reviewId),
  )

  if (error) {
    return (
      <>
        <ReviewDetailHeader memberNickname="" />
        <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
      </>
    )
  }

  if (!data || !data.success || !data.data) {
    return (
      <>
        <ReviewDetailHeader memberNickname="" />
        <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />
      </>
    )
  }

  const review = data.data

  return (
    <>
      <ReviewDetailHeader memberNickname={review.memberNickname} />
      <div className="pb-20">
        <ReviewDetailSection review={review} />
        <CommentSection comments={[]} />
      </div>
    </>
  )
}
