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
import { PaymentMethod } from '@/domains/order'
import { formatNumber } from '@/lib/number'
import Image from 'next/image'
import { useState } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'

interface OrderItem {
  id: number
  name: string
  imageUrl: string
  price: number
  quantity: number
}

interface OrderInfo {
  placeName: string
  items: OrderItem[]
}

interface OrderCheckoutSectionProps {
  placeId: number
}

export default function OrderCheckoutSection({ placeId }: OrderCheckoutSectionProps) {
  const [pointInput, setPointInput] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // Mock data
  const orderInfo: OrderInfo = {
    placeName: '땡스오트',
    items: [
      {
        id: 1,
        name: '베리스트로베리',
        imageUrl: '/images/sample/food/food-image1.png',
        price: 7900,
        quantity: 1,
      },
      {
        id: 2,
        name: '블루나잇',
        imageUrl: '/images/sample/food/food-image2.png',
        price: 7500,
        quantity: 1,
      },
      {
        id: 3,
        name: '아보카도 햄치즈 샌드위치',
        imageUrl: '/images/sample/food/food-image3.png',
        price: 8500,
        quantity: 1,
      },
    ],
  }

  const customerInfo = {
    name: '김철수',
    phone: '010-1234-5678',
    email: 'abc123@naver.com',
  }

  // 계산
  const productTotal = orderInfo.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingDiscount = 1000
  const couponDiscount = 0
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
                    외 {orderInfo.items.length}건
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="px-4">
                  <div className="divide-y divide-[#eeeeee] first:border-t border-[#eeeeee]">
                    {orderInfo.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-[15px] py-[15px]">
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
                      <span className="text-sm leading-[14px]">{customerInfo.name}</span>
                    </div>
                    <div className="flex">
                      <span className="w-30 text-sm leading-[14px] text-[#666666]">휴대폰</span>
                      <span className="text-sm leading-[14px]">{customerInfo.phone}</span>
                    </div>
                    <div className="flex">
                      <span className="w-30 text-sm leading-[14px] text-[#666666]">이메일</span>
                      <span className="text-sm leading-[14px]">{customerInfo.email}</span>
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
              <div>
                <h3 className="text-xs leading-[12px] mb-2.5">쿠폰</h3>
                <button className="w-full h-[50px] px-[15px] py-[17px] flex items-center justify-between border border-[#eeeeee] box-border">
                  <span className="text-sm leading-[14px] text-[#aaaaaa]">
                    사용할 수 있는 쿠폰이 없습니다.
                  </span>
                  <Image src="/images/layout/nav-right.png" alt="닫기" width={9} height={16} />
                </button>
              </div>
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
