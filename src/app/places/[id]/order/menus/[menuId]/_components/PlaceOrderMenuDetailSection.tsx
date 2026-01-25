import ImageGallery from '@/app/places/[id]/_components/ImageGallery'
import Header, { HeaderLeft, HeaderRight } from '@/components/layouts/Header'
import { BackButton, CartButton } from '@/components/layouts/header-parts'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import type { ProductDetailResponse } from '@/domains/product'
import { formatDecimal, formatNumber } from '@/lib/number'
import ProductOptionSelector from './ProductOptionSelector'
import ShareButtonClient from './ShareButtonClient'

interface PlaceOrderMenuDetailSectionProps {
  placeId: number
  product: ProductDetailResponse
}

export default function PlaceOrderMenuDetailSection({
  placeId,
  product,
}: PlaceOrderMenuDetailSectionProps) {
  const basePrice = product.discountPrice ?? product.originalPrice

  return (
    <section>
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderRight>
          <ShareButtonClient placeId={placeId} productId={product.id} productName={product.name} />
          <CartButton placeId={placeId} />
        </HeaderRight>
      </Header>
      <SectionStack>
        <BorderedSection className="border-t-0">
          <ImageGallery imageUrls={product.imageUrls} />
          <div className="px-[15px] py-[21px]">
            <h1 className="text-lg leading-[18px] font-bold">{product.name}</h1>
            <p className="mt-[13px] text-sm leading-relaxed">{product.description}</p>
            <div className="mt-[17px]">
              {product.discountRate == null ? (
                <p className="mt-[13px] text-base leading-[16px]">{formatNumber(basePrice)}원</p>
              ) : (
                <div className="flex items-end leading-[21px]">
                  <p className="text-base leading-[16px]">
                    {formatNumber(product.discountPrice ?? 0)}원
                  </p>
                  <p className="ml-[7px] text-xs leading-[12px] text-[#aaaaaa] line-through">
                    {formatNumber(product.originalPrice)}원
                  </p>
                  <p className="ml-[11px] text-sm leading-[14px] text-main">
                    {formatDecimal(product.discountRate, 0)}%
                  </p>
                </div>
              )}
            </div>
          </div>
        </BorderedSection>
        <ProductOptionSelector
          productId={product.id}
          placeId={placeId}
          placeName={product.placeName}
          productName={product.name}
          imageUrl={product.imageUrls[0] || ''}
          basePrice={basePrice}
          originalPrice={product.originalPrice}
          optionGroups={product.optionGroups}
          reviewCount={product.reviewCount}
        />
      </SectionStack>
      <div className="h-[71px] bg-white" />
    </section>
  )
}
