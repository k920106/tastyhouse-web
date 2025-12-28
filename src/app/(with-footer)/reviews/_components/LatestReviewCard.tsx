import ReviewAuthorInfo from '@/app/reviews/[id]/_components/ReviewAuthorInfo'
import ReviewImageGallery from '@/app/reviews/[id]/_components/ReviewImageGallery'
import ReviewOptionDrawer from '@/app/reviews/[id]/_components/ReviewOptionDrawer'
import { PAGE_PATHS } from '@/lib/paths'
import { LatestReviewListItem } from '@/types/api/review'
import ClampedText from './ClampedText'

interface LatestReviewCardProps {
  review: LatestReviewListItem
}

export default function LatestReviewCard({ review }: LatestReviewCardProps) {
  const {
    id,
    imageUrls,
    content,
    memberNickname,
    memberProfileImageUrl,
    createdAt,
  }: LatestReviewListItem = review

  return (
    <div className="flex flex-col px-[15px] pt-3 pb-[30px] bg-white">
      <div className="flex justify-between mb-[15px]">
        <ReviewAuthorInfo
          profileImageUrl={memberProfileImageUrl}
          nickname={memberNickname}
          createdAt={createdAt}
        />
        <ReviewOptionDrawer reviewId={id} memberNickname={memberNickname} content={content} />
      </div>
      <ReviewImageGallery imageUrls={imageUrls} />
      <ClampedText text={content} href={PAGE_PATHS.REVIEW_DETAIL(id)} />
      <div className="flex gap-4 mt-3.5">
        <span className="text-xs leading-[12px] text-[#aaaaaa]">좋아요 10개</span>
        <span className="text-xs leading-[12px] text-[#aaaaaa]">댓글 10개</span>
      </div>
    </div>
  )
}
