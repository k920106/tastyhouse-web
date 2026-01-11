import { formatDecimal, formatNumber } from '@/lib/number'
import { PlaceReviewStatistics } from '@/types/api/place-detail'
import { FaStar } from 'react-icons/fa'
import RatingDistributionChart from './RatingDistributionChart'

interface RatingDistributionProps {
  totalRating: number
  totalReviewCount: number
  ratingCounts: Record<string, number>
}

function RatingDistribution({
  totalRating,
  totalReviewCount,
  ratingCounts,
}: RatingDistributionProps) {
  return (
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
  )
}

interface RatingDetailProps {
  averageAtmosphereRating: number
  averageKindnessRating: number
  averageTasteRating: number
  averageAmountRating: number
  averageHygieneRating: number
  averagePriceRating: number
  willRevisitPercentage: number
}

function RatingDetail({
  averageAtmosphereRating,
  averageKindnessRating,
  averageTasteRating,
  averageAmountRating,
  averageHygieneRating,
  averagePriceRating,
  willRevisitPercentage,
}: RatingDetailProps) {
  return (
    <div className="flex flex-row justify-between px-[15px] pt-[19px] pb-[30px]">
      <div className="space-y-2.5">
        <RatingDetailItem label="분위기" rating={averageAtmosphereRating} />
        <RatingDetailItem label="양" rating={averageAmountRating} />
        <RatingDetailItem label="위생" rating={averageHygieneRating} />
        <div className="flex-1 flex items-center">
          <div className="flex items-center w-full">
            <span className="w-20 text-xs leading-[12px] text-[#666666]">재방문의사</span>
            <span className="flex-1 flex items-center text-xs leading-[12px] text-main">
              있어요 ({formatDecimal(willRevisitPercentage, 0)}%)
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-2.5">
        <RatingDetailItem label="친절" rating={averageKindnessRating} />
        <RatingDetailItem label="맛" rating={averageTasteRating} />
        <RatingDetailItem label="가격" rating={averagePriceRating} />
      </div>
    </div>
  )
}

function RatingDetailItem({ label, rating }: { label: string; rating: number }) {
  const fullStars = Math.floor(rating)
  const decimal = rating - fullStars
  const fillPercentage = Math.round(decimal * 100) // 3.1 → 10%, 3.2 → 20%, etc.
  const hasPartialStar = decimal > 0

  return (
    <div className="flex-1 flex items-center">
      <div className="flex items-center w-full">
        <span className="w-20 text-xs leading-[12px] text-[#666666]">{label}</span>
        <div className="flex-1 flex items-center gap-[7px]">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => {
              if (star <= fullStars) {
                // 전체 별
                return (
                  <div key={star} className="relative">
                    <FaStar size={14} fill="#a91201" />
                  </div>
                )
              } else if (star === fullStars + 1 && hasPartialStar) {
                // 부분 별 (10%, 20%, ... 90%)
                const rightPercentage = 100 - fillPercentage
                return (
                  <div key={star} className="relative w-[14px] h-[14px]">
                    <FaStar size={14} fill="#efefef" className="absolute inset-0" />
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ clipPath: `inset(0 ${rightPercentage}% 0 0)` }}
                    >
                      <FaStar size={14} fill="#a91201" />
                    </div>
                  </div>
                )
              } else {
                // 빈 별
                return (
                  <div key={star} className="relative">
                    <FaStar size={14} fill="#efefef" />
                  </div>
                )
              }
            })}
          </div>
          <span className="text-xs leading-[12px] text-main">{formatDecimal(rating, 1)}</span>
        </div>
      </div>
    </div>
  )
}

interface ReviewStatisticsProps {
  statistics: PlaceReviewStatistics
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
    <>
      <RatingDistribution
        totalRating={totalRating}
        totalReviewCount={totalReviewCount}
        ratingCounts={ratingCounts}
      />
      <RatingDetail
        averageAtmosphereRating={averageAtmosphereRating}
        averageKindnessRating={averageKindnessRating}
        averageTasteRating={averageTasteRating}
        averageAmountRating={averageAmountRating}
        averageHygieneRating={averageHygieneRating}
        averagePriceRating={averagePriceRating}
        willRevisitPercentage={willRevisitPercentage}
      />
    </>
  )
}
