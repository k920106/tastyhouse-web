import ErrorMessage from '@/components/ui/ErrorMessage'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getPlacePhotos } from '@/services/place'
import { useQuery } from '@tanstack/react-query'
import PlacePhotoList, { PlacePhotoListSkeleton } from './PlacePhotoList'

interface PlacePhotoListFetcherProps {
  placeId: number
}

export default function PlacePhotoListFetcher({ placeId }: PlacePhotoListFetcherProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['place', placeId, 'place-detail-photos'],
    queryFn: () => getPlacePhotos(placeId),
  })

  if (isLoading) {
    return <PlacePhotoListSkeleton />
  }

  if (error) {
    return (
      <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10 bg-white" />
    )
  }

  if (!data || !data.data || !data.data.success || !data.data.data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('사진')}
        className="py-10 bg-white"
      />
    )
  }

  return <PlacePhotoList categories={data.data.data} />
}
