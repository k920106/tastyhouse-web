import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { MemberInfoResponse } from '@/types/api/member'
import { Suspense } from 'react'
import CommentList, { CommentListSkeleton } from './CommentList'

interface CommentListSectionProps {
  reviewId: number
}

export default async function CommentListSection({ reviewId }: CommentListSectionProps) {
  const { data } = await api.get<ApiResponse<MemberInfoResponse>>(API_ENDPOINTS.MEMBER_ME)

  const currentMemberId = data?.success && data.data ? data.data.id : null

  return (
    <section>
      <div className="px-[15px] py-5">
        <div className="space-y-[30px]">
          <Suspense fallback={<CommentListSkeleton />}>
            <CommentList reviewId={reviewId} currentMemberId={currentMemberId} />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
