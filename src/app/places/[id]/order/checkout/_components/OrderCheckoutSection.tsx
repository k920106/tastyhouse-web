'use client'

import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import AppButton from '@/components/ui/AppButton'
import { toast } from '@/components/ui/AppToaster'
import BorderedSection from '@/components/ui/BorderedSection'
import CircleCheckbox from '@/components/ui/CircleCheckbox'
import SectionStack from '@/components/ui/SectionStack'
import type { MemberContactResponse, MemberCouponListItemResponse } from '@/domains/member'
import { PaymentMethod } from '@/domains/order'
import { useOrderInfo } from '@/hooks/useOrderInfo'
import { calculatePaymentSummary, calculateProductTotal } from '@/lib/paymentCalculation'
import { useState } from 'react'
import CouponSelector from './CouponSelector'
import CustomerInfoSection from './CustomerInfoSection'
import OrderInfoSection from './OrderInfoSection'
import PaymentMethodSelector from './PaymentMethodSelector'
import PaymentSummarySection from './PaymentSummarySection'
import PointSelector from './PointSelector'

interface OrderCheckoutSectionProps {
  customerInfo: MemberContactResponse | null
  availableCoupons: MemberCouponListItemResponse[]
  usablePoints: number
}

export default function OrderCheckoutSection({
  customerInfo,
  availableCoupons,
  usablePoints,
}: OrderCheckoutSectionProps) {
  const orderInfo = useOrderInfo()
  const [selectedCoupon, setSelectedCoupon] = useState<MemberCouponListItemResponse | null>(null)
  const [pointInput, setPointInput] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const productTotal = calculateProductTotal(orderInfo.items)
  const { shippingDiscount, couponDiscount, pointsUsed, finalTotal } = calculatePaymentSummary(
    productTotal,
    orderInfo.totalProductDiscount,
    selectedCoupon,
    pointInput,
  )

  const handlePayment = () => {
    if (!agreedToTerms) {
      toast('약관에 동의해주세요.')
      return
    }
    toast('결제를 진행합니다.')
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
            placeName={orderInfo.placeName}
            items={orderInfo.items}
            firstProductName={orderInfo.firstProductName}
            totalItemCount={orderInfo.totalItemCount}
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
            productTotal={productTotal}
            shippingDiscount={shippingDiscount}
            couponDiscount={couponDiscount}
            pointsUsed={pointsUsed}
            finalTotal={finalTotal}
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
