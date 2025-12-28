import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { PagedApiResponse } from '@/types/api/api'
import { LatestReviewListItem, ReviewType } from '@/types/api/review'
import LatestReviewCard from './LatestReviewCard'

export function LatestReviewListSkeleton() {
  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white border-b-[8px] border-gray-100 pb-4">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div>
                <Skeleton className="w-20 h-4 mb-1" />
                <Skeleton className="w-16 h-3" />
              </div>
            </div>
          </div>
          <Skeleton className="w-full aspect-square" />
          <div className="px-4 mt-3">
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-3/4 h-4" />
          </div>
        </div>
      ))}
    </div>
  )
}

interface LatestReviewListProps {
  reviewType: ReviewType
}

export default async function LatestReviewList({ reviewType }: LatestReviewListProps) {
  const query = {
    params: {
      page: 0,
      size: 10,
      type: reviewType,
    },
  }

  const { error, data } = await api.get<PagedApiResponse<LatestReviewListItem>>(
    API_ENDPOINTS.REVIEWS_LATEST,
    query,
  )

  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data || !data?.success || !data.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />
  }

  return (
    <div className="flex flex-col gap-2.5 bg-[#f9f9f9]">
      {data.data.map((review) => (
        <LatestReviewCard key={review.id} review={review} />
      ))}
    </div>
  )
}
