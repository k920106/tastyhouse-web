import FixedBottomSection from '@/components/ui/FixedBottomSection'
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
    <FixedBottomSection className="px-[15px] py-[15px]">
      <div className="flex items-center gap-[17px]">
        <CommentInput
          reviewId={reviewId}
          userProfileImage={userProfileImage}
          isLoggedIn={currentMemberId !== null}
        />
      </div>
    </FixedBottomSection>
  )
}
