'use client'

import 'swiper/css'
import 'swiper/css/pagination'
import styles from './LatestReviewCard.module.css'

import Avatar from '@/components/ui/Avatar'
import Nickname from '@/components/ui/Nickname'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/shadcn/drawer'
import { PAGE_PATHS } from '@/lib/paths'
import { copyToClipboard, share } from '@/lib/share'
import { LatestReviewListItem } from '@/types/api/review'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
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
  const contentRef = useRef<HTMLAnchorElement>(null)
  const [isClamped, setIsClamped] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const getShareUrl = useCallback(() => {
    return `${window.location.origin}/reviews/${review.id}`
  }, [review.id])

  const handleShare = useCallback(async () => {
    await share({
      title: review.title || '맛집 리뷰',
      text: review.content?.slice(0, 100) || '',
      url: getShareUrl(),
    })
  }, [review.title, review.content, getShareUrl])

  const handleCopyLink = useCallback(async () => {
    const success = await copyToClipboard(getShareUrl())
    if (success) {
      alert('링크가 복사되었습니다.')
    }
  }, [getShareUrl])

  useEffect(() => {
    const element = contentRef.current
    if (element) {
      setIsClamped(element.scrollHeight > element.clientHeight)
    }
  }, [review.content])

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
        <Drawer autoFocus>
          <DrawerTrigger asChild>
            <button className="h-[18px] cursor-pointer">
              <FiMoreVertical size={20} color="#999999" />
            </button>
          </DrawerTrigger>
          <DrawerContent className="bg-transparent p-[15px] border-none">
            <DrawerTitle className="sr-only">리뷰 옵션</DrawerTitle>
            <DrawerDescription className="sr-only">신고, 공유</DrawerDescription>
            <div className="text-center bg-white rounded-[14px]">
              <DrawerClose asChild>
                <button className="w-full py-[20.5px] text-sm leading-[14px]">신고</button>
              </DrawerClose>
              <div className="h-px bg-[#f6f6f6]" />
              <DrawerClose asChild>
                <button className="w-full py-[20.5px] text-sm leading-[14px]" onClick={handleShare}>
                  공유
                </button>
              </DrawerClose>
              <div className="h-px bg-[#f6f6f6]" />
              <DrawerClose asChild>
                <button
                  className="w-full py-[20.5px] text-sm leading-[14px]"
                  onClick={handleCopyLink}
                >
                  링크 복사
                </button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      {review.imageUrls.length > 0 && (
        <div className="mb-5">
          <Swiper
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{
              type: 'fraction',
              formatFractionCurrent: (number) => number,
              formatFractionTotal: (number) => number,
            }}
            className={`aspect-[345/190] ${styles.reviewSwiper}`}
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
                    sizes="calc(100vw - 30px)"
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <div className="relative">
        <Link
          href={PAGE_PATHS.REVIEW_DETAIL(review.id)}
          className={`text-sm leading-relaxed ${!isExpanded ? 'line-clamp-5' : ''}`}
          ref={contentRef}
        >
          {review.content}
        </Link>
        {isClamped && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="absolute bottom-1 right-0 text-sm leading-[14px] text-[#cccccc] bg-white pl-1"
          >
            <span className="text-black">... </span>
            <span className="cursor-pointer">더보기</span>
          </button>
        )}
      </div>
      <div className="flex gap-4 mt-3.5">
        <span className="text-xs leading-[12px] text-[#aaaaaa]">좋아요 10개</span>
        <span className="text-xs leading-[12px] text-[#aaaaaa]">댓글 10개</span>
      </div>
    </div>
  )
}
