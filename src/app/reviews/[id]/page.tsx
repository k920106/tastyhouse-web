import ReviewDetailHeaderSection from '@/components/reviews/ReviewDetailHeaderSection'
import CommentInputSection from './_components/CommentInputSection'
import CommentListSection from './_components/CommentListSection'
import { ReplyProvider } from './_components/ReplyContext'
import ReviewInfoSection from './_components/ReviewInfoSection'

interface ReviewDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ReviewDetailPage({ params }: ReviewDetailPageProps) {
  const { id } = await params

  const reviewId = Number(id)

  return (
    <ReplyProvider>
      <ReviewDetailHeaderSection reviewId={reviewId} />
      <div className="pb-20">
        <ReviewInfoSection reviewId={reviewId} />
        <CommentListSection params={params} />
      </div>
      <CommentInputSection params={params} />
    </ReplyProvider>
  )
}
