import { getMemberAvailableCoupons, getMemberContact } from '@/services/member'
import OrderCheckoutSection from './_components/OrderCheckoutSection'

export default async function OrderCheckoutPage() {
  const [contactResult, couponsResult] = await Promise.all([
    getMemberContact(),
    getMemberAvailableCoupons(),
  ])

  const customerInfo = contactResult.data?.data ?? null
  const availableCoupons = couponsResult.data?.data ?? []

  return (
    <OrderCheckoutSection
      customerInfo={customerInfo}
      availableCoupons={availableCoupons}
    />
  )
}
