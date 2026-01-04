import Avatar from '@/components/ui/Avatar'
import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { MemberInfoResponse } from '@/types/api/member'
import { cookies } from 'next/headers'
import CommentInput from './CommentInput'
import CommentSubmitButtonClient from './CommentSubmitButtonClient'
import CommentSubmitButtonError from './CommentSubmitButtonError'

interface CommentInputServerProps {
  params: Promise<{ id: string }>
}

export default async function CommentInputServer({ params }: CommentInputServerProps) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')

  const { id } = await params
  const reviewId = Number(id)

  if (!accessToken) {
    return <CommentInput isLoggedIn={false} avatar={<Avatar src={null} alt="내 프로필" />} />
  }

  // API 호출
  const { error, data } = await api.get<ApiResponse<MemberInfoResponse>>(API_ENDPOINTS.MEMBER_ME)

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return (
      <CommentInput
        isLoggedIn={true}
        avatar={<Avatar src={null} alt="내 프로필" />}
        commentSubmitButton={<CommentSubmitButtonError />}
      />
    )
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data.success || !data.data) {
    return (
      <CommentInput
        isLoggedIn={true}
        avatar={<Avatar src={null} alt="내 프로필" />}
        commentSubmitButton={<CommentSubmitButtonError />}
      />
    )
  }

  const { profileImageUrl, id: memberId } = data.data

  return (
    <CommentInput
      isLoggedIn={memberId != null}
      avatar={<Avatar src={profileImageUrl} alt="내 프로필" />}
      commentSubmitButton={<CommentSubmitButtonClient reviewId={reviewId} />}
    />
  )
}
