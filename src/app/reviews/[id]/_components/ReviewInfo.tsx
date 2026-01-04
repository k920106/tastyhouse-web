import ReviewAuthorInfo from '@/components/reviews/ReviewAuthorInfo'
import ReviewImageGallery from '@/components/reviews/ReviewImageGallery'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { ReviewDetail } from '@/types/api/review'
import { ReactNode } from 'react'
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
  reviewDetail: ReviewDetail
  reviewLike: ReactNode
  reviewOption: ReactNode
}

export default function ReviewInfo({ reviewDetail, reviewLike, reviewOption }: ReviewInfoProps) {
  const { memberProfileImageUrl, memberNickname, createdAt, imageUrls, content, tagNames, id } =
    reviewDetail

  return (
    <>
      <div className="flex justify-between mb-[15px]">
        <ReviewAuthorInfo
          profileImageUrl={memberProfileImageUrl}
          nickname={memberNickname}
          createdAt={createdAt}
        />
        {reviewOption}
      </div>
      <div className="mb-5">
        <ReviewImageGallery imageUrls={imageUrls} />
      </div>
      <ReviewInfoContent content={content} tagNames={tagNames} />
      <ReviewActions reviewLike={reviewLike} reviewId={id} />
    </>
  )
}
