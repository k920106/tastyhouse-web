import ErrorStateSection from '@/components/ui/ErrorStateSection'
import { MenuCategory, placeService } from '@/domains/place'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import PlaceOrderMenuListSection from './_components/PlaceOrderMenuListSection'

interface PlaceOrderMenuListPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PlaceOrderMenuListPage({ params }: PlaceOrderMenuListPageProps) {
  const { id } = await params

  const placeId = Number(id)

  const { error, data } = await placeService.getPlaceMenus(placeId)

  if (error || !data || !data.success || !data.data) {
    return <ErrorStateSection message={COMMON_ERROR_MESSAGES.FETCH_ERROR('메뉴')} />
  }

  const menuCategories: MenuCategory[] = data.data

  return <PlaceOrderMenuListSection placeId={placeId} menuCategories={menuCategories} />
}
