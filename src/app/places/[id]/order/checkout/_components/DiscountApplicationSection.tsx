import type { MemberCouponListItemResponse } from '@/domains/member'
import CouponSelector from './CouponSelector'
import PointSelector from './PointSelector'

interface DiscountApplicationSectionProps {
  availableCoupons: MemberCouponListItemResponse[]
  totalProductAmount: number
  selectedCoupon: MemberCouponListItemResponse | null
  onCouponSelect: (coupon: MemberCouponListItemResponse | null) => void
  availablePoints: number
  pointInput: string
  onPointInputChange: (value: string) => void
}

export default function DiscountApplicationSection({
  availableCoupons,
  totalProductAmount,
  selectedCoupon,
  onCouponSelect,
  availablePoints,
  pointInput,
  onPointInputChange,
}: DiscountApplicationSectionProps) {
  return (
    <div className="px-[15px] py-5">
      <div className="pb-[30px]">
        <h2 className="text-base leading-[16px]">쿠폰/적립금 사용</h2>
      </div>
      <div className="space-y-5">
        <CouponSelector
          availableCoupons={availableCoupons}
          totalProductAmount={totalProductAmount}
          selectedCoupon={selectedCoupon}
          onCouponSelect={onCouponSelect}
        />
        <PointSelector
          availablePoints={availablePoints}
          pointInput={pointInput}
          onPointInputChange={onPointInputChange}
        />
      </div>
    </div>
  )
}
