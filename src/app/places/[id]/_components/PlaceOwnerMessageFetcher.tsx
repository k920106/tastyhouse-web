import ErrorMessage from '@/components/ui/ErrorMessage'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getPlaceOwnerMessageHistory } from '@/services/place'
import { useQuery } from '@tanstack/react-query'
import PlaceOwnerMessage, { PlaceOwnerMessageSkeleton } from './PlaceOwnerMessage'

interface PlaceOwnerMessageFetcherProps {
  placeId: number
}

export default function PlaceOwnerMessageFetcher({ placeId }: PlaceOwnerMessageFetcherProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['place', placeId, 'owner-message'],
    queryFn: () => getPlaceOwnerMessageHistory(placeId),
  })

  if (isLoading) {
    return <PlaceOwnerMessageSkeleton />
  }

  if (error) {
    return (
      <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10 bg-white" />
    )
  }

  if (!data || !data.success || !data.data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('사장님 한마디')}
        className="py-10 bg-white"
      />
    )
  }

  return <PlaceOwnerMessage placeOwnerMessageHistory={data.data} />
}
