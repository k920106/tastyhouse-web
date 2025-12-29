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
  EVENT_ON_KEY_DOWN,
  VK_ESCAPE,
  createModule,
  useController,
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

const disableEscapeKeyPlugin = ({
  addModule,
}: {
  addModule: (module: ReturnType<typeof createModule>) => void
}) => {
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
        modules={[Pagination]} // 사용할 Swiper 모듈 (페이지네이션)
        spaceBetween={0} // 슬라이드 사이 간격 (px)
        slidesPerView={1} // 한 번에 보여줄 슬라이드 개수
        pagination={{
          type: 'fraction', // 페이지네이션 타입 (1/3 형태로 표시)
          formatFractionCurrent: (number) => number, // 현재 페이지 번호 포맷
          formatFractionTotal: (number) => number, // 전체 페이지 번호 포맷
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
        className={styles.lightbox} // 커스텀 CSS 클래스 적용
        open={lightboxOpen} // Lightbox 열림/닫힘 상태
        close={() => setLightboxOpen(false)} // 닫기 버튼 클릭 시 호출되는 함수
        index={lightboxIndex} // 현재 표시할 이미지 인덱스
        slides={slides} // 표시할 이미지 배열 ({ src: url } 형태)
        plugins={[Counter, disableEscapeKeyPlugin]} // 사용할 플러그인 (카운터, ESC키 비활성화)
        carousel={{ finite: imageUrls.length === 1 }} // 이미지가 1개면 무한 슬라이드 비활성화
        controller={{
          closeOnBackdropClick: false, // 배경 클릭 시 닫기 비활성화
          closeOnPullDown: true, // 아래로 당기면 닫기 활성화
        }}
        counter={{
          container: {
            style: {
              top: 'unset', // 상단 위치 초기화
              bottom: '22%', // 하단에서 22% 위치
              left: '50%', // 좌측에서 50% 위치
              right: 'auto', // 우측 자동
              transform: 'translateX(-50%)', // 가로 중앙 정렬
              padding: '6.5px 15.5px', // 내부 여백
              backgroundColor: '#000000', // 배경색 검정
              fontSize: '12px', // 글자 크기
              lineHeight: '12px', // 줄 높이
              letterSpacing: '-1px', // 글자 간격
              color: '#ffffff', // 글자색 흰색
              borderRadius: '12px', // 모서리 둥글기
              opacity: 0.5, // 투명도 50%
            },
          },
        }}
        toolbar={{
          buttons: [
            // 커스텀 닫기 버튼
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
          buttonPrev: () => null, // 이전 버튼 숨기기
          buttonNext: () => null, // 다음 버튼 숨기기
        }}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 1)' }, // 컨테이너 배경색 완전 불투명 검정
          slide: { padding: 0 }, // 슬라이드 패딩 제거
        }}
      />
    </div>
  )
}
