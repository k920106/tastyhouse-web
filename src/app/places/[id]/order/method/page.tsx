import PlaceOrderMethodSection from './_components/PlaceOrderMethodSection'

interface OrderMethodPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function OrderMethodPage({ params }: OrderMethodPageProps) {
  const { id } = await params
  const placeId = Number(id)

  return <PlaceOrderMethodSection placeId={placeId} />
}
