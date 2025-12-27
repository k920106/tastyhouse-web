'use client'

import 'swiper/css'
import 'swiper/css/pagination'
import styles from './LatestReviewCard.module.css'

import Avatar from '@/components/ui/Avatar'
import Nickname from '@/components/ui/Nickname'
import { PAGE_PATHS } from '@/lib/paths'
import { LatestReviewListItem } from '@/types/api/review'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface LatestReviewCardProps {
  review: LatestReviewListItem
}

function formatTimeAgo(dateString: string) {
  const now = new Date()
  const past = new Date(dateString)
  const diffInMs = now.getTime() - past.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 1) return '방금 전'
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`
  if (diffInHours < 24) return `${diffInHours}시간 전`
  if (diffInDays < 7) return `${diffInDays}일 전`

  return past.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
}

export default function LatestReviewCard({ review }: LatestReviewCardProps) {
  const contentRef = useRef<HTMLParagraphElement>(null)
  const [isClamped, setIsClamped] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const element = contentRef.current
    if (element) {
      setIsClamped(element.scrollHeight > element.clientHeight)
    }
  }, [review.content])

  // 버튼 클릭 시, 신고, 링크 복사, 취소 팝업 노출

  return (
    <div className="flex flex-col px-[15px] pt-3 pb-[30px] bg-white">
      <div className="flex justify-between mb-[15px]">
        <div className="flex items-center gap-2.5">
          <Avatar src={review.memberProfileImageUrl} alt={review.memberNickname} />
          <div className="flex flex-col gap-2">
            <Nickname>{review.memberNickname}</Nickname>
            <p className="text-xs leading-[12px] text-[#999999]">
              {formatTimeAgo(review.createdAt)}
            </p>
          </div>
        </div>
        <button className="h-[18px]">
          <FiMoreVertical size={20} color="#999999" />
        </button>
      </div>
      {review.imageUrls.length > 0 && (
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{
            type: 'fraction',
            formatFractionCurrent: (number) => number,
            formatFractionTotal: (number) => number,
          }}
          className={`w-full aspect-[345/190] ${styles.reviewSwiper}`}
        >
          {review.imageUrls.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <div
                className={`relative w-full h-full ${review.imageUrls.length > 1 && 'cursor-pointer'}`}
              >
                <Image
                  src={imageUrl}
                  alt={`${review.title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="relative mb-3.5">
        <Link href={PAGE_PATHS.REVIEW_DETAIL(review.id)} className="">
          <p
            ref={contentRef}
            className={`pt-5 text-[14px] leading-relaxed ${!isExpanded ? 'line-clamp-5' : ''}`}
          >
            {review.content}
          </p>
        </Link>
        {isClamped && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="absolute bottom-0 right-0 text-[14px] text-[#cccccc] bg-white pl-1"
          >
            <span className="text-black mr-2">...</span>
            <span className="cursor-pointer">더보기</span>
          </button>
        )}
      </div>
      <div className="flex gap-4">
        <span className="text-xs leading-[12px] text-[#aaaaaa]">좋아요 10개</span>
        <span className="text-xs leading-[12px] text-[#aaaaaa]">댓글 10개</span>
      </div>
    </div>
  )
}
