import ReviewProductHeaderSection from '@/app/reviews/[id]/product/_components/ReviewDetailProductHeaderSection'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { ReviewDetailProductResponse } from '@/types/api/review'
import ReviewProductInfoSection from './ProductInfoSection'

interface ReviewDetailProductFetcherProps {
  reviewId: number
}

export default async function ReviewDetailProductFetcher({ reviewId }: ReviewDetailProductFetcherProps) {
    // API 생성
  const { error, data } = await api.get<ApiResponse<ReviewDetailProductResponse>>(
    API_ENDPOINTS.REVIEW_DETAIL_PRODUCT(reviewId),
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data.success || !data.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />
  }

  const { productId, productName, productImageUrl, productPrice, content, totalRating, tasteRating, amountRating, priceRating, atmosphereRating, kindnessRating, hygieneRating, willRevisit, memberNickname, memberProfileImageUrl, createdAt, imageUrls, tagNames } = data.data

  return (
    <>
      <ReviewProductHeaderSection memberNickname={memberNickname} />
      <ReviewProductInfoSection productId={productId} productName={productName} productImageUrl={productImageUrl} productPrice={productPrice} reviewId={reviewId} content={content} totalRating={totalRating} tasteRating={tasteRating} amountRating={amountRating} priceRating={priceRating} atmosphereRating={atmosphereRating} kindnessRating={kindnessRating} hygieneRating={hygieneRating} willRevisit={willRevisit} memberNickname={memberNickname} memberProfileImageUrl={memberProfileImageUrl || ''} createdAt={createdAt} imageUrls={imageUrls} tagNames={tagNames} />
    </>
  )
}
