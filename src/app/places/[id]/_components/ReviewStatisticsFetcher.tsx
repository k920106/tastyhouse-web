import ErrorMessage from '@/components/ui/ErrorMessage'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getPlaceReviewStatistics } from '@/services/place'
import { useQuery } from '@tanstack/react-query'
import ReviewStatistics, { ReviewStatisticsSkeleton } from './ReviewStatistics'

interface ReviewStatisticsFetcherProps {
  placeId: number
}

export default function ReviewStatisticsFetcher({ placeId }: ReviewStatisticsFetcherProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['place', placeId, 'place-detail-review-statistics'],
    queryFn: () => getPlaceReviewStatistics(placeId),
  })

  if (isLoading) {
    return <ReviewStatisticsSkeleton />
  }

  if (error) {
    return (
      <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10 bg-white" />
    )
  }

  if (!data || !data.data || !data.data.success || !data.data.data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰 통계')}
        className="py-10 bg-white"
      />
    )
  }

  return <ReviewStatistics statistics={data.data.data} />
}
