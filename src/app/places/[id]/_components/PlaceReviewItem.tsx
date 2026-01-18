import ReviewAuthorInfo from '@/components/reviews/ReviewAuthorInfo'
import ReviewImageGallery from '@/components/reviews/ReviewImageGallery'
import ClampedText from '@/components/ui/ClampedText'
import Rating from '@/components/ui/Rating'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

interface PlaceReviewListItemProps {
  memberProfileImageUrl: string | null
  memberNickname: string
  createdAt: string
  totalRating: number
  productId: number | null
  productName: string | null
  content: string
  id: number
  imageUrls: string[]
}

export default function PlaceReviewListItem({
  memberProfileImageUrl,
  memberNickname,
  createdAt,
  totalRating,
  productId,
  productName,
  content,
  id,
  imageUrls,
}: PlaceReviewListItemProps) {
  return (
    <div className="py-5">
      <div className="flex justify-between">
        <ReviewAuthorInfo
          profileImageUrl={memberProfileImageUrl}
          nickname={memberNickname}
          createdAt={createdAt}
        />
        <Rating as="p" value={totalRating} />
      </div>
      {productId && (
        <div className="mt-[25px]">
          <Link
            href={PAGE_PATHS.PRODUCT_DETAIL(productId)}
            className="block text-sm leading-[14px] text-[#999999]"
          >
            [선택] {productName}
          </Link>
        </div>
      )}
      <div className="mt-[15px]">
        <ClampedText text={content} href={PAGE_PATHS.REVIEW_PRODUCT_DETAIL(id)} />
      </div>
      {imageUrls.length > 0 && (
        <div className="mt-5">
          <ReviewImageGallery imageUrls={imageUrls} />
        </div>
      )}
    </div>
  )
}
