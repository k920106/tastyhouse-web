import ReviewAuthorInfo from '@/components/reviews/ReviewAuthorInfo'
import ReviewImageGallery from '@/components/reviews/ReviewImageGallery'
import ReviewRatingDetail from '@/components/reviews/ReviewRatingDetail'
import BorderedSection from '@/components/ui/BorderedSection'
import Rating from '@/components/ui/Rating'
import SectionStack from '@/components/ui/SectionStack'
import TextContent from '@/components/ui/TextContent'
import { formatNumber } from '@/lib/number'
import Image from 'next/image'
import ReviewTagList from '../../_components/ReviewTagList'

interface ProductInfoSectionProps {
  reviewId: number
}

export default function ProductInfoSection({ reviewId }: ProductInfoSectionProps) {
  const imageUrl = '/images/sample/food/food-image1.png'
  const name = '아보카도 햄치즈 샌드위치'
  const originalPrice = 8500
  const memberProfileImageUrl = '/images/sample/food/food-image1.png'
  const memberNickname = '홍길동'
  const totalRating = 4.5
  const createdAt = '2026-01-01'
  const productName = '아보카도 햄치즈 샌드위치'
  const content =
    '아보카도 햄치즈 샌드위치 맛있어요 아보카도 햄치즈 샌드위치 맛있어요 아보카도 햄치즈 샌드위치 맛있어요 아보카도 햄치즈 샌드위치 맛있어요 아보카도 햄치즈 샌드위치 맛있어요 아보카도 햄치즈 샌드위치 맛있어요 아보카도 햄치즈 샌드위치 맛있어요 아보카도 햄치즈 샌드위치 맛있어요 아보카도 햄치즈 샌드위치 맛있어요 아보카도 햄치즈 샌드위치 맛있어요 아보카도 햄치즈 샌드위치 맛있어요 아보카도 햄치즈 샌드위치 맛있어요 아보카도 햄치즈 샌드위치 맛있어요 아보카도 햄치즈 샌드위치 맛있어요 아보카도 햄치즈 샌드위치 맛있어요 아보카도 햄치즈 샌드위치 맛있어요'
  const imageUrls = ['/images/sample/food/food-image1.png', '/images/sample/food/food-image2.png']
  const tagNames = [
    '샌드위치',
    '바나나',
    '사과',
    '햄버거',
    '피자',
    '김밥',
    '라면',
    '커피',
    '케이크',
    '샐러드',
  ]

  return (
    <section>
      <SectionStack className="">
        <BorderedSection className="border-t-0 px-[15px] py-5">
          <div className="flex items-center gap-4">
            <div className="relative w-[75px] h-[75px] flex-shrink-0 overflow-hidden">
              <Image src={imageUrl} alt={name} fill className="object-cover" sizes="160px" />
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <h3 className="mb-[17px] text-base leading-[16px] truncate">{name}</h3>
              <div className="flex justify-between">
                <span className="text-base leading-[16px]">{formatNumber(originalPrice)}원</span>
              </div>
            </div>
          </div>
        </BorderedSection>
        <BorderedSection className="px-[15px] border-b-0">
          <div className="py-5 border-b border-[#eeeeee] box-border">
            <ReviewRatingDetail
              averageAtmosphereRating={0}
              averageKindnessRating={0}
              averageTasteRating={0}
              averageAmountRating={0}
              averageHygieneRating={0}
              averagePriceRating={0}
              willRevisitPercentage={0}
            />
          </div>
          <div className="py-5">
            <div className="flex justify-between">
              <ReviewAuthorInfo
                profileImageUrl={memberProfileImageUrl}
                nickname={memberNickname}
                createdAt={createdAt}
              />
              <Rating as="p" value={totalRating} />
            </div>
            <p className="block mt-[25px] text-sm leading-[14px] text-[#999999]">
              [선택] {productName}
            </p>
            <div className="mt-[15px]">
              <TextContent text={content} />
            </div>
            <div className="mt-5">
              <ReviewImageGallery imageUrls={imageUrls} />
            </div>
            <div className="mt-5">
              <ReviewTagList tagNames={tagNames} />
            </div>
          </div>
        </BorderedSection>
      </SectionStack>
    </section>
  )
}
