'use client'

import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { toast } from '@/components/ui/AppToaster'
import BorderedSection from '@/components/ui/BorderedSection'
import FixedBottomSection from '@/components/ui/FixedBottomSection'
import ImageContainer from '@/components/ui/ImageContainer'
import SectionStack from '@/components/ui/SectionStack'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/shadcn/accordion'
import { formatNumber } from '@/lib/number'
import { useState } from 'react'

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
  const [isCustomerExpanded, setIsCustomerExpanded] = useState(true)
  const [isPaymentMethodExpanded, setIsPaymentMethodExpanded] = useState(true)
  const [pointInput, setPointInput] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('현장에서 현금 결제')
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
    { id: 'cash', label: '현장에서 현금 결제', badge: '5%' },
    { id: 'card', label: '현장에서 카드 결제', badge: '' },
    { id: 'credit', label: '신용카드', badge: '' },
    { id: 'phone', label: '휴대폰 결제', badge: '' },
    { id: 'kakaopay', label: 'kakao pay', badge: '', icon: 'kakao' },
    { id: 'zeropay', label: 'zero pay', badge: '', icon: 'zero' },
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
      </SectionStack>
      <div className="pb-32">
        <div className="border-b-8 border-[#f5f5f5]">
          <button
            onClick={() => setIsCustomerExpanded(!isCustomerExpanded)}
            className="w-full px-4 py-4 flex items-center justify-between"
          >
            <h2 className="text-[15px]">주문자 정보</h2>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={`transform transition-transform ${isCustomerExpanded ? 'rotate-180' : ''}`}
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isCustomerExpanded && (
            <div className="px-4 pb-4 space-y-3">
              <div className="flex">
                <span className="text-[15px] text-[#666666] w-20">주문하는 분</span>
                <span className="text-[15px]">{customerInfo.name}</span>
              </div>
              <div className="flex">
                <span className="text-[15px] text-[#666666] w-20">휴대폰</span>
                <span className="text-[15px]">{customerInfo.phone}</span>
              </div>
              <div className="flex">
                <span className="text-[15px] text-[#666666] w-20">이메일</span>
                <span className="text-[15px]">{customerInfo.email}</span>
              </div>
            </div>
          )}
        </div>
        <div className="border-b-8 border-[#f5f5f5] px-4 py-6">
          <h2 className="text-[15px] mb-4">쿠폰/적립금 사용</h2>
          <div className="mb-6">
            <h3 className="text-[15px] mb-3">쿠폰</h3>
            <button className="w-full px-4 py-4 border border-[#eeeeee] rounded flex items-center justify-between bg-white">
              <span className="text-[15px] text-[#aaaaaa]">사용할 수 있는 쿠폰이 없습니다.</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#CCCCCC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div>
            <h3 className="text-[15px] mb-3">포인트</h3>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="number"
                  value={pointInput}
                  onChange={(e) => setPointInput(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-4 border border-[#eeeeee] rounded text-[15px]"
                />
                {pointInput && (
                  <button
                    onClick={() => setPointInput('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#CCCCCC" />
                      <path
                        d="M6 6L14 14M6 14L14 6"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <button
                onClick={handleApplyAllPoints}
                className="px-6 py-4 bg-main text-white text-[15px]"
              >
                전액사용
              </button>
            </div>
            <p className="text-sm text-[#666666] mt-2">
              사용 가능한 포인트 {availablePoints.toLocaleString()}원
            </p>
          </div>
        </div>
        <div className="border-b-8 border-[#f5f5f5] px-4 py-6">
          <h2 className="text-[15px] mb-4">결제 금액</h2>

          <div className="space-y-3">
            <div className="flex justify-between text-[15px]">
              <span className="text-[#666666]">상품금액</span>
              <span>{productTotal.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-[15px]">
              <span className="text-[#666666]">할인금액</span>
              <span>- {shippingDiscount.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-[13px] text-[#cccccc] pl-4">
              <span>상품 할인</span>
              <span>- {shippingDiscount.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-[13px] text-[#cccccc] pl-4">
              <span>쿠폰 사용</span>
              <span>{couponDiscount}원</span>
            </div>
            <div className="flex justify-between text-[13px] text-[#cccccc] pl-4">
              <span>포인트 사용</span>
              <span>
                {pointsUsed > 0 ? '-' : ''}
                {pointsUsed.toLocaleString()}원
              </span>
            </div>
            <div className="h-px bg-[#eeeeee] my-3" />
            <div className="flex justify-between ">
              <span>최종 결제금액</span>
              <span className="text-main">{finalTotal.toLocaleString()}원</span>
            </div>
          </div>
        </div>
        <div className="px-4 py-6">
          <button
            onClick={() => setIsPaymentMethodExpanded(!isPaymentMethodExpanded)}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className="text-[15px]">결제방법 선택</h2>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={`transform transition-transform ${
                isPaymentMethodExpanded ? 'rotate-180' : ''
              }`}
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isPaymentMethodExpanded && (
            <>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.label)}
                    className={`relative py-4 border-2 flex items-center justify-center text-[15px] ${
                      selectedPaymentMethod === method.label ? 'border-main' : 'border-[#eeeeee]'
                    }`}
                  >
                    {method.badge && (
                      <span className="absolute top-0 left-0 bg-main text-white text-xs px-2 py-0.5">
                        {method.badge}
                      </span>
                    )}
                    {method.icon === 'kakao' ? (
                      <div className="flex items-center gap-1">
                        <div className="w-8 h-8 bg-[#FEE500] rounded-full flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M8 2C4.13 2 1 4.46 1 7.5C1 9.38 2.19 11.04 4 11.95L3.5 13.5C3.46 13.64 3.6 13.77 3.72 13.69L5.67 12.38C6.42 12.56 7.2 12.67 8 12.67C11.87 12.67 15 10.21 15 7.17C15 4.13 11.87 2 8 2Z"
                              fill="#381E1F"
                            />
                          </svg>
                        </div>
                        <span>pay</span>
                      </div>
                    ) : method.icon === 'zero' ? (
                      <span className="font-bold text-[#0066FF]">zero</span>
                    ) : (
                      <span>{method.label}</span>
                    )}
                  </button>
                ))}
              </div>
              {selectedPaymentMethod === '현장에서 현금 결제' && (
                <div className="bg-[#f5f5f5] px-4 py-3 text-sm text-[#666666] mb-4">
                  <p className="mb-1">현장에서 현금 결제시 드리는 혜택</p>
                  <p>현장(가게)에서 현금으로 결제시 최대 10% 포인트 적립</p>
                </div>
              )}
            </>
          )}
          <button
            onClick={() => setAgreedToTerms(!agreedToTerms)}
            className="flex items-center gap-3 py-4"
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                agreedToTerms ? 'bg-main border-main' : 'border-[#dddddd]'
              }`}
            >
              {agreedToTerms && (
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                  <path
                    d="M1 5.5L5 9.5L13 1.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className="text-[15px] text-[#666666]">
              위 주문의 상품 및 결제, 주문 정보 등을 확인하였으며, 이에 동의합니다. (필수)
            </span>
          </button>
        </div>
      </div>
      <FixedBottomSection>
        <button
          onClick={handlePayment}
          disabled={!agreedToTerms}
          className={`w-full py-4 text-white  ${agreedToTerms ? 'bg-main' : 'bg-[#ffb3b3]'}`}
        >
          결제하기
        </button>
      </FixedBottomSection>
    </section>
  )
}
