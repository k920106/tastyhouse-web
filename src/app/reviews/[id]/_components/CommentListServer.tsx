import ErrorMessage from '@/components/ui/ErrorMessage'
import { memberService } from '@/domains/member'
import { reviewService } from '@/domains/review'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import CommentList from './CommentList'

interface CommentListServerProps {
  params: Promise<{ id: string }>
}

export default async function CommentListServer({ params }: CommentListServerProps) {
  const { id } = await params
  const reviewId = Number(id)

  // API 호출
  const [commentResponse, memberResponse] = await Promise.all([
    reviewService.getReviewComments(reviewId),
    memberService.getMemberMe(),
  ])

  const { error: commentError, data: commentData } = commentResponse
  const { error: memberError, data: memberData } = memberResponse

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (commentError || memberError) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!commentData || !commentData.success || !commentData.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('댓글')} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!memberData || !memberData.success || !memberData.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('유저')} />
  }

  const { comments } = commentData.data

  const { id: currentMemberId } = memberData.data

  return <CommentList comments={comments} currentMemberId={currentMemberId} />
}
