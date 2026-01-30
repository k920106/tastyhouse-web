import OrderCheckoutSection from './_components/OrderCheckoutSection'

interface OrderCheckoutPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function OrderCheckoutPage({ params }: OrderCheckoutPageProps) {
  const { id } = await params

  const placeId = Number(id)

  return <OrderCheckoutSection placeId={placeId} />
}
