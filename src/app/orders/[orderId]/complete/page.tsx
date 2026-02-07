'use client'

import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import AppBadge from '@/components/ui/AppBadge'
import AppButton from '@/components/ui/AppButton'
import BorderedSection from '@/components/ui/BorderedSection'
import ImageContainer from '@/components/ui/ImageContainer'
import SectionStack from '@/components/ui/SectionStack'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/shadcn/accordion'

import { formatNumber } from '@/lib/number'

interface OrderItem {
  id: number
  name: string
  imageUrl: string
  salePrice: number
  quantity: number
}

interface CustomerInfo {
  name: string
  phone: string
  email: string
}

interface ReservationInfo {
  method: string
  status: string
  dateTime: string
  people: number
  request: string
}

interface PaymentInfo {
  dateTime: string
  method: string
  cardNumber?: string
}

interface PaymentBreakdown {
  productTotal: number
  discount: number
  productDiscount: number
  couponUsed: number
  pointsUsed: number
  finalTotal: number
}

export default function OrderCompletePage() {
  // Mock data
  const orderNumber = 'NO.12345'
  const orderStatus = '결제완료' // 결제완료, 사용완료, 결제취소

  const placeName = '땡스오트'

  const orderItems: OrderItem[] = [
    {
      id: 1,
      name: '베리 스트로베리',
      imageUrl: '/placeholder-food.jpg',
      salePrice: 7900,
      quantity: 1,
    },
    {
      id: 2,
      name: '블루나잇',
      imageUrl: '/placeholder-food.jpg',
      salePrice: 7500,
      quantity: 1,
    },
    {
      id: 3,
      name: '아보카도 햄치즈 샌드위치',
      imageUrl: '/placeholder-food.jpg',
      salePrice: 8500,
      quantity: 1,
    },
  ]

  const customerInfo: CustomerInfo = {
    name: '김철수',
    phone: '010-1234-5678',
    email: 'abc123@naver.com',
  }

  const reservationInfo: ReservationInfo = {
    method: '포장',
    status: '승인대기중',
    dateTime: '2021-01-01 오후 1:00',
    people: 2,
    request: '일회용품은 빼주세요!',
  }

  const paymentInfo: PaymentInfo = {
    dateTime: '2020-01-21 18:00',
    method: '신용카드',
    cardNumber: '신한 (4518*******6)',
  }

  const paymentBreakdown: PaymentBreakdown = {
    productTotal: 23900,
    discount: 1000,
    productDiscount: 1000,
    couponUsed: 0,
    pointsUsed: 0,
    finalTotal: 22900,
  }

  const statusColor =
    orderStatus === '결제완료'
      ? 'bg-[#4f9857] text-white'
      : orderStatus === '사용완료'
        ? 'bg-[#aaaaaa] text-white'
        : orderStatus === '결제취소'
          ? 'bg-[#bc4040] text-white'
          : ''

  return (
    <section className="min-h-screen flex flex-col bg-white">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <h1 className="text-[17px] leading-[17px]">결제내역</h1>
        </HeaderCenter>
      </Header>
      <SectionStack>
        <BorderedSection className="border-t-0">
          <div className="px-4 py-4 flex items-center justify-between">
            <span className="text-[13px] leading-[13px]">{orderNumber}</span>
            <AppBadge
              className={`px-[11px] py-[7px] text-[11px] leading-[11px] rounded-[12.5px] border-none ${statusColor}`}
            >
              {orderStatus}
            </AppBadge>
          </div>
        </BorderedSection>
        <BorderedSection>
          <div className="px-[15px] pt-5 pb-[15px]">
            <h2 className="text-base leading-[16px]">{placeName}</h2>
          </div>
          <div className="px-4 pb-[5px]">
            <div className="divide-y divide-[#eeeeee] first:border-t border-[#eeeeee]">
              {orderItems.map((item, index) => (
                <div key={index} className="flex items-center gap-[15px] py-[15px]">
                  <ImageContainer src={item.imageUrl} alt={item.name} size={50} />
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-sm leading-[14px]">{item.name}</h3>
                    <p className="text-sm leading-[14px]">
                      {formatNumber(item.salePrice)}원 | {item.quantity}개
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
              <h2 className="text-base leading-[16px]">예약 정보</h2>
            </div>
            <div className="space-y-[15px]">
              <div className="flex">
                <span className="w-30 text-sm leading-[14px] text-[#666666]">주문방법</span>
                <span className="text-sm leading-[14px]">{reservationInfo.method}</span>
              </div>
              <div className="flex">
                <span className="w-30 text-sm leading-[14px] text-[#666666]">주문상태</span>
                <span className="text-sm leading-[14px]">{reservationInfo.status}</span>
              </div>
              <div className="flex">
                <span className="w-30 text-sm leading-[14px] text-[#666666]">예약날짜</span>
                <span className="text-sm leading-[14px]">{reservationInfo.dateTime}</span>
              </div>
              <div className="flex">
                <span className="w-30 text-sm leading-[14px] text-[#666666]">예약인원</span>
                <span className="text-sm leading-[14px]">{reservationInfo.people}명</span>
              </div>
              <div className="flex">
                <span className="w-30 text-sm leading-[14px] text-[#666666]">요청사항</span>
                <span className="text-sm leading-[14px]">{reservationInfo.request}</span>
              </div>
            </div>
          </div>
        </BorderedSection>
        <BorderedSection>
          <Accordion type="single" collapsible defaultValue="payment-info">
            <AccordionItem value="payment-info" className="border-b-0">
              <AccordionTrigger className="items-center px-[15px] py-5 hover:no-underline">
                <h2 className="text-base leading-[16px]">결제 정보</h2>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="px-[15px] py-2.5 pb-5">
                  <div className="space-y-[15px]">
                    <div className="flex justify-between">
                      <span className="text-sm leading-[14px]">결제시간</span>
                      <span className="text-sm leading-[14px]">{paymentInfo.dateTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm leading-[14px]">결제방법</span>
                      <div className="flex flex-col items-end gap-1">
                        <p className="text-sm leading-[14px]">{paymentInfo.method}</p>
                        {paymentInfo.cardNumber && (
                          <p className="text-[11px] leading-[11px] text-[#aaaaaa]">
                            {paymentInfo.cardNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </BorderedSection>
        <BorderedSection>
          <Accordion type="single" collapsible defaultValue="payment-breakdown">
            <AccordionItem value="payment-breakdown" className="border-b-0">
              <AccordionTrigger className="items-center px-[15px] py-5 hover:no-underline">
                <h2 className="text-base leading-[16px]">결제 내역</h2>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="px-[15px] py-2.5 pb-5">
                  <div className="space-y-[15px]">
                    <div className="flex justify-between">
                      <span className="text-sm leading-[14px]">상품금액</span>
                      <span className="text-sm leading-[14px]">
                        {formatNumber(paymentBreakdown.productTotal)}원
                      </span>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span className="text-sm leading-[14px]">할인금액</span>
                        <span className="text-sm leading-[14px]">
                          {paymentBreakdown.discount > 0
                            ? `- ${formatNumber(paymentBreakdown.discount)}원`
                            : '0원'}
                        </span>
                      </div>
                      {paymentBreakdown.discount > 0 && (
                        <div className="pt-2.5 space-y-2.5">
                          {paymentBreakdown.productDiscount > 0 && (
                            <div className="flex justify-between">
                              <span className="text-xs leading-[12px] text-[#aaaaaa]">
                                상품 할인
                              </span>
                              <span className="text-xs leading-[12px] text-[#aaaaaa]">
                                - {formatNumber(paymentBreakdown.productDiscount)}원
                              </span>
                            </div>
                          )}
                          {paymentBreakdown.couponUsed > 0 && (
                            <div className="flex justify-between">
                              <span className="text-xs leading-[12px] text-[#aaaaaa]">
                                쿠폰 사용
                              </span>
                              <span className="text-xs leading-[12px] text-[#aaaaaa]">
                                - {formatNumber(paymentBreakdown.couponUsed)}원
                              </span>
                            </div>
                          )}
                          {paymentBreakdown.pointsUsed > 0 && (
                            <div className="flex justify-between">
                              <span className="text-xs leading-[12px] text-[#aaaaaa]">
                                포인트 사용
                              </span>
                              <span className="text-xs leading-[12px] text-[#aaaaaa]">
                                {formatNumber(paymentBreakdown.pointsUsed)}원
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm leading-[14px]">최종 결제금액</span>
                      <span className="text-sm leading-[14px]">
                        {formatNumber(paymentBreakdown.finalTotal)}원
                      </span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </BorderedSection>
        <BorderedSection>
          <div className="px-[15px] py-5 bg-white">
            <div className="space-y-5">
              <h3 className="text-base leading-[16px]">결제 취소시 환불 규정 안내</h3>
              <p className="text-[13px] leading-[13px] text-[#666666]">
                결제 취소 시점은 예약 날짜를 기준으로 합니다.
              </p>
              <div className="space-y-2.5">
                <p className="text-[13px] leading-[13px] text-[#666666]">
                  • 3일 전 취소: 전액 환불
                </p>
                <p className="text-[13px] leading-[13px] text-[#666666]">
                  • 2일 전 취소: 결제 금액의 80% 환불
                </p>
                <p className="text-[13px] leading-[13px] text-[#666666]">
                  • 1일 전 취소: 결제 금액의 50% 환불
                </p>
                <p className="text-[13px] leading-[13px] text-[#666666]">• 당일 취소: 환불 불가</p>
              </div>
            </div>
          </div>
        </BorderedSection>
      </SectionStack>
      <div className="px-[15px] py-5">
        <AppButton className="!bg-[#a91201]">결제취소</AppButton>
      </div>
    </section>
  )
}
