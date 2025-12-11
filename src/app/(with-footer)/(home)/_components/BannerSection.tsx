'use client'

import { Banner } from '@/types/api/banner'
import Image from 'next/image'
import Link from 'next/link'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import styles from './BannerSection.module.css'

interface BannerSectionProps {
  banners: Banner[]
}

export default function BannerSection({ banners }: BannerSectionProps) {
  if (banners.length === 0) {
    return null
  }

  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          type: 'fraction',
          formatFractionCurrent: (number) => number,
          formatFractionTotal: (number) => number,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className={`w-full h-[600px] ${styles.bannerSwiper}`}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id}>
            {banner.linkUrl ? (
              <Link
                href={banner.linkUrl}
                rel="noopener noreferrer"
                className="relative block w-full h-full"
              >
                <Image
                  src={banner.imageUrl}
                  alt={banner.title}
                  fill
                  sizes="(max-width: 500px) 100vw, 500px"
                  className="object-cover"
                  priority={index === 0}
                />
              </Link>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={banner.imageUrl}
                  alt={banner.title}
                  fill
                  sizes="(max-width: 500px) 100vw, 500px"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
