import type { MemberCouponListItemResponse } from '@/domains/member'
import { OrderItem } from '@/types/api/order'

export interface PaymentSummary {
  totalDiscountAmount: number
  couponDiscount: number
  pointsUsed: number
  paymentAmount: number
}

/**
 * 상품 총액을 계산합니다.
 *
 * @param items - 가격과 수량 정보를 포함한 상품 목록
 * @returns 계산된 상품 총액
 */
export function calculateTotalProductAmount(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

/**
 * 상품 할인 총액을 계산합니다.
 *
 * @param items - 할인 금액과 수량 정보를 포함한 상품 목록
 * @returns 계산된 상품 할인 총액
 */
export function calculateTotalProductDiscount(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.discountPrice * item.quantity, 0)
}

/**
 * 결제 금액을 계산합니다.
 *
 * @param productTotal - 상품 총액
 * @param productDiscount - 상품 할인 총액
 * @param selectedCoupon - 선택된 쿠폰 (선택 사항)
 * @param pointInput - 사용할 포인트 입력값
 * @returns 상품 할인, 배송 할인, 쿠폰 할인, 사용 포인트, 최종 결제 금액을 포함한 객체
 */
export function calculatePaymentSummary(
  productTotal: number,
  productDiscount: number,
  selectedCoupon: MemberCouponListItemResponse | null,
  pointInput: string,
): PaymentSummary {
  const couponDiscount = selectedCoupon
    ? selectedCoupon.discountType === 'AMOUNT'
      ? selectedCoupon.discountAmount
      : Math.min(
          Math.floor((productTotal * selectedCoupon.discountAmount) / 100),
          selectedCoupon.maxDiscountAmount || Infinity,
        )
    : 0

  const pointsUsed = parseInt(pointInput) || 0
  const totalDiscount = productDiscount + couponDiscount + pointsUsed
  const finalTotal = productTotal - totalDiscount

  return {
    totalDiscountAmount: totalDiscount,
    couponDiscount,
    pointsUsed,
    paymentAmount: finalTotal,
  }
}
