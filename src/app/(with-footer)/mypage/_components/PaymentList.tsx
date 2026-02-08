import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { MyPaymentListItemResponse } from '@/domains/member/member.type'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import MyPagePaymentItem from './MyPagePaymentItem'

interface PaymentListProps {
  payments: MyPaymentListItemResponse[]
  hasMorePayments: boolean
}
export default function PaymentList({ payments, hasMorePayments }: PaymentListProps) {
  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full pb-[70px]">
        <div className="relative w-[35px] h-[40px]">
          <Image src="/images/mypage/logo-gray.png" alt="로고" width={35} height={40} />
        </div>
        <div className="mt-[15px]">
          <p className="text-sm leading-[14px] text-[#aaaaaa]">결제 내역이 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="px-[15px] py-[5px] bg-white divide-y divide-[#eeeeee]">
        {payments.map((payment) => (
          <MyPagePaymentItem
            key={payment.paymentId}
            paymentId={payment.paymentId}
            placeThumbnailImageUrl={payment.placeThumbnailImageUrl}
            placeName={payment.placeName}
            firstProductName={payment.firstProductName}
            totalItemCount={payment.totalItemCount}
            price={payment.amount}
            date={payment.paymentDate}
            paymentStatus={payment.paymentStatus}
          />
        ))}
      </div>
      {hasMorePayments && (
        <div className="flex justify-center py-5">
          <ViewMoreButton href={PAGE_PATHS.MY_PAYMENTS} label="더 보러가기" />
        </div>
      )}
      <div className="h-[70px]"></div>
    </>
  )
}
