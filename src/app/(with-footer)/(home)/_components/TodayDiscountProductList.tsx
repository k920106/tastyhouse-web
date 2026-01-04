import ProductItem, { ProductItemSkeleton } from '@/components/products/ProductItem'
import ErrorMessage from '@/components/ui/ErrorMessage'
import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { TodayDiscountProduct, TodayDiscountProductQuery } from '@/types/api/product'

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
  const query = {
    params: {
      page: 0,
      size: 4,
    } satisfies TodayDiscountProductQuery,
  }
  const { data, error } = await api.get<ApiResponse<TodayDiscountProduct[]>>(
    API_ENDPOINTS.PRODUCTS_TODAY_DISCOUNTS,
    query,
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data.success || !data.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('메뉴')} />
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
