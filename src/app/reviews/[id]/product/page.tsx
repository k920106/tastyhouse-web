import ReviewProductHeaderSection from "./_components/ReviewProductHeaderSection"
import ReviewProductInfoSection from "./_components/ReviewProductInfoSection"

interface ReviewProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ReviewProductDetailPage({ params }: ReviewProductDetailPageProps) {
  const { id } = await params

  const reviewId = Number(id)

  return (
    <>
      <ReviewProductHeaderSection reviewId={reviewId} />
      <ReviewProductInfoSection reviewId={reviewId} />
    </>
  )
}
