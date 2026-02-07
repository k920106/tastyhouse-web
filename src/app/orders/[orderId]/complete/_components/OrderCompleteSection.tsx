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
import type { OrderDetailResponse } from '@/domains/order'
import { formatNumber } from '@/lib/number'

interface OrderCompleteSectionProps {
  orderDetail: OrderDetailResponse
}

export default function OrderCompleteSection({ orderDetail }: OrderCompleteSectionProps) {
  const {
    orderNumber,
    orderStatus,
    placeName,
    orderItems,
    ordererName,
    ordererPhone,
    ordererEmail,
    totalProductAmount,
    productDiscountAmount,
    couponDiscountAmount,
    pointDiscountAmount,
    totalDiscountAmount,
    finalAmount,
    payment,
  } = orderDetail

  const statusColor =
    orderStatus === 'CONFIRMED'
      ? 'bg-[#4f9857] text-white'
      : orderStatus === 'COMPLETED'
        ? 'bg-[#aaaaaa] text-white'
        : orderStatus === 'CANCELLED'
          ? 'bg-[#bc4040] text-white'
          : ''

  const statusText =
    orderStatus === 'CONFIRMED'
      ? '결제완료'
      : orderStatus === 'COMPLETED'
        ? '사용완료'
        : orderStatus === 'CANCELLED'
          ? '결제취소'
          : orderStatus

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
              {statusText}
            </AppBadge>
          </div>
        </BorderedSection>
        <BorderedSection>
          <div className="px-[15px] pt-5 pb-[15px]">
            <h2 className="text-base leading-[16px]">{placeName}</h2>
          </div>
          <div className="px-4 pb-[5px]">
            <div className="divide-y divide-[#eeeeee] first:border-t border-[#eeeeee]">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center gap-[15px] py-[15px]">
                  <ImageContainer src={item.productImageUrl} alt={item.productName} size={50} />
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-sm leading-[14px]">{item.productName}</h3>
                    <p className="text-sm leading-[14px]">
                      {formatNumber(item.unitPrice)}원 | {item.quantity}개
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
                      <span className="text-sm leading-[14px]">{ordererName}</span>
                    </div>
                    <div className="flex">
                      <span className="w-30 text-sm leading-[14px] text-[#666666]">휴대폰</span>
                      <span className="text-sm leading-[14px]">{ordererPhone}</span>
                    </div>
                    <div className="flex">
                      <span className="w-30 text-sm leading-[14px] text-[#666666]">이메일</span>
                      <span className="text-sm leading-[14px]">{ordererEmail}</span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
                      <span className="text-sm leading-[14px]">{payment.paymentDateTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm leading-[14px]">결제방법</span>
                      <div className="flex flex-col items-end gap-1">
                        <p className="text-sm leading-[14px]">{payment.paymentMethod}</p>
                        {payment.cardNumber && (
                          <p className="text-[11px] leading-[11px] text-[#aaaaaa]">
                            {payment.cardNumber}
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
                        {formatNumber(totalProductAmount)}원
                      </span>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span className="text-sm leading-[14px]">할인금액</span>
                        <span className="text-sm leading-[14px]">
                          {totalDiscountAmount > 0
                            ? `- ${formatNumber(totalDiscountAmount)}원`
                            : '0원'}
                        </span>
                      </div>
                      {totalDiscountAmount > 0 && (
                        <div className="pt-2.5 space-y-2.5">
                          {productDiscountAmount > 0 && (
                            <div className="flex justify-between">
                              <span className="text-xs leading-[12px] text-[#aaaaaa]">
                                상품 할인
                              </span>
                              <span className="text-xs leading-[12px] text-[#aaaaaa]">
                                - {formatNumber(productDiscountAmount)}원
                              </span>
                            </div>
                          )}
                          {couponDiscountAmount > 0 && (
                            <div className="flex justify-between">
                              <span className="text-xs leading-[12px] text-[#aaaaaa]">
                                쿠폰 사용
                              </span>
                              <span className="text-xs leading-[12px] text-[#aaaaaa]">
                                - {formatNumber(couponDiscountAmount)}원
                              </span>
                            </div>
                          )}
                          {pointDiscountAmount > 0 && (
                            <div className="flex justify-between">
                              <span className="text-xs leading-[12px] text-[#aaaaaa]">
                                포인트 사용
                              </span>
                              <span className="text-xs leading-[12px] text-[#aaaaaa]">
                                - {formatNumber(pointDiscountAmount)}원
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm leading-[14px]">최종 결제금액</span>
                      <span className="text-sm leading-[14px]">{formatNumber(finalAmount)}원</span>
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
