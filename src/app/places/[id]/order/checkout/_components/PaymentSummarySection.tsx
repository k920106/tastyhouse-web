import { formatNumber } from '@/lib/number'

interface PaymentSummarySectionProps {
  productTotal: number
  shippingDiscount: number
  couponDiscount: number
  pointsUsed: number
  finalTotal: number
}

export default function PaymentSummarySection({
  productTotal,
  shippingDiscount,
  couponDiscount,
  pointsUsed,
  finalTotal,
}: PaymentSummarySectionProps) {
  return (
    <div className="px-[15px] py-5">
      <div className="pb-[30px]">
        <h2 className="text-base leading-[16px]">결제 금액</h2>
      </div>
      <div className="space-y-[15px]">
        <div className="flex justify-between">
          <span className="text-sm leading-[14px]">상품금액</span>
          <span className="text-sm leading-[14px]">{formatNumber(productTotal)}원</span>
        </div>
        <div>
          <div className="flex justify-between">
            <span className="text-sm leading-[14px]">할인금액</span>
            <span className="text-sm leading-[14px]">- {formatNumber(shippingDiscount)}원</span>
          </div>
          <div className="pt-2.5 space-y-2.5">
            <div className="flex justify-between">
              <span className="text-xs leading-[12px] text-[#aaaaaa]">상품 할인</span>
              <span className="text-xs leading-[12px] text-[#aaaaaa]">
                - {formatNumber(shippingDiscount)}원
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs leading-[12px] text-[#aaaaaa]">쿠폰 사용</span>
              <span className="text-xs leading-[12px] text-[#aaaaaa]">
                {formatNumber(couponDiscount)}원
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs leading-[12px] text-[#aaaaaa]">포인트 사용</span>
              <span className="text-xs leading-[12px] text-[#aaaaaa]">
                {pointsUsed > 0 ? '-' : ''}
                {formatNumber(pointsUsed)}원
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-sm leading-[14px]">최종 결제금액</span>
          <span className="text-sm leading-[14px] text-[#a91201]">
            {formatNumber(finalTotal)}원
          </span>
        </div>
      </div>
    </div>
  )
}
