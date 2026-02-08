'use client'

import ImageContainer from '@/components/ui/ImageContainer'
import { getPaymentStatusColor, getPaymentStatusName } from '@/constants/payment'
import { PaymentStatus } from '@/domains/payment'
import { formatNumber } from '@/lib/number'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

interface MyPagePaymentItemProps {
  id: number
  storeName: string
  productName: string
  price: number
  date: string
  paymentStatus: PaymentStatus
  storeImage: string
}

export default function MyPagePaymentItem({
  id,
  storeName,
  productName,
  price,
  date,
  paymentStatus,
  storeImage,
}: MyPagePaymentItemProps) {
  const statusColor = getPaymentStatusColor(paymentStatus)
  const statusName = getPaymentStatusName(paymentStatus)

  return (
    <Link href={PAGE_PATHS.PAYMENT_DETAIL(id)} className="block">
      <div className="flex items-center justify-between py-[15px]">
        <div className="flex items-center gap-[15px]">
          <ImageContainer src={storeImage} alt={storeName} size={60} />
          <div className="flex-1 flex flex-col min-w-0">
            <p className="text-[11px] leading-[11px] text-[#888888] truncate">{storeName}</p>
            <p className="text-sm leading-[14px] mt-[7px]">{productName}</p>
            <p className="text-sm leading-[14px] mt-2.5">{formatNumber(price)}원</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-[7px] justify-between">
          <p className="text-[11px] leading-[11px] text-[#aaaaaa]">{date}</p>
          <p className="text-[11px] leading-[11px]" style={{ color: statusColor }}>
            {statusName}
          </p>
        </div>
      </div>
    </Link>
  )
}
