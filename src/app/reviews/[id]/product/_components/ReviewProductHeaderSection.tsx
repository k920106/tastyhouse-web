import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import ReviewDetailHeader from '@/components/reviews/ReviewDetailHeader'
import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { ReviewDetailProductResponse } from '@/types/api/review'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderCenter>
        {children}
      </HeaderCenter>
    </Header>
  )
}

interface ReviewProductHeaderSectionProps {
  reviewId: number
}

export default async function ReviewProductHeaderSection({ reviewId }: ReviewProductHeaderSectionProps) {
  // API 생성
  const { error, data } = await api.get<ApiResponse<ReviewDetailProductResponse>>(
    API_ENDPOINTS.REVIEW_DETAIL_PRODUCT(reviewId),
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return (
      <Layout>
        <ReviewDetailHeader />
      </Layout>
    )
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data.success || !data.data) {
    return (
      <Layout>
        <ReviewDetailHeader />
      </Layout>
    )
  }

  const { memberNickname } = data.data

  return (
    <Layout>
      <ReviewDetailHeader memberNickname={memberNickname} />
    </Layout>
  )
}
