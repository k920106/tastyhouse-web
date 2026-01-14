import { PAGE_PATHS } from '@/lib/paths'
import { cn } from '@/lib/utils'
import ClampedText from '../ui/ClampedText'
import ReviewAuthorInfo from './ReviewAuthorInfo'
import ReviewImageGallery from './ReviewImageGallery'

interface ReviewListItemProps {
  className?: string
  memberProfileImageUrl: string | null
  memberNickname: string
  createdAt: string
  id: number
  content: string
  imageUrls: string[]
  headerRight?: React.ReactNode
  footer?: React.ReactNode
}

export default function ReviewListItem({
  className,
  memberProfileImageUrl,
  memberNickname,
  createdAt,
  id,
  content,
  imageUrls,
  headerRight,
  footer,
}: ReviewListItemProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex justify-between mb-[15px]">
        <ReviewAuthorInfo
          profileImageUrl={memberProfileImageUrl}
          nickname={memberNickname}
          createdAt={createdAt}
        />
        {headerRight}
      </div>
      <ReviewImageGallery imageUrls={imageUrls} />
      <ClampedText text={content} href={PAGE_PATHS.REVIEW_DETAIL(id)} />
      {footer}
    </div>
  )
}
