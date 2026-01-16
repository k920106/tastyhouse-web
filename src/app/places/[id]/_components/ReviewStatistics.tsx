import ReviewRatingDetail from '@/components/reviews/ReviewRatingDetail'
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
      <div className="px-[15px] pt-[19px] pb-[30px]">
        <ReviewRatingDetail
          averageAtmosphereRating={averageAtmosphereRating}
          averageKindnessRating={averageKindnessRating}
          averageTasteRating={averageTasteRating}
          averageAmountRating={averageAmountRating}
          averageHygieneRating={averageHygieneRating}
          averagePriceRating={averagePriceRating}
          willRevisitPercentage={willRevisitPercentage}
        />
      </div>
    </>
  )
}
