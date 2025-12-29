'use client'

import 'swiper/css'
import 'swiper/css/pagination'
import 'yet-another-react-lightbox/styles.css'
import styles from './ReviewImageGallery.module.css'

import Image from 'next/image'
import { useState } from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Lightbox from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/plugins/counter.css'

interface ReviewImageGalleryProps {
  imageUrls: string[]
}

export default function ReviewImageGallery({ imageUrls }: ReviewImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  if (imageUrls.length === 0) return null

  const slides = imageUrls.map((url) => ({ src: url }))

  const handleImageClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

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
              className="relative w-full h-full cursor-pointer"
              onClick={() => handleImageClick(index)}
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

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Counter]}
        carousel={{ finite: imageUrls.length === 1, padding: 0 }}
        controller={{ closeOnBackdropClick: true }}
        counter={{
          container: {
            style: {
              top: 'unset',
              bottom: '10%',
              left: '50%',
              right: 'auto',
              transform: 'translateX(-50%)',
              padding: '6.5px 15.5px',
              backgroundColor: '#000000',
              fontSize: '12px',
              lineHeight: '12px',
              letterSpacing: '-1px',
              color: '#ffffff',
              borderRadius: '12px',
              opacity: 0.5,
            },
          },
        }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
          buttonClose: () => (
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                zIndex: 10,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          ),
        }}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 1)' },
          slide: { padding: 0 },
        }}
      />
    </div>
  )
}
