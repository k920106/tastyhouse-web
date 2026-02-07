import AppBadge from '@/components/ui/AppBadge'
import type { OrderStatus } from '@/domains/order'

interface OrderStatusHeaderProps {
  orderNumber: string
  orderStatus: OrderStatus
}

export default function OrderStatusHeader({ orderNumber, orderStatus }: OrderStatusHeaderProps) {
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
    <div className="px-4 py-4 flex items-center justify-between">
      <span className="text-[13px] leading-[13px]">{orderNumber}</span>
      <AppBadge
        className={`px-[11px] py-[7px] text-[11px] leading-[11px] rounded-[12.5px] border-none ${statusColor}`}
      >
        {statusText}
      </AppBadge>
    </div>
  )
}
