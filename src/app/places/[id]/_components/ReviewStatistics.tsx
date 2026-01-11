import { formatDecimal, formatNumber } from '@/lib/number'
import { PlaceReviewStatistics } from '@/types/api/place-detail'

interface ReviewStatisticsProps {
  statistics: PlaceReviewStatistics
}

// 별 아이콘 SVG 컴포넌트
function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.5 0L15.3064 8.63729L24.3882 8.63729L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729L9.69361 8.63729L12.5 0Z"
        fill={filled ? '#a91201' : '#eeeeee'}
      />
    </svg>
  )
}

// 평점 분포 바 차트 컴포넌트
function RatingDistributionChart({ ratingCounts }: { ratingCounts: Record<string, number> }) {
  const maxCount = Math.max(...Object.values(ratingCounts), 1)
  const maxHeight = 101 // 최대 높이 (px)

  return (
    <div className="flex items-end justify-center gap-[9px] h-[101px]">
      {[5, 4, 3, 2, 1].map((rating) => {
        const count = ratingCounts[String(rating)] || 0
        const height =
          maxCount > 0 ? Math.max((count / maxCount) * maxHeight, count > 0 ? 11 : 0) : 0

        return (
          <div key={rating} className="flex flex-col items-center gap-1">
            <div
              className="w-[9px] rounded-[3.5px] border-2"
              style={{
                height: `${height}px`,
                backgroundColor: count > 0 ? '#a91201' : '#eeeeee',
                borderColor: count > 0 ? '#a91201' : '#eeeeee',
                minHeight: count > 0 ? '11px' : '0px',
              }}
            />
            <span
              className={`text-[24px] leading-[60px] ${
                rating === 5 ? 'text-[#a91201]' : 'text-[#aaaaaa]'
              }`}
            >
              {rating}점
            </span>
          </div>
        )
      })}
    </div>
  )
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
            <StarIcon key={star} filled={star <= fullStars} />
          ))}
        </div>
      </div>
      <span className="text-[24px] leading-[60px] text-[#a91201]">{formatDecimal(rating, 1)}</span>
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
    <div className="flex flex-col bg-white">
      {/* 전체 평점 및 리뷰 개수 */}
      <div className="flex flex-col items-center py-8 border-b border-[#eeeeee]">
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-[64px] leading-[20px] text-[#333333] tracking-[-3.2px]">
            {formatDecimal(totalRating, 1)}
          </span>
          <span className="text-[32px] leading-[20px] text-[#999999] tracking-[-1.6px]">/ 5</span>
        </div>
        <p className="text-[20px] leading-[60px] text-[#aaaaaa] tracking-[-0.5px]">
          {formatNumber(totalReviewCount)} 개의 리뷰
        </p>
      </div>

      {/* 평점 분포 차트 */}
      <div className="py-8 border-b border-[#eeeeee]">
        <RatingDistributionChart ratingCounts={ratingCounts} />
      </div>

      {/* 세부 평점 항목들 */}
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

      {/* 재방문의사 */}
      <div className="py-6 px-[30px]">
        <div className="flex items-center justify-between">
          <span className="text-[24px] leading-[60px] text-[#666666]">재방문의사</span>
          <span className="text-[24px] leading-[60px] text-[#a91201]">
            있어요 ({formatDecimal(willRevisitPercentage, 0)}%)
          </span>
        </div>
      </div>
    </div>
  )
}
