import type { MemberCouponListItemResponse } from '@/domains/member'

export interface PaymentSummary {
  shippingDiscount: number
  couponDiscount: number
  pointsUsed: number
  finalTotal: number
}

/**
 * 결제 금액을 계산합니다.
 *
 * @param productTotal - 상품 총액
 * @param selectedCoupon - 선택된 쿠폰 (선택 사항)
 * @param pointInput - 사용할 포인트 입력값
 * @returns 배송 할인, 쿠폰 할인, 사용 포인트, 최종 결제 금액을 포함한 객체
 */
export function calculatePaymentSummary(
  productTotal: number,
  selectedCoupon: MemberCouponListItemResponse | null,
  pointInput: string,
): PaymentSummary {
  const shippingDiscount = 1000

  const couponDiscount = selectedCoupon
    ? selectedCoupon.discountType === 'AMOUNT'
      ? selectedCoupon.discountAmount
      : Math.min(
          Math.floor((productTotal * selectedCoupon.discountAmount) / 100),
          selectedCoupon.maxDiscountAmount || Infinity,
        )
    : 0

  const pointsUsed = parseInt(pointInput) || 0
  const finalTotal = productTotal - shippingDiscount - couponDiscount - pointsUsed

  return {
    shippingDiscount,
    couponDiscount,
    pointsUsed,
    finalTotal,
  }
}
