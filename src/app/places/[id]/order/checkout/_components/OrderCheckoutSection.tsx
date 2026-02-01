'use client'

import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import AppButton from '@/components/ui/AppButton'
import AppInputAmount from '@/components/ui/AppInputAmount'
import { toast } from '@/components/ui/AppToaster'
import BorderedSection from '@/components/ui/BorderedSection'
import CircleCheckbox from '@/components/ui/CircleCheckbox'
import ImageContainer from '@/components/ui/ImageContainer'
import SectionStack from '@/components/ui/SectionStack'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/shadcn/accordion'
import type { MemberContactResponse, MemberCouponListItemResponse } from '@/domains/member'
import { PaymentMethod } from '@/domains/order'
import type { ProductDetailResponse } from '@/domains/product'
import { getCartData, getCartProductTypeCount } from '@/lib/cart'
import { formatNumber } from '@/lib/number'
import { getMemberAvailableCoupons, getMemberContact } from '@/services/member'
import { getProductById } from '@/services/product'
import { useCallback, useEffect, useState } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import CouponSelector from './CouponSelector'

interface OrderItem {
  name: string
  imageUrl: string
  price: number
  quantity: number
}

interface OrderInfo {
  placeName: string
  items: OrderItem[]
  firstProductName: string
  totalItemCount: number
}

