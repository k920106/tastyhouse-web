'use client'

import ReviewImageGallery from '@/components/reviews/ReviewImageGallery'
import Avatar from '@/components/ui/Avatar'
import Nickname from '@/components/ui/Nickname'
import { formatTimeAgo } from '@/lib/date'
import { formatDecimal } from '@/lib/number'
import { PlaceReviewListItemResponse } from '@/types/api/place-detail'

interface ReviewListItemProps {
  review: PlaceReviewListItemResponse
}

export default function ReviewListItem({ review }: ReviewListItemProps) {
  const { memberId, memberNickname, content, totalRating, images, createdAt } = review

  const imageUrls = images.map((img) => img.imageUrl)
  const displayNickname = memberNickname || `회원${memberId}`

  return (
    <div className="pb-6 border-b border-[#eeeeee]">
      {/* 헤더: 프로필, 닉네임, 시간, 평점 */}
      <div className="flex items-start gap-[10px] mb-3">
        <Avatar src={null} alt={displayNickname} className="size-[80px]" />
        <div className="flex-1 min-w-0">
          <div className="mb-1">
            <Nickname size="md" className="text-[28px] leading-[46px]">
              {displayNickname}
            </Nickname>
          </div>
          <div className="text-[24px] leading-[60px] text-[#999999]">
            {formatTimeAgo(createdAt)}
          </div>
        </div>
        <div className="text-[34px] leading-[20px] text-[#a91201] text-right">
          {formatDecimal(totalRating, 1)}
        </div>
      </div>

      {/* 리뷰 내용 */}
      <div className="mb-3">
        <p className="text-[28px] leading-[46px] text-[#333333] line-clamp-4">{content}</p>
        {content.length > 150 && (
          <button className="mt-2 text-[28px] leading-[46px] text-[#cccccc]">더보기</button>
        )}
      </div>

      {/* 이미지 갤러리 */}
      {imageUrls.length > 0 && (
        <div className="mb-3">
          <ReviewImageGallery imageUrls={imageUrls} />
        </div>
      )}
    </div>
  )
}
