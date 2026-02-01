import {
  getMemberAvailableCoupons,
  getMemberContact,
  getMemberUsablePoint,
} from '@/services/member'
import { getPlaceName } from '@/services/place'
import OrderCheckoutSection from './_components/OrderCheckoutSection'

interface OrderCheckoutPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function OrderCheckoutPage({ params }: OrderCheckoutPageProps) {
  const { id } = await params

  const placeId = Number(id)

  const [placeNameResult, contactResult, couponsResult, usablePointResult] = await Promise.all([
    getPlaceName(placeId),
    getMemberContact(),
    getMemberAvailableCoupons(),
    getMemberUsablePoint(),
  ])

  const placeName = placeNameResult.data?.data?.name ?? ''
  const customerInfo = contactResult.data?.data ?? null
  const availableCoupons = couponsResult.data?.data ?? []
  const usablePoints = usablePointResult.data?.data?.usablePoints ?? 0

  return (
    <OrderCheckoutSection
      placeName={placeName}
      customerInfo={customerInfo}
      availableCoupons={availableCoupons}
      usablePoints={usablePoints}
    />
  )
}
