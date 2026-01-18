import ReviewRatingDetail, { ReviewRatingDetailSkeleton } from '@/components/reviews/ReviewRatingDetail'
import { formatDecimal, formatNumber } from '@/lib/number'
import { PlaceReviewStatistics } from '@/types/api/place-detail'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import RatingDistributionChart from './RatingDistributionChart'
import RatingStar from '@/components/ui/RatingStar'

export function ReviewStatisticsSkeleton() {
  return (
    <>
      <div className="flex items-center justify-center gap-[30px] pt-[30px] pb-[21px] border-b border-[#eeeeee] box-border">
        <div className="flex flex-col items-center">
          <div className="flex items-baseline gap-1 mb-[15px]">
            <Skeleton className="w-[60px] h-[32px]" />
            <Skeleton className="w-[8px] h-[16px]" />
            <Skeleton className="w-[12px] h-[16px]" />
          </div>
          <div className="flex items-center gap-0 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Skeleton key={star} className="w-[14px] h-[14px]" />
            ))}
          </div>
          <Skeleton className="w-[80px] h-[10px]" />
        </div>
        <div className="flex items-end justify-center gap-[13px]">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex flex-col items-center gap-[13px]">
              <Skeleton className="w-[5px] h-[50px] rounded-full" />
              <Skeleton className="w-[20px] h-[12px]" />
            </div>
          ))}
        </div>
      </div>
      <div className="px-[15px] pt-[19px] pb-[30px]">
        <ReviewRatingDetailSkeleton />
      </div>
    </>
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
              <RatingStar key={star} starIndex={star} rating={totalRating} />
            ))}
          </div>
          <p className="text-[10px] leading-[10px] text-[#aaaaaa] tracking-[-0.5px]">
            {formatNumber(totalReviewCount)} 개의 리뷰
          </p>
        </div>
        <RatingDistributionChart ratingCounts={ratingCounts} />
      </div>
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
