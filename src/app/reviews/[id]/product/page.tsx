import ReviewDetailHeaderSection from '@/components/reviews/ReviewDetailHeaderSection'
import ProductInfoSection from './_components/ProductInfoSection'

interface ProductReviewPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductReviewPage({ params }: ProductReviewPageProps) {
  const { id } = await params

  const reviewId = Number(id)

  return (
    <>
      <ReviewDetailHeaderSection reviewId={reviewId} />
      {/* 상품 정보 */}
      <ProductInfoSection reviewId={reviewId} />
      <div className="pb-20"></div>
    </>
  )
}
