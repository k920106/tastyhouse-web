import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import type { OrderDetailResponse } from '@/domains/order'
import CancelOrderButton from './CancelOrderButton'
import OrderStatusHeader from './OrderStatusHeader'
import OrderedProductList from './OrderedProductList'
import OrdererInformationAccordion from './OrdererInformationAccordion'
import PaymentBreakdownAccordion from './PaymentBreakdownAccordion'
import PaymentInformationAccordion from './PaymentInformationAccordion'
import RefundPolicySection from './RefundPolicySection'

interface OrderCompleteSectionProps {
  orderDetail: OrderDetailResponse
}

export default function OrderCompleteSection({ orderDetail }: OrderCompleteSectionProps) {
  const {
    id,
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
          <OrderStatusHeader orderNumber={orderNumber} orderStatus={orderStatus} />
        </BorderedSection>
        <BorderedSection>
          <OrderedProductList placeName={placeName} orderItems={orderItems} />
        </BorderedSection>
        <BorderedSection>
          <OrdererInformationAccordion
            ordererName={ordererName}
            ordererPhone={ordererPhone}
            ordererEmail={ordererEmail}
          />
        </BorderedSection>
        <BorderedSection>
          <PaymentInformationAccordion payment={payment} />
        </BorderedSection>
        <BorderedSection>
          <PaymentBreakdownAccordion
            totalProductAmount={totalProductAmount}
            productDiscountAmount={productDiscountAmount}
            couponDiscountAmount={couponDiscountAmount}
            pointDiscountAmount={pointDiscountAmount}
            totalDiscountAmount={totalDiscountAmount}
            finalAmount={finalAmount}
          />
        </BorderedSection>
        <BorderedSection>
          <RefundPolicySection />
        </BorderedSection>
      </SectionStack>
      <CancelOrderButton orderId={id} />
    </section>
  )
}
