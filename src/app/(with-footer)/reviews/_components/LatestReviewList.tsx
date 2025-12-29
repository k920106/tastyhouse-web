import ReviewAuthorInfo from '@/components/reviews/ReviewAuthorInfo'
import ReviewImageGallery from '@/components/reviews/ReviewImageGallery'
import ReviewOptionDrawer from '@/components/reviews/ReviewOptionDrawer'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { PAGE_PATHS } from '@/lib/paths'
import { PagedApiResponse } from '@/types/api/api'
import { LatestReview, LatestReviewQuery, ReviewType } from '@/types/api/review'
import ClampedText from './ClampedText'

export function LatestReviewListSkeleton() {
  return (
    <>
      {[...Array(2)].map((_, i) => (
        <LatestReviewListItemSkeleton key={i} />
      ))}
    </>
  )
}

function LatestReviewListItemSkeleton() {
  return (
    <div className="flex flex-col px-[15px] pt-3 pb-[30px] bg-white">
      <div className="flex justify-between mb-[15px]">
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-20 h-3.5" />
            <Skeleton className="w-16 h-3" />
          </div>
        </div>
        <Skeleton className="w-1 h-[18px] mr-2" />
      </div>
      <div className="mb-6">
        <Skeleton className="aspect-[345/190] w-full rounded-none" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-[14px] w-full" />
        <Skeleton className="h-[14px] w-full" />
        <Skeleton className="h-[14px] w-3/4" />
      </div>
      <div className="flex gap-4 mt-3.5">
        <Skeleton className="w-15 h-3" />
        <Skeleton className="w-15 h-3" />
      </div>
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
    } satisfies LatestReviewQuery,
  }

  const { error, data } = await api.get<PagedApiResponse<LatestReview>>(
    API_ENDPOINTS.REVIEWS_LATEST,
    query,
  )

  if (error) {
    return (
      <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10 bg-white" />
    )
  }

  if (!data || !data?.success || !data.data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')}
        className="py-10 bg-white"
      />
    )
  }

  return data.data.map((review) => {
    const { id, imageUrls, content, memberNickname, memberProfileImageUrl, createdAt } = review

    return (
      <div key={id} className="flex flex-col px-[15px] pt-3 pb-[30px] bg-white">
        <div className="flex justify-between mb-[15px]">
          <ReviewAuthorInfo
            profileImageUrl={memberProfileImageUrl}
            nickname={memberNickname}
            createdAt={createdAt}
          />
          <ReviewOptionDrawer reviewId={id} memberNickname={memberNickname} content={content} />
        </div>
        <ReviewImageGallery imageUrls={imageUrls} />
        <ClampedText text={content} href={PAGE_PATHS.REVIEW_DETAIL(id)} />
        <div className="flex gap-4 mt-3.5">
          <span className="text-xs leading-[12px] text-[#aaaaaa]">좋아요 10개</span>
          <span className="text-xs leading-[12px] text-[#aaaaaa]">댓글 10개</span>
        </div>
      </div>
    )
  })
}
