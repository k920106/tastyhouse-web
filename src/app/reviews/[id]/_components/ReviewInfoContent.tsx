import CommentInputSection from './CommentInputSection'
import CommentListSection from './CommentListSection'
import ReviewInfoHeaderSection from './ReviewInfoHeaderSection'
import ReviewInfoSection from './ReviewInfoSection'

interface ReviewInfoContentProps {
  reviewId: number
}

export default function ReviewInfoContent({ reviewId }: ReviewInfoContentProps) {
  return (
    <>
      <ReviewInfoHeaderSection reviewId={reviewId} />
      <div className="pb-20">
        <ReviewInfoSection reviewId={reviewId} />
        <CommentListSection reviewId={reviewId} />
      </div>
      <CommentInputSection reviewId={reviewId} />
    </>
  )
}
