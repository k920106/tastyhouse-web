import ProductListItem from '@/components/products/ProductListItem'
import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { TodayDiscountProduct } from '@/types/api/product'

interface TodayDiscountSectionProps {
  products: TodayDiscountProduct[]
}

export default function TodayDiscountSection({ products }: TodayDiscountSectionProps) {
  return (
    <section className="w-full bg-white pt-[60px]">
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
          {products.map((product) => (
            <ProductListItem
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
        <div className="flex justify-center">
          <ViewMoreButton href="/product/today-discount" />
        </div>
      </div>
    </section>
  )
}