export default function OrderCheckoutSection() {
  const [pointInput, setPointInput] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    placeName: '',
    items: [],
    firstProductName: '',
    totalItemCount: 0,
  })
  const [customerInfo, setCustomerInfo] = useState<MemberContactResponse | null>(null)
  const [availableCoupons, setAvailableCoupons] = useState<MemberCouponListItemResponse[]>([])
  const [selectedCoupon, setSelectedCoupon] = useState<MemberCouponListItemResponse | null>(null)

  const fetchOrderData = useCallback(async () => {
    const cart = getCartData()
    if (!cart || cart.products.length === 0) return

    const [contactResult, couponsResult, ...productResults] = await Promise.all([
      getMemberContact(),
      getMemberAvailableCoupons(),
      ...[...new Set(cart.products.map((p) => p.productId))].map((productId) =>
        getProductById(productId),
      ),
    ])

    if (contactResult.data?.data) {
      setCustomerInfo(contactResult.data.data)
    }

    if (couponsResult.data?.data) {
      setAvailableCoupons(couponsResult.data.data)
    }

    const uniqueProductIds = [...new Set(cart.products.map((p) => p.productId))]
    const productDetails = new Map<number, ProductDetailResponse>()

    productResults.forEach((result, index) => {
      if (result.data?.data) {
        productDetails.set(uniqueProductIds[index], result.data.data)
      }
    })

    const firstDetail = productDetails.values().next().value

    const items: OrderItem[] = cart.products
      .map((cartProduct) => {
        const detail = productDetails.get(cartProduct.productId)
        if (!detail) return null

        const basePrice = detail.discountPrice ?? detail.originalPrice
        const optionAdditionalPrice = cartProduct.selectedOptions.reduce((sum, so) => {
          const group = detail.optionGroups.find((g) => g.id === so.groupId)
          const option = group?.options.find((o) => o.id === so.optionId)
          return sum + (option?.additionalPrice ?? 0)
        }, 0)

        return {
          name: detail.name,
          imageUrl: detail.imageUrls[0] ?? '',
          price: basePrice + optionAdditionalPrice,
          quantity: cartProduct.quantity,
        }
      })
      .filter((item): item is OrderItem => item !== null)

    setOrderInfo({
      placeName: firstDetail?.placeName ?? '',
      items,
      firstProductName: items[0]?.name ?? '',
      totalItemCount: getCartProductTypeCount(),
    })
  }, [])

  useEffect(() => {
    fetchOrderData()
  }, [fetchOrderData])

  // 계산
  const productTotal = orderInfo.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
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
  const availablePoints = 5000
  const finalTotal = productTotal - shippingDiscount - couponDiscount - pointsUsed

  const paymentMethods = [
    { type: 'CASH', label: '현장에서 현금 결제', badge: '혜택' },
    { type: 'CARD', label: '현장에서 카드 결제', badge: '혜택' },
    { type: 'CREDIT', label: '신용카드', badge: '' },
    { type: 'PHONE', label: '휴대폰 결제', badge: '' },
  ]

  const handleApplyAllPoints = () => {
    setPointInput(availablePoints.toString())
  }

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
          <Accordion type="single" collapsible defaultValue="order-info">
            <AccordionItem value="order-info" className="border-b-0">
              <AccordionTrigger className="items-center px-[15px] py-5 hover:no-underline">
                <div className="flex-1 flex items-center justify-between gap-2">
                  <h2 className="text-base leading-[16px]">{orderInfo.placeName}</h2>
                  <span className="text-xs leading-[12px] text-[#aaaaaa]">
                    {orderInfo.firstProductName}
                    {orderInfo.totalItemCount > 1
                      ? ` 외 ${orderInfo.totalItemCount - 1}건`
                      : ' 1건'}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="px-4">
                  <div className="divide-y divide-[#eeeeee] first:border-t border-[#eeeeee]">
                    {orderInfo.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-[15px] py-[15px]">
                        <ImageContainer src={item.imageUrl} alt={item.name} size={50} />
                        <div className="flex flex-col gap-2.5">
                          <h3 className="text-sm leading-[14px]">{item.name}</h3>
                          <p className="text-sm leading-[14px]">
                            {formatNumber(item.price)}원 | {item.quantity}개
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </BorderedSection>
        <BorderedSection>
          <Accordion type="single" collapsible defaultValue="customer-info">
            <AccordionItem value="customer-info" className="border-b-0">
              <AccordionTrigger className="items-center px-[15px] py-5 hover:no-underline">
                <h2 className="text-base leading-[16px]">주문자 정보</h2>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="px-[15px] py-2.5 pb-5">
                  <div className="space-y-[15px]">
                    <div className="flex">
                      <span className="w-30 text-sm leading-[14px] text-[#666666]">
                        주문하는 분
                      </span>
                      <span className="text-sm leading-[14px]">{customerInfo?.fullName}</span>
                    </div>
                    <div className="flex">
                      <span className="w-30 text-sm leading-[14px] text-[#666666]">휴대폰</span>
                      <span className="text-sm leading-[14px]">{customerInfo?.phoneNumber}</span>
                    </div>
                    <div className="flex">
                      <span className="w-30 text-sm leading-[14px] text-[#666666]">이메일</span>
                      <span className="text-sm leading-[14px]">{customerInfo?.email}</span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
              <div>
                <h3 className="text-xs leading-[12px] mb-2.5">포인트</h3>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <AppInputAmount
                      value={pointInput}
                      onChange={(e) => setPointInput(e.target.value)}
                      placeholder="0"
                    />
                    {pointInput && (
                      <button
                        onClick={() => setPointInput('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5"
                      >
                        <IoIosCloseCircle size={19} color="#aaaaaa" />
                      </button>
                    )}
                  </div>
                  <AppButton className="w-[105px] text-sm leading-[14px] text-white bg-[#a91201]">
                    전액사용
                  </AppButton>
                </div>
                <p className="flex gap-1 mt-2.5">
                  <span className="text-xs leading-[12px] text-[#aaaaaa]">사용 가능한 포인트</span>
                  <span className="text-xs leading-[12px]">{formatNumber(availablePoints)}원</span>
                </p>
              </div>
            </div>
          </div>
        </BorderedSection>
        <BorderedSection>
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
                  <span className="text-sm leading-[14px]">
                    - {formatNumber(shippingDiscount)}원
                  </span>
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
        </BorderedSection>
        <BorderedSection>
          <Accordion type="single" collapsible defaultValue="payment-method">
            <AccordionItem value="payment-method" className="border-b-0">
              <AccordionTrigger className="items-center px-[15px] py-5 hover:no-underline">
                <h2 className="text-base leading-[16px]">결제방법 선택</h2>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="px-[15px] pt-2.5 pb-5">
                  <div className="grid grid-cols-2 gap-2.5">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.type}
                        onClick={() => setSelectedPaymentMethod(method.type as PaymentMethod)}
                        className={`relative flex items-center justify-center py-[19px] text-sm leading-[14px] border box-border overflow-hidden ${
                          selectedPaymentMethod === method.type
                            ? 'border-[#a91201]'
                            : 'border-[#cccccc]'
                        }`}
                      >
                        {method.badge && (
                          <>
                            <div className="absolute -top-[24px] -left-[24px] w-[48px] h-[48px] bg-[#a91201] rotate-45" />
                            <span className="absolute top-[6px] left-[3px] text-[8px] leading-[8px] text-white font-medium -rotate-45">
                              {method.badge}
                            </span>
                          </>
                        )}
                        <span>{method.label}</span>
                      </button>
                    ))}
                  </div>
                  {selectedPaymentMethod === 'CASH' && (
                    <div className="mt-5 px-[16px] py-5 space-y-5 bg-[#f9f9f9] border border-[#eeeeee] box-border">
                      <p className="text-sm leading-[14px]">
                        <span className="font-bold">현장에서 현금 결제</span>시 드리는 혜택
                      </p>
                      <p className="text-xs leading-[12px] text-[#666666]">
                        현장(가게)에서 현금으로 결제시 최대 10% 포인트 적립
                      </p>
                    </div>
                  )}
                  {selectedPaymentMethod === 'CARD' && (
                    <div className="mt-5 px-[16px] py-5 space-y-5 bg-[#f9f9f9] border border-[#eeeeee] box-border">
                      <p className="text-sm leading-[14px]">
                        <span className="font-bold">현장에서 카드 결제</span>시 드리는 혜택
                      </p>
                      <p className="text-xs leading-[12px] text-[#666666]">
                        현장(가게)에서 카드로 결제시 최대 10% 포인트 적립
                      </p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
        <AppButton className="!bg-[#a91201]">결제하기</AppButton>
      </div>
    </section>
  )
}
