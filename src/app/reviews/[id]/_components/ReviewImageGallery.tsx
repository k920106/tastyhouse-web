'use client'

import 'swiper/css'
import 'swiper/css/pagination'
import styles from './ReviewDetailSection.module.css'

import Image from 'next/image'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface ReviewImageGalleryProps {
  imageUrls: string[]
}

export default function ReviewImageGallery({ imageUrls }: ReviewImageGalleryProps) {
  if (imageUrls.length === 0) return null

  return (
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
        className={`aspect-[345/190] ${styles.reviewSwiper} ${imageUrls.length === 1 ? styles.reviewSwiperSingleImage : ''}`}
      >
        {imageUrls.map((imageUrl: string, index: number) => (
          <SwiperSlide key={index}>
            <div
              className={`relative w-full h-full ${imageUrls.length > 1 ? 'cursor-pointer' : ''}`}
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
  )
}
