import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'
import ClampedText from '../ui/ClampedText'
import ReviewAuthorInfo from './ReviewAuthorInfo'
import ReviewImageGallery from './ReviewImageGallery'

interface ReviewListItemProps {
  className?: string
  memberProfileImageUrl: string | null
  memberNickname: string
  createdAt: string
  productId?: number
  productName?: string
  id: number
  content: string
  imageUrls: string[]
  headerRight?: React.ReactNode
  footer?: React.ReactNode
  imagePosition?: 'top' | 'bottom'
}

export default function ReviewListItem({
  className,
  memberProfileImageUrl,
  memberNickname,
  createdAt,
  productId,
  productName,
  id,
  content,
  imageUrls,
  headerRight,
  footer,
  imagePosition = 'top',
}: ReviewListItemProps) {
  const imageGallery = imageUrls.length > 0 && (
    <div className={imagePosition === 'top' ? 'mt-[15px]' : 'mt-[19px]'}>
      <ReviewImageGallery imageUrls={imageUrls} />
    </div>
  )

  return (
    <div className={className}>
      <div className="flex justify-between">
        <ReviewAuthorInfo
          profileImageUrl={memberProfileImageUrl}
          nickname={memberNickname}
          createdAt={createdAt}
        />
        {headerRight}
      </div>
      {productId && (
        <Link
          href={PAGE_PATHS.PRODUCT_DETAIL(productId)}
          className="block mt-[25px] text-sm leading-[14px] text-[#999999]"
        >
          [선택] {productName}
        </Link>
      )}
      {imagePosition === 'top' && imageGallery}
      <div className={imagePosition === 'top' ? 'mt-5' : 'mt-[15px]'}>
        <ClampedText text={content} href={PAGE_PATHS.REVIEW_DETAIL(id)} />
      </div>
      {imagePosition === 'bottom' && imageGallery}
      {footer}
    </div>
  )
}
