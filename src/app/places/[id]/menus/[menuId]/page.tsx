interface PlaceMenuDetailPageProps {
  params: Promise<{
    id: string
    menuId: string
  }>
}

export default async function PlaceMenuDetailPage({ params }: PlaceMenuDetailPageProps) {
  const { id, menuId } = await params

  const placeId = Number(id)
  const productId = Number(menuId)

  console.log(placeId, productId)

  return <div>메뉴 상세 리뷰 페이지</div>
}
