import { PAGE_PATHS } from '@/lib/paths'
import { cn } from '@/lib/utils'
import ClampedText from '../ui/ClampedText'
import ReviewAuthorInfo from './ReviewAuthorInfo'
import ReviewImageGallery from './ReviewImageGallery'
import ReviewOptionDrawer from './ReviewOptionDrawer'

interface ReviewListItemProps {
  className?: string
  memberProfileImageUrl: string | null
  memberNickname: string
  createdAt: string
  id: number
  memberId: number
  currentMemberId: number | null
  content: string
  imageUrls: string[]
  likeCount: number
  commentCount: number
}

export default function ReviewListItem({
  className,
  memberProfileImageUrl,
  memberNickname,
  createdAt,
  id,
  memberId,
  currentMemberId,
  content,
  imageUrls,
  likeCount,
  commentCount,
}: ReviewListItemProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex justify-between mb-[15px]">
        <ReviewAuthorInfo
          profileImageUrl={memberProfileImageUrl}
          nickname={memberNickname}
          createdAt={createdAt}
        />
        <ReviewOptionDrawer
          reviewId={id}
          memberId={memberId}
          currentMemberId={currentMemberId}
          memberNickname={memberNickname}
          content={content}
        />
      </div>
      <ReviewImageGallery imageUrls={imageUrls} />
      <ClampedText text={content} href={PAGE_PATHS.REVIEW_DETAIL(id)} />
      <div className="flex gap-4 mt-3.5">
        <span className="text-xs leading-[12px] text-[#aaaaaa]">좋아요 {likeCount}개</span>
        <span className="text-xs leading-[12px] text-[#aaaaaa]">댓글 {commentCount}개</span>
      </div>
    </div>
  )
}
