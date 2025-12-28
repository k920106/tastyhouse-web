'use client'

import 'swiper/css'
import 'swiper/css/pagination'
import styles from './ReviewDetailSection.module.css'

import Avatar from '@/components/ui/Avatar'
import HashTag from '@/components/ui/HashTag'
import Nickname from '@/components/ui/Nickname'
import TimeAgo from '@/components/ui/TimeAgo'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/shadcn/drawer'
import { copyToClipboard, share } from '@/lib/share'
import { ReviewDetail } from '@/types/api/review'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { IoChatboxOutline } from 'react-icons/io5'
import { PiHeartFill, PiHeartThin } from 'react-icons/pi'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface ReviewDetailSectionProps {
  review: ReviewDetail
}

export default function ReviewDetailSection({ review }: ReviewDetailSectionProps) {
  const [isLiked, setIsLiked] = useState(review.isLiked)

  const getShareUrl = useCallback(() => {
    return `${window.location.origin}/reviews/${review.id}`
  }, [review.id])

  const handleShare = useCallback(async () => {
    await share({
      title: `${review.memberNickname}님의 리뷰`,
      text: review.content.slice(0, 100),
      url: getShareUrl(),
    })
  }, [review.memberNickname, review.content, getShareUrl])

  const handleCopyLink = useCallback(async () => {
    const success = await copyToClipboard(getShareUrl())
    if (success) {
      alert('링크가 복사되었습니다.')
    }
  }, [getShareUrl])

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <section className="px-[15px] pt-5 pb-8">
      <div className="flex justify-between mb-[15px]">
        <div className="flex items-center gap-2.5">
          <Avatar src={review.memberProfileImageUrl} alt={review.memberNickname} />
          <div className="flex flex-col gap-2">
            <Nickname>{review.memberNickname}</Nickname>
            <TimeAgo date={review.createdAt} />
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
            <DrawerDescription className="sr-only">신고, 공유, 링크 복사</DrawerDescription>
            <div className="text-center bg-white rounded-[14px]">
              <DrawerClose asChild>
                <button
                  className="w-full py-[20.5px] text-sm leading-[14px]"
                  onClick={handleCopyLink}
                >
                  링크 복사
                </button>
              </DrawerClose>
              <div className="h-px bg-[#f6f6f6]" />
              <DrawerClose asChild>
                <button className="w-full py-[20.5px] text-sm leading-[14px]" onClick={handleShare}>
                  공유
                </button>
              </DrawerClose>
              <div className="h-px bg-[#f6f6f6]" />
              <DrawerClose asChild>
                <button className="w-full py-[20.5px] text-sm leading-[14px]">신고</button>
              </DrawerClose>
              <div className="h-px bg-[#f6f6f6]" />
              <DrawerClose asChild>
                <button className="w-full py-[20.5px] text-sm leading-[14px]">차단</button>
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
            className={`aspect-[345/190] ${styles.reviewSwiper} ${review.imageUrls.length === 1 ? styles.reviewSwiperSingleImage : ''}`}
          >
            {review.imageUrls.map((imageUrl: string, index: number) => (
              <SwiperSlide key={index}>
                <div
                  className={`relative w-full h-full ${review.imageUrls.length > 1 ? 'cursor-pointer' : ''}`}
                >
                  <Image
                    src={imageUrl}
                    alt={`리뷰 이미지 ${index + 1}`}
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
      <p className="text-sm leading-[23px] whitespace-pre-wrap break-words">{review.content}</p>
      {review.tagNames && review.tagNames.length > 0 && (
        <div className="flex flex-wrap gap-[7px] mt-5">
          {review.tagNames.map((tag: string, index: number) => (
            <HashTag key={index} tag={tag} variant="secondary" />
          ))}
        </div>
      )}
      <div className="flex items-center gap-5 mt-[15px] pt-[17px] border-t border-[#eeeeee] box-border">
        <button onClick={handleLike} className="flex items-center gap-1.5 cursor-pointer">
          {isLiked ? <PiHeartFill size={17} className="text-main" /> : <PiHeartThin size={17} />}
          <span className="text-xs leading-[12px]">좋아요</span>
        </button>
        <button className="flex items-center gap-1.5 cursor-pointer">
          <IoChatboxOutline size={17} />
          <span className="text-xs leading-[12px]">댓글</span>
        </button>
      </div>
    </section>
  )
}
