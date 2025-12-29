import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { MemberInfoResponse } from '@/types/api/member'
import CommentInput from './CommentInput'

interface CommentInputSectionProps {
  reviewId: number
}

export default async function CommentInputSection({ reviewId }: CommentInputSectionProps) {
  const { data } = await api.get<ApiResponse<MemberInfoResponse>>(API_ENDPOINTS.MEMBER_ME)

  const currentMemberId = data?.success && data.data ? data.data.id : null
  const userProfileImage = data?.success && data.data ? data.data.profileImageUrl : null

  return (
    <section className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#eeeeee] box-border">
      <div className="flex items-center gap-[17px] px-[15px] py-[15px]">
        <CommentInput
          reviewId={reviewId}
          userProfileImage={userProfileImage}
          isLoggedIn={currentMemberId !== null}
        />
      </div>
    </section>
  )
}
