import ProductItem, { ProductItemSkeleton } from '@/components/products/ProductItem'
import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { ApiResponse } from '@/types/api/api'
import { TodayDiscountProduct } from '@/types/api/product'

export function TodayDiscountProductListSkeleton() {
  return (
    <>
      <div className="mb-10 space-y-0 divide-y divide-[#eeeeee] border-y border-[#eeeeee]">
        {[...Array(4)].map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </div>
    </>
  )
}

export default async function TodayDiscountProductList() {
  // API 호출
  const { data, error } = await api.get<ApiResponse<TodayDiscountProduct[]>>(
    '/api/products/v1/today-discounts',
    {
      params: {
        page: 0,
        size: 4,
      },
    },
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return (
      <div className="w-full text-sm text-[#999999] text-center whitespace-pre-line">
        {COMMON_ERROR_MESSAGES.API_FETCH_ERROR}
      </div>
    )
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data?.success || !data.data) {
    const errorMessage = data?.message || COMMON_ERROR_MESSAGES.FETCH_ERROR('메뉴')
    return (
      <div className="w-full text-sm text-[#999999] text-center whitespace-pre-line">
        {errorMessage}
      </div>
    )
  }

  return (
    <>
      <div className="mb-10 space-y-0 divide-y divide-[#eeeeee] border-y border-[#eeeeee]">
        {data.data.map((product) => (
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
      <div className="flex justify-center">
        <ViewMoreButton href="/products/today-discount" />
      </div>
    </>
  )
}
