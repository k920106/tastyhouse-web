import ErrorMessage from '@/components/ui/ErrorMessage'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getPlaceReviews } from '@/services/place'
import { getCurrentMemberId } from '@/services/review'
import { useQuery } from '@tanstack/react-query'
import ReviewListSection, { ReviewListSkeleton } from './ReviewListSection'

interface ReviewListFetcherProps {
  placeId: number
}

export default function ReviewListFetcher({ placeId }: ReviewListFetcherProps) {
  const { data: currentMemberId } = useQuery({
    queryKey: ['member', 'me'],
    queryFn: getCurrentMemberId,
    staleTime: 1000 * 60 * 5,
  })

  const { data, isLoading, error } = useQuery({
    queryKey: ['place', placeId, 'place-detail-reviews'],
    queryFn: () => getPlaceReviews(placeId),
  })

  if (isLoading) {
    return <ReviewListSkeleton />
  }

  if (error) {
    return (
      <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10 bg-white" />
    )
  }

  if (!data || !data.data || !data.data.success || !data.data.data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')}
        className="py-10 bg-white"
      />
    )
  }

  return <ReviewListSection reviews={data.data.data} currentMemberId={currentMemberId ?? null} />
}
