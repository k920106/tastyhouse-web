import ReviewOptionButton from '@/components/reviews/ReviewOptionButton'
import ReviewOptionDrawer from '@/components/reviews/ReviewOptionDrawer'
import ReviewOptionError from '@/components/reviews/ReviewOptionError'
import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { PAGE_PATHS } from '@/lib/paths'
import { ApiResponse } from '@/types/api/api'
import { MemberInfoResponse } from '@/types/api/member'
import { ReviewDetail } from '@/types/api/review'
import { cookies } from 'next/headers'
import Link from 'next/link'

interface ReviewOptionDrawerServerProps {
  params: Promise<{ id: string }>
}

export default async function ReviewOptionDrawerServer({ params }: ReviewOptionDrawerServerProps) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')

  if (!accessToken) {
    return (
      <Link href={PAGE_PATHS.LOGIN}>
        <ReviewOptionButton />
      </Link>
    )
  }

  const { id } = await params
  const reviewId = Number(id)

  // API 호출
  const [reviewResponse, memberResponse] = await Promise.all([
    api.get<ApiResponse<ReviewDetail>>(API_ENDPOINTS.REVIEW_DETAIL(reviewId)),
    api.get<ApiResponse<MemberInfoResponse>>(API_ENDPOINTS.MEMBER_ME),
  ])

  const { error: reviewError, data: reviewData } = reviewResponse

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (reviewError) {
    return <ReviewOptionError />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!reviewData || !reviewData.success || !reviewData.data) {
    return <ReviewOptionError />
  }

  const { error: memberError, data: memberData } = memberResponse

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (memberError) {
    return <ReviewOptionError />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!memberData || !memberData.success || !memberData.data) {
    return <ReviewOptionError />
  }

  const { memberId, memberNickname, content } = reviewData.data
  const { id: currentMemberId } = memberData.data

  return (
    <ReviewOptionDrawer
      reviewId={reviewId}
      memberId={memberId}
      currentMemberId={currentMemberId}
      memberNickname={memberNickname}
      content={content}
    />
  )
}
