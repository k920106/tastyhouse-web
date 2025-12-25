'use client'

import ProductItem from '@/components/products/ProductItem'
import { ChoicePlace } from '@/types/api/place'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

interface ChoiceSectionProps {
  choices: ChoicePlace[]
}

export default function ChoiceSection({ choices: places }: ChoiceSectionProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section className="w-full bg-white pt-[60px]">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-[30px] text-center">
          <h2 className="mb-[15px] text-[23px] text-gray-900 font-[family-name:var(--font-nanum-myeongjo-bold)] font-bold">
            테하 초이스
          </h2>
          <p className="text-sm text-[#aaaaaa]">요즘 주목받고 있는 플레이스를 소개합니다.</p>
        </header>
      </div>
      <div className="mx-auto max-w-[1200px] px-4">
        {isMounted ? (
          <Swiper spaceBetween={32} slidesPerView={1.15} className="pb-12">
            {places.map((place) => (
              <SwiperSlide key={place.id}>
                <Link href={`/places/${place.id}`}>
                  <div className="relative w-full aspect-[2/3] overflow-hidden">
                    <Image
                      src={place.imageUrl}
                      alt={place.name}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="text-[17px] font-medium mb-3">{place.title}</h3>
                      <p className="text-xs opacity-90 leading-relaxed">{place.content}</p>
                    </div>
                  </div>
                </Link>
                <div className="mb-10 space-y-0 divide-y divide-[#eeeeee] border-b border-[#eeeeee]">
                  {place.products?.map((product) => (
                    <ProductItem
                      key={product.id}
                      id={product.id}
                      placeName={product.placeName}
                      name={product.name}
                      imageUrl={product.imageUrl}
                      originalPrice={product.originalPrice}
                      discountPrice={product.discountPrice}
                      discountRate={product.discountRate}
                    />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="pb-12" style={{ minHeight: '600px' }} />
        )}
      </div>
    </section>
  )
}
