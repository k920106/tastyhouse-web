'use client'

import { formatDecimal } from '@/lib/number'
import { ChoicePlace } from '@/types/api/product'
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

export default function ChoiceSection({ choices }: ChoiceSectionProps) {
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
            {choices.map((choice) => (
              <SwiperSlide key={choice.id}>
                <div className="relative w-full aspect-[2/3] overflow-hidden">
                  <Image
                    src={choice.imageUrl}
                    alt={choice.placeName}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-[17px] font-medium mb-3">{choice.title}</h3>
                    <p className="text-xs opacity-90 leading-relaxed">{choice.content}</p>
                  </div>
                </div>
                <div className="mb-10 space-y-0 divide-y divide-[#eeeeee] border-b border-[#eeeeee]">
                  {choice.products?.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="flex items-center gap-4 py-[15px]"
                    >
                      <div className="relative w-[75px] h-[75px] flex-shrink-0 overflow-hidden">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="160px"
                        />
                      </div>
                      <div className="flex-1 min-w-0 h-[75px] flex flex-col">
                        <p className="text-xs mb-1.5">{product.placeName}</p>
                        <h3 className="text-base font-medium mb-auto truncate">{product.name}</h3>
                        <div className="flex justify-between mt-auto">
                          {product.discountRate == null ? (
                            <div className="flex items-end gap-2">
                              <span className="text-base">
                                {product.originalPrice.toLocaleString()}원
                              </span>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-end gap-2">
                                <span className="text-base">
                                  {product.discountPrice?.toLocaleString()}원
                                </span>
                                <span className="pb-0.5 text-xs text-[#aaaaaa] line-through">
                                  {product.originalPrice.toLocaleString()}원
                                </span>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <span className="text-base text-main">
                                  {formatDecimal(product.discountRate, 0)}%
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
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
