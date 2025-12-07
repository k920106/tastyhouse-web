'use client'

import { BestReview } from '@/types/api/review'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface BestReviewSectionProps {
  reviews: BestReview[]
}

export default function BestReviewSection({ reviews }: BestReviewSectionProps) {
  const swiperRef = useRef<SwiperType | null>(null)
  const [currentSlide, setCurrentSlide] = useState(1)
  const [totalSlides, setTotalSlides] = useState(reviews.length)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (reviews.length === 0) {
    return null
  }

  return (
    <section className="w-full bg-white pt-[50px] pb-[60px]">
      <div className="mx-auto max-w-[1200px] px-4">
        <header className="mb-[30px] text-center">
          <h2 className="mb-[15px] text-[23px] text-gray-900">베스트 리뷰</h2>
          <p className="text-sm text-[#aaaaaa]">테하인들의 마음을 사로잡은 리뷰를 소개합니다.</p>
        </header>
        <div className="relative">
          {!isMounted ? (
            <div className="overflow-hidden pb-[53px]">
              <div
                className="flex gap-4"
                style={{
                  transform: 'translateX(calc(50% - (100% / 1.5 / 2) - 8px))',
                }}
              >
                <div
                  className="flex-shrink-0 animate-pulse transition-all duration-300 scale-90 opacity-60"
                  style={{ width: 'calc(100% / 1.5)' }}
                >
                  <div className="relative mb-[15px] w-full bg-gray-200 pt-[75%]" />
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="h-3 w-12 bg-gray-200 rounded" />
                    <div className="h-5 w-8 bg-gray-200 rounded" />
                  </div>
                  <div className="mb-[19px] h-4 w-2/3 bg-gray-200 rounded" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-full bg-gray-200 rounded" />
                    <div className="h-3 w-full bg-gray-200 rounded" />
                    <div className="h-3 w-4/5 bg-gray-200 rounded" />
                  </div>
                </div>
                <div
                  className="flex-shrink-0 animate-pulse transition-all duration-300"
                  style={{ width: 'calc(100% / 1.5)' }}
                >
                  <div className="relative mb-[15px] w-full bg-gray-200 pt-[75%]" />
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="h-3 w-16 bg-gray-200 rounded" />
                    <div className="h-6 w-10 bg-gray-200 rounded" />
                  </div>
                  <div className="mb-[19px] h-4 w-3/4 bg-gray-200 rounded" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-full bg-gray-200 rounded" />
                    <div className="h-3 w-full bg-gray-200 rounded" />
                    <div className="h-3 w-11/12 bg-gray-200 rounded" />
                    <div className="h-3 w-3/4 bg-gray-200 rounded" />
                  </div>
                </div>
                <div
                  className="flex-shrink-0 animate-pulse transition-all duration-300 scale-90 opacity-60"
                  style={{ width: 'calc(100% / 1.5)' }}
                >
                  <div className="relative mb-[15px] w-full bg-gray-200 pt-[75%]" />
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="h-3 w-12 bg-gray-200 rounded" />
                    <div className="h-5 w-8 bg-gray-200 rounded" />
                  </div>
                  <div className="mb-[19px] h-4 w-2/3 bg-gray-200 rounded" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-full bg-gray-200 rounded" />
                    <div className="h-3 w-full bg-gray-200 rounded" />
                    <div className="h-3 w-4/5 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={1.5}
              centeredSlides={true}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
                setTotalSlides(swiper.slides.length)
              }}
              onSlideChange={(swiper) => {
                setCurrentSlide(swiper.realIndex + 1)
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 2.5,
                  spaceBetween: 24,
                },
              }}
              className="!pb-[53px]"
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={review.id} className="transition-all duration-300">
                  {({ isActive }) => (
                    <Link
                      href={`/reviews/${review.id}`}
                      className={`block h-full overflow-hidden transition-all duration-300 ${
                        isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-60'
                      }`}
                    >
                      <div className="relative mb-[15px] w-full bg-gray-100 pt-[75%]">
                        <Image
                          src={review.image}
                          alt={review.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 40vw, 33vw"
                          className="object-cover"
                          loading={index < 3 ? 'eager' : 'lazy'}
                        />
                      </div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-xs text-[#999999]">{review.stationName}</span>
                        <span className="text-[19px] text-main">
                          {review.totalRating.toFixed(1)}
                        </span>
                      </div>
                      <h3 className="mb-[19px] text-base text-gray-900 truncate">{review.title}</h3>
                      <p className="text-xs text-[#666666] line-clamp-4 leading-relaxed">
                        {review.content}
                      </p>
                    </Link>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          {isMounted && (
            <div className="relative flex items-center justify-center pt-4">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute left-1/2 -translate-x-[100px] rounded-full p-2 transition-all hover:bg-gray-100"
                aria-label="이전 슬라이드"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 text-sm text-gray-600">
                {currentSlide} / {totalSlides}
              </div>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute left-1/2 translate-x-[70px] rounded-full p-2 transition-all hover:bg-gray-100"
                aria-label="다음 슬라이드"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
