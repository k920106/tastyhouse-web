import { formatDecimal, formatNumber } from '@/lib/number'
import { PlaceReviewStatistics } from '@/types/api/place-detail'
import { FaStar } from 'react-icons/fa'
import RatingDistributionChart from './RatingDistributionChart'

interface ReviewStatisticsProps {
  statistics: PlaceReviewStatistics
}

// 세부 평점 항목 컴포넌트
function DetailRatingItem({ label, rating }: { label: string; rating: number }) {
  const fullStars = Math.floor(rating)

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <span className="text-[24px] leading-[60px] text-[#666666]">{label}</span>
        <div className="flex items-center gap-0">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star}>
              <FaStar size={14} fill={star <= fullStars ? '#a91201' : '#efefef'} />
            </div>
          ))}
        </div>
      </div>
      <span className="text-[24px] leading-[60px] text-main">{formatDecimal(rating, 1)}</span>
    </div>
  )
}

export default function ReviewStatistics({ statistics }: ReviewStatisticsProps) {
  const {
    totalRating,
    totalReviewCount,
    averageTasteRating,
    averageAmountRating,
    averagePriceRating,
    averageAtmosphereRating,
    averageKindnessRating,
    averageHygieneRating,
    willRevisitPercentage,
    ratingCounts,
  } = statistics

  return (
    <div className="flex flex-col px-[15px]">
      <div className="flex items-center justify-center gap-[30px] pt-[30px] pb-[21px] border-b border-[#eeeeee] box-border">
        <div className="flex flex-col items-center">
          <div className="flex items-baseline gap-1 mb-[15px]">
            <span className="text-[32px] leading-[32px] tracking-[-1.6px]">
              {formatDecimal(totalRating, 1)}
            </span>
            <span className="text-base leading-[16px] text-[#999999] tracking-[-1.6px]">/</span>
            <span className="text-base leading-[16px] text-[#999999] tracking-[-1.6px]">5</span>
          </div>
          <div className="flex items-center gap-0 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={14}
                fill={star <= Math.floor(totalRating) ? '#a91201' : '#efefef'}
              />
            ))}
          </div>
          <p className="text-[10px] leading-[10px] text-[#aaaaaa] tracking-[-0.5px]">
            {formatNumber(totalReviewCount)} 개의 리뷰
          </p>
        </div>
        <RatingDistributionChart ratingCounts={ratingCounts} />
      </div>
      <div className="py-6 px-[30px] border-b border-[#eeeeee]">
        <div className="flex flex-col gap-0">
          <DetailRatingItem label="분위기" rating={averageAtmosphereRating} />
          <DetailRatingItem label="친절" rating={averageKindnessRating} />
          <DetailRatingItem label="맛" rating={averageTasteRating} />
          <DetailRatingItem label="양" rating={averageAmountRating} />
          <DetailRatingItem label="위생" rating={averageHygieneRating} />
          <DetailRatingItem label="가격" rating={averagePriceRating} />
        </div>
      </div>
      <div className="py-6 px-[30px]">
        <div className="flex items-center justify-between">
          <span className="text-[24px] leading-[60px] text-[#666666]">재방문의사</span>
          <span className="text-[24px] leading-[60px] text-main">
            있어요 ({formatDecimal(willRevisitPercentage, 0)}%)
          </span>
        </div>
      </div>
    </div>
  )
}
