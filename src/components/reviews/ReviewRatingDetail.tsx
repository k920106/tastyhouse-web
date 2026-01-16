import { formatDecimal } from '@/lib/number'
import { FaStar } from 'react-icons/fa'

function ReviewRatingDetailItem({ label, rating }: { label: string; rating: number }) {
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

interface ReviewRatingDetailProps {
  averageAtmosphereRating: number
  averageKindnessRating: number
  averageTasteRating: number
  averageAmountRating: number
  averageHygieneRating: number
  averagePriceRating: number
  willRevisitPercentage: number
}

export default function ReviewRatingDetail({
  averageAtmosphereRating,
  averageKindnessRating,
  averageTasteRating,
  averageAmountRating,
  averageHygieneRating,
  averagePriceRating,
  willRevisitPercentage,
}: ReviewRatingDetailProps) {
  return (
    <div className="flex flex-row justify-between">
      <div className="space-y-2.5">
        <ReviewRatingDetailItem label="분위기" rating={averageAtmosphereRating} />
        <ReviewRatingDetailItem label="양" rating={averageAmountRating} />
        <ReviewRatingDetailItem label="위생" rating={averageHygieneRating} />
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
        <ReviewRatingDetailItem label="친절" rating={averageKindnessRating} />
        <ReviewRatingDetailItem label="맛" rating={averageTasteRating} />
        <ReviewRatingDetailItem label="가격" rating={averagePriceRating} />
      </div>
    </div>
  )
}
