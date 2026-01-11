import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getPlaceMenus } from '@/services/place'
import { useQuery } from '@tanstack/react-query'
import PlaceMenuList from './PlaceMenuList'

export function PlaceMenuSkeleton() {
  return (
    <div className="py-6 space-y-8">
      <Skeleton className="h-20 w-full" />
    </div>
  )
}

interface PlaceMenuFetcherProps {
  placeId: number
}

export default function PlaceMenuFetcher({ placeId }: PlaceMenuFetcherProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['place', placeId, 'place-detail-menus'],
    queryFn: () => getPlaceMenus(placeId),
  })

  if (isLoading) {
    return <PlaceMenuSkeleton />
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
