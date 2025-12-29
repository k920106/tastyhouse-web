'use client'

import 'swiper/css'
import 'swiper/css/pagination'
import 'yet-another-react-lightbox/styles.css'
import styles from './ReviewImageGallery.module.css'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { HiOutlineXMark } from 'react-icons/hi2'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Lightbox, {
  ComponentProps,
  createModule,
  EVENT_ON_KEY_DOWN,
  useController,
  VK_ESCAPE,
} from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/plugins/counter.css'

interface ReviewImageGalleryProps {
  imageUrls: string[]
}

// ESC 키로 Lightbox가 닫히지 않도록 하는 커스텀 모듈
// Reference: https://github.com/igordanchenko/yet-another-react-lightbox/discussions/319
function DisableEscapeKey({ children }: ComponentProps) {
  const { subscribeSensors } = useController()

  useEffect(
    () =>
      subscribeSensors(EVENT_ON_KEY_DOWN, (event) => {
        if (event.key === VK_ESCAPE) {
          event.stopPropagation()
        }
      }),
    [subscribeSensors],
  )

  return <>{children}</>
}

const disableEscapeKeyPlugin = ({ addModule }: { addModule: (module: ReturnType<typeof createModule>) => void }) => {
  addModule(createModule('DisableEscapeKey', DisableEscapeKey))
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
        className={styles.lightbox}
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Counter, disableEscapeKeyPlugin]}
        carousel={{ finite: imageUrls.length === 1 }}
        controller={{ closeOnBackdropClick: false }}
        counter={{
          container: {
            style: {
              top: 'unset',
              bottom: '22%',
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
        toolbar={{
          buttons: [
            <button
              key="custom-close"
              type="button"
              aria-label="닫기"
              onClick={() => setLightboxOpen(false)}
              className={styles.closeButton}
            >
              <HiOutlineXMark size={24} color="white" />
            </button>,
          ],
        }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 1)' },
          slide: { padding: 0 },
        }}
      />
    </div>
  )
}
