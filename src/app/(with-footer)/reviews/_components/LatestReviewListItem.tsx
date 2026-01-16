import ReviewAuthorInfo from '@/components/reviews/ReviewAuthorInfo'
import ReviewImageGallery from '@/components/reviews/ReviewImageGallery'
import ReviewOptionDrawer from '@/components/reviews/ReviewOptionDrawer'
import ClampedText from '@/components/ui/ClampedText'
import { PAGE_PATHS } from '@/lib/paths'
import type { ReviewLatestListItemResponse } from '@/types/api/review'

interface LatestReviewListItemProps {
  review: ReviewLatestListItemResponse
  currentMemberId: number | null
}

export default function LatestReviewListItem({
  review,
  currentMemberId,
}: LatestReviewListItemProps) {
  return (
    <div className="px-[15px] pt-3 pb-[30px] bg-white">
      <div className="flex justify-between">
        <ReviewAuthorInfo
          profileImageUrl={review.memberProfileImageUrl}
          nickname={review.memberNickname}
          createdAt={review.createdAt}
        />
        <ReviewOptionDrawer
          reviewId={review.id}
          memberId={review.memberId}
          currentMemberId={currentMemberId}
          memberNickname={review.memberNickname}
          content={review.content}
        />
      </div>
      {review.imageUrls.length > 0 && (
        <div className="mt-[15px]">
          <ReviewImageGallery imageUrls={review.imageUrls} />
        </div>
      )}
      <div className="mt-5">
        <ClampedText text={review.content} href={PAGE_PATHS.REVIEW_DETAIL(review.id)} />
      </div>
      <div className="flex gap-4 mt-3.5">
        <span className="text-xs leading-[12px] text-[#aaaaaa]">좋아요 {review.likeCount}개</span>
        <span className="text-xs leading-[12px] text-[#aaaaaa]">댓글 {review.commentCount}개</span>
      </div>
    </div>
  )
}
