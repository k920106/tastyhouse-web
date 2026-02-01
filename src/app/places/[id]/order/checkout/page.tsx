import {
  getMemberAvailableCoupons,
  getMemberContact,
  getMemberUsablePoint,
} from '@/services/member'
import OrderCheckoutSection from './_components/OrderCheckoutSection'

export default async function OrderCheckoutPage() {
  const [contactResult, couponsResult, usablePointResult] = await Promise.all([
    getMemberContact(),
    getMemberAvailableCoupons(),
    getMemberUsablePoint(),
  ])

  const customerInfo = contactResult.data?.data ?? null
  const availableCoupons = couponsResult.data?.data ?? []
  const usablePoints = usablePointResult.data?.data?.usablePoints ?? 0

  return (
    <OrderCheckoutSection
      customerInfo={customerInfo}
      availableCoupons={availableCoupons}
      usablePoints={usablePoints}
    />
  )
}
