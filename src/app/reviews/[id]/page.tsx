import CommentInputSection from './_components/CommentInputSection'
import CommentListSection from './_components/CommentListSection'
import ReviewDetailHeaderSection from './_components/ReviewDetailHeaderSection'
import ReviewInfoSection from './_components/ReviewInfoSection'

interface ReviewDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ReviewDetailPage({ params }: ReviewDetailPageProps) {
  const { id } = await params

  const reviewId = Number(id)

  return (
    <>
      <ReviewDetailHeaderSection reviewId={reviewId} />
      <div className="pb-20">
        <ReviewInfoSection reviewId={reviewId} />
        <CommentListSection reviewId={reviewId} />
      </div>
      <CommentInputSection reviewId={reviewId} />
    </>
  )
}
