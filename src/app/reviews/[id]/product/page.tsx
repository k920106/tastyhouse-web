import ReviewDetailProductFetcher from "./_components/ReviewDetailProductFetcher"

interface ProductReviewPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductReviewPage({ params }: ProductReviewPageProps) {
  const { id } = await params

  const reviewId = Number(id)

  return <ReviewDetailProductFetcher reviewId={reviewId} />
}
