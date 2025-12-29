import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { CommentListResponse } from '@/types/api/review'
import CommentItem from './CommentItem'

export function CommentListSkeleton() {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <CommentListItemSkeleton key={i} />
      ))}
    </>
  )
}

function CommentListItemSkeleton() {
  return (
    <div className="flex gap-2.5">
      <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
      <div className="flex-1">
        <div className="flex items-center gap-[15px] mb-2.5">
          <Skeleton className="h-[14px] w-[60px]" />
          <Skeleton className="h-[12px] w-[40px]" />
        </div>
        <Skeleton className="h-[12px] w-full" />
        <Skeleton className="h-[12px] w-3/4 mt-1" />
      </div>
    </div>
  )
}

interface CommentListProps {
  reviewId: number
  currentMemberId: number | null
}

export default async function CommentList({ reviewId, currentMemberId }: CommentListProps) {
  const { error, data } = await api.get<ApiResponse<CommentListResponse>>(
    API_ENDPOINTS.REVIEW_COMMENTS(reviewId),
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10" />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data?.success || !data.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('댓글')} className="py-10" />
  }

  const { comments } = data.data

  if (comments.length === 0) {
    return (
      <div className="flex flex-col gap-1">
        <p className="text-sm leading-[14px] text-[#999999] text-center">
          아직 작성된 댓글이 없어요.
        </p>
        <p className="text-sm leading-[14px] text-[#999999] text-center">첫 댓글을 남겨보세요!</p>
      </div>
    )
  }

  return comments.map((comment) => (
    <CommentItem key={comment.id} comment={comment} currentMemberId={currentMemberId} />
  ))
}
