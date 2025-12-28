import Avatar from '@/components/ui/Avatar'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Nickname from '@/components/ui/Nickname'
import TimeAgo from '@/components/ui/TimeAgo'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/shadcn/drawer'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { CommentListResponse } from '@/types/api/review'
import { FiMoreVertical } from 'react-icons/fi'

export function CommentListSkeleton() {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <CommentListItemSkeleton key={i} />
      ))}
    </>
  )
}

export function CommentListItemSkeleton() {
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
}

export default async function CommentList({ reviewId }: CommentListProps) {
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
    <div key={comment.id}>
      <div className="flex gap-2.5">
        <Avatar src={comment.memberProfileImageUrl} alt={comment.memberNickname} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[15px] mb-2.5">
            <Nickname>{comment.memberNickname}</Nickname>
            <TimeAgo date={comment.createdAt} />
          </div>
          <p className="text-xs leading-relaxed">{comment.content}</p>
          <button className="mt-[15px] text-xs leading-[12px] text-[#999999]">답글달기</button>
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <button className="h-[18px] cursor-pointer flex-shrink-0">
              <FiMoreVertical size={18} color="#999999" />
            </button>
          </DrawerTrigger>
          <DrawerContent className="bg-transparent p-[15px] border-none">
            <DrawerTitle className="sr-only">댓글 옵션</DrawerTitle>
            <DrawerDescription className="sr-only">신고, 차단</DrawerDescription>
            <div className="text-center bg-white rounded-[14px]">
              <DrawerClose asChild>
                <button className="w-full py-[20.5px] text-sm leading-[14px]">신고</button>
              </DrawerClose>
              <div className="h-px bg-[#f6f6f6]" />
              <DrawerClose asChild>
                <button className="w-full py-[20.5px] text-sm leading-[14px]">차단</button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-[34px] mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="flex gap-2.5">
              <Avatar src={reply.memberProfileImageUrl} alt={reply.memberNickname} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2.5">
                  <Nickname size="sm">{reply.memberNickname}</Nickname>
                  <TimeAgo date={reply.createdAt} />
                </div>
                <p className="text-xs leading-relaxed">{reply.content}</p>
                <button className="mt-[15px] text-xs leading-[12px] text-[#999999]">
                  답글달기
                </button>
              </div>
              <Drawer>
                <DrawerTrigger asChild>
                  <button className="h-[18px] cursor-pointer flex-shrink-0">
                    <FiMoreVertical size={18} color="#999999" />
                  </button>
                </DrawerTrigger>
                <DrawerContent className="bg-transparent p-[15px] border-none">
                  <DrawerTitle className="sr-only">댓글 옵션</DrawerTitle>
                  <DrawerDescription className="sr-only">신고, 차단</DrawerDescription>
                  <div className="text-center bg-white rounded-[14px]">
                    <DrawerClose asChild>
                      <button className="w-full py-[20.5px] text-sm leading-[14px]">신고</button>
                    </DrawerClose>
                    <div className="h-px bg-[#f6f6f6]" />
                    <DrawerClose asChild>
                      <button className="w-full py-[20.5px] text-sm leading-[14px]">차단</button>
                    </DrawerClose>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          ))}
        </div>
      )}
    </div>
  ))
}
