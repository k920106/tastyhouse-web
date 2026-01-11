import { MenuCategoryItemSkeleton } from '@/components/menus/MenuCategoryItem'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getPlaceMenus } from '@/services/place'
import { useQuery } from '@tanstack/react-query'
import PlaceMenuList from './PlaceMenuList'

interface PlaceMenuListFetcherProps {
  placeId: number
}

export default function PlaceMenuListFetcher({ placeId }: PlaceMenuListFetcherProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['place', placeId, 'place-detail-menus'],
    queryFn: () => getPlaceMenus(placeId),
  })

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 2 }).map((_, i) => (
          <MenuCategoryItemSkeleton key={i} />
        ))}
      </>
    )
  }

  if (error) {
    return (
      <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10 bg-white" />
    )
  }

  if (!data || !data.data || !data.data.success || !data.data.data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('메뉴')}
        className="py-10 bg-white"
      />
    )
  }

  return <PlaceMenuList menus={data.data.data} />
}
