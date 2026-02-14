import { getOrderDetail } from '@/services/order'
import OrderDetailSection from './_components/OrderDetailSection'

interface OrderDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params

  const orderId = Number(id)

  const orderDetailResult = await getOrderDetail(orderId)

  const orderDetail = orderDetailResult.data?.data

  if (!orderDetail) {
    return <div>주문 정보를 불러올 수 없습니다.</div>
  }

  return <OrderDetailSection orderDetail={orderDetail} />
}
