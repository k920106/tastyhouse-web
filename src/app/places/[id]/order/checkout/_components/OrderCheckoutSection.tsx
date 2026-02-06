'use client'

import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import AppButton from '@/components/ui/AppButton'
import { toast } from '@/components/ui/AppToaster'
import BorderedSection from '@/components/ui/BorderedSection'
import CircleCheckbox from '@/components/ui/CircleCheckbox'
import SectionStack from '@/components/ui/SectionStack'
import type { MemberContactResponse, MemberCouponListItemResponse } from '@/domains/member'
import type { PaymentMethod } from '@/domains/order'
import { useCartInfo } from '@/hooks/useCartInfo'
import { useTossPayments } from '@/hooks/useTossPayments'
import { PAGE_PATHS } from '@/lib/paths'
import { calculatePaymentSummary } from '@/lib/paymentCalculation'
import { createOrder } from '@/services/order'
import { completeOnSitePayment, createPayment } from '@/services/payment'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CouponSelector from './CouponSelector'
import CustomerInfoSection from './CustomerInfoSection'
import OrderInfoSection from './OrderInfoSection'
import PaymentMethodSelector from './PaymentMethodSelector'
import PaymentSummarySection from './PaymentSummarySection'
import PointSelector from './PointSelector'

interface OrderCheckoutSectionProps {
  placeId: number
  placeName: string
  customerInfo: MemberContactResponse | null
  availableCoupons: MemberCouponListItemResponse[]
  usablePoints: number
}

export default function OrderCheckoutSection({
  placeId,
  placeName,
  customerInfo,
  availableCoupons,
  usablePoints,
}: OrderCheckoutSectionProps) {
  const router = useRouter()

  const { items, firstProductName, totalItemCount, totalProductAmount, totalProductDiscount } =
    useCartInfo()

  const [selectedCoupon, setSelectedCoupon] = useState<MemberCouponListItemResponse | null>(null)
  const [pointInput, setPointInput] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const { tossPayment } = useTossPayments()

  const { totalDiscountAmount, couponDiscount, pointsUsed, paymentAmount } =
    calculatePaymentSummary(totalProductAmount, totalProductDiscount, selectedCoupon, pointInput)

  const handlePayment = async () => {
    if (!agreedToTerms) {
      toast('약관에 동의해주세요.')
      return
    }

    if (!selectedPaymentMethod) {
      toast('결제 수단을 선택해주세요.')
      return
    }

    // 1. 주문 생성 (PENDING)
    const orderResult = await createOrder({
      placeId,
      orderItems: items,
      memberCouponId: selectedCoupon?.id ?? null,
      usePoint: pointsUsed,
      totalProductAmount,
      totalDiscountAmount,
      productDiscountAmount: totalProductDiscount,
      couponDiscountAmount: couponDiscount,
      finalAmount: paymentAmount,
    })

    if (orderResult.error) {
      toast(orderResult.error)
      return
    }

    const orderId = orderResult.data?.data?.id
    if (!orderId) {
      toast('주문 생성에 실패했습니다.')
      return
    }

    // 2. 결제 생성 (PENDING)
    const paymentResult = await createPayment({
      orderId,
      paymentMethod: selectedPaymentMethod,
    })

    if (paymentResult.error) {
      toast(paymentResult.error)
      return
    }

    if (!paymentResult.data?.data) {
      toast(paymentResult.data?.message ?? '결제 생성에 실패했습니다.')
      return
    }

    const paymentId = paymentResult.data.data.id
    if (!paymentId) {
      toast('결제 생성에 실패했습니다.')
      return
    }

    // 3-A. 현장결제 완료 처리 (COMPLETED)
    if (selectedPaymentMethod === 'CASH_ON_SITE' || selectedPaymentMethod === 'CARD_ON_SITE') {
      const completeResult = await completeOnSitePayment(paymentId)

      if (completeResult.error) {
        toast(completeResult.error)
        return
      }

      // 주문 완료 페이지 이동
      router.push(PAGE_PATHS.ORDER_COMPLETE(orderId))
      return
    }

    // 3-B. 신용카드 결제 - PG 결제창 호출
    if (selectedPaymentMethod === 'CREDIT_CARD') {
      if (!tossPayment) {
        toast('결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.')
        return
      }

      const orderName =
        totalItemCount > 1 ? `${firstProductName} 외 ${totalItemCount - 1}건` : firstProductName

      await tossPayment.requestPayment({
        method: 'CARD',
        amount: {
          currency: 'KRW',
          value: paymentAmount,
        },
        orderId: paymentResult.data.data.pgOrderId,
        orderName,
        successUrl: `${window.location.origin}/api/payments/tosspayments/success`,
        failUrl: `${window.location.origin}/api/payments/tosspayments/fail`,
        customerEmail: customerInfo?.email,
        customerName: customerInfo?.fullName,
        customerMobilePhone: customerInfo?.phoneNumber,
        card: {
          useEscrow: false,
          flowMode: 'DEFAULT',
          useCardPoint: false,
          useAppCardOnly: false,
        },
      })
    }
  }

  return (
    <section className="min-h-screen flex flex-col bg-white">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <h1 className="text-[17px] leading-[17px]">결제하기</h1>
        </HeaderCenter>
      </Header>
      <SectionStack>
        <BorderedSection className="border-t-0">
          <OrderInfoSection
            placeName={placeName}
            items={items}
            firstProductName={firstProductName}
            totalItemCount={totalItemCount}
          />
        </BorderedSection>
        <BorderedSection>
          <CustomerInfoSection customerInfo={customerInfo} />
        </BorderedSection>
        <BorderedSection>
          <div className="px-[15px] py-5">
            <div className="pb-[30px]">
              <h2 className="text-base leading-[16px]">쿠폰/적립금 사용</h2>
            </div>
            <div className="space-y-5">
              <CouponSelector
                availableCoupons={availableCoupons}
                totalProductAmount={totalProductAmount}
                selectedCoupon={selectedCoupon}
                onCouponSelect={setSelectedCoupon}
              />
              <PointSelector
                availablePoints={usablePoints}
                pointInput={pointInput}
                onPointInputChange={setPointInput}
              />
            </div>
          </div>
        </BorderedSection>
        <BorderedSection>
          <PaymentSummarySection
            totalProductAmount={totalProductAmount}
            totalProductDiscountAmount={totalProductDiscount}
            totalDiscountAmount={totalDiscountAmount}
            couponDiscount={couponDiscount}
            pointsUsed={pointsUsed}
            finalTotal={paymentAmount}
          />
        </BorderedSection>
        <BorderedSection>
          <PaymentMethodSelector
            selectedPaymentMethod={selectedPaymentMethod}
            onPaymentMethodSelect={setSelectedPaymentMethod}
          />
        </BorderedSection>
        <BorderedSection className="border-b-0">
          <div className="px-[15px] py-5">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <CircleCheckbox
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
              />
              <span className="text-sm leading-[21px]">
                위 주문의 상품 및 결제, 주문 정보 등을 확인하였으며, 이에 동의합니다. (필수)
              </span>
            </label>
          </div>
        </BorderedSection>
      </SectionStack>
      <div className="px-[15px] py-5">
        <AppButton className="!bg-[#a91201]" onClick={handlePayment}>
          결제하기
        </AppButton>
      </div>
    </section>
  )
}
