import { formatDecimal } from '@/lib/number'
import { TodayDiscountProduct } from '@/types/api/product'
import Image from 'next/image'
import Link from 'next/link'

interface TodayDiscountSectionProps {
  discounts: TodayDiscountProduct[]
}

export default function TodayDiscountSection({ discounts }: TodayDiscountSectionProps) {
  return (
    <section className="w-full bg-white pt-[60px] pb-[60px]">
      <div className="mx-auto max-w-[1200px] px-4">
        <header className="mb-[30px] text-center">
          <h2 className="mb-[15px] text-[23px] text-gray-900 font-[family-name:var(--font-nanum-myeongjo-bold)] font-bold">
            오늘의 할인
          </h2>
          <p className="text-sm text-[#aaaaaa]">
            테하 고객만이 누릴 수 있는 할인 혜택을 놓치지 마세요.
          </p>
        </header>
        <div className="mb-10 space-y-0 divide-y divide-[#eeeeee] border-y border-[#eeeeee]">
          {discounts.map((discount) => (
            <div
              key={discount.id}
              className="flex items-center gap-4 py-[15px] cursor-pointer transition-colors"
            >
              <div className="relative w-[75px] h-[75px] flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={discount.imageUrl}
                  alt={discount.productName}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              <div className="flex-1 min-w-0 h-[75px] flex flex-col">
                <p className="text-xs mb-1.5">{discount.placeName}</p>
                <h3 className="text-base font-medium mb-auto truncate">{discount.productName}</h3>
                <div className="flex justify-between mt-auto">
                  <div className="flex items-end gap-2">
                    <span className="text-base">{discount.discountPrice.toLocaleString()}원</span>
                    <span className="pb-0.5 text-xs text-[#aaaaaa] line-through">
                      {discount.originalPrice.toLocaleString()}원
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-base text-main">
                      {formatDecimal(discount.discountRate, 0)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            href="/product/today"
            className="inline-block w-3/5 py-3 text-sm text-center bg-white border border-[#eeeeee] transition-colors"
          >
            더보러가기
          </Link>
        </div>
      </div>
    </section>
  )
}
