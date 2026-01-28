import CartSection from './_components/CartSection'

interface CartPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CartPage({ params }: CartPageProps) {
  const { id } = await params

  const placeId = Number(id)

  return <CartSection placeId={placeId} />
}
