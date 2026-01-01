import ReviewAuthorInfo from '@/components/reviews/ReviewAuthorInfo'
import ReviewImageGallery from '@/components/reviews/ReviewImageGallery'
import ReviewOptionDrawer from '@/components/reviews/ReviewOptionDrawer'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { MemberInfoResponse } from '@/types/api/member'
import { ReviewDetail } from '@/types/api/review'
import ReviewActions from './ReviewActions'
import ReviewInfoContent from './ReviewContent'

export function ReviewInfoSkeleton() {
  return (
    <>
      <div className="flex justify-between mb-[15px]">
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-9 h-9 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-[14px] w-[80px]" />
            <Skeleton className="h-[12px] w-[50px]" />
          </div>
        </div>
      </div>
      <Skeleton className="aspect-[345/190] w-full mb-5 rounded-none" />
      <div className="space-y-2">
        <Skeleton className="h-[14px] w-full" />
        <Skeleton className="h-[14px] w-full" />
        <Skeleton className="h-[14px] w-3/4" />
      </div>
      <div className="flex flex-wrap gap-[7px] mt-5">
        <Skeleton className="h-[26px] w-[60px] rounded-full" />
        <Skeleton className="h-[26px] w-[80px] rounded-full" />
        <Skeleton className="h-[26px] w-[70px] rounded-full" />
      </div>
      <div className="flex items-center gap-5 mt-[15px] pt-[17px] border-t border-[#eeeeee]">
        <Skeleton className="h-[12px] w-[60px]" />
        <Skeleton className="h-[12px] w-[50px]" />
      </div>
    </>
  )
}

interface ReviewInfoProps {
  reviewId: number
}

export default async function ReviewInfo({ reviewId }: ReviewInfoProps) {
  const [reviewResponse, memberResponse] = await Promise.all([
    api.get<ApiResponse<ReviewDetail>>(API_ENDPOINTS.REVIEW_DETAIL(reviewId)),
    api.get<ApiResponse<MemberInfoResponse>>(API_ENDPOINTS.MEMBER_ME),
  ])

  const { error, data } = reviewResponse

  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10" />
  }

  if (!data?.success || !data?.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} className="py-10" />
  }

  const currentMemberId =
    memberResponse.data?.success && memberResponse.data.data ? memberResponse.data.data.id : null

  const {
    id,
    memberId,
    content,
    memberNickname,
    memberProfileImageUrl,
    createdAt,
    imageUrls,
    tagNames,
    isLiked,
  }: ReviewDetail = data.data

  return (
    <>
      <div className="flex justify-between mb-[15px]">
        <ReviewAuthorInfo
          profileImageUrl={memberProfileImageUrl}
          nickname={memberNickname}
          createdAt={createdAt}
        />
        <ReviewOptionDrawer
          reviewId={id}
          memberId={memberId}
          currentMemberId={currentMemberId}
          memberNickname={memberNickname}
          content={content}
        />
      </div>
      <div className="mb-5">
        <ReviewImageGallery imageUrls={imageUrls} />
      </div>
      <ReviewInfoContent content={content} tagNames={tagNames} />
      <ReviewActions reviewId={id} initialIsLiked={isLiked} />
    </>
  )
}
