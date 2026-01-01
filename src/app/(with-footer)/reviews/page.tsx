import { Suspense } from 'react'
import SectionStack from '@/components/ui/SectionStack'
import { LatestReviewListSkeleton } from './_components/LatestReviewList'
import ReviewPageContent from './_components/ReviewPageContent'

export default function ReviewPage() {
  return (
    <Suspense fallback={<ReviewPageSkeleton />}>
      <ReviewPageContent />
    </Suspense>
  )
}

function ReviewPageSkeleton() {
  return (
    <>
      <div className="sticky top-0 flex w-full h-[50px] bg-white z-40">
        <div className="flex-1 h-full flex items-center justify-center text-sm leading-[14px] text-[#333333]/40 border-b border-[#eeeeee]">
          전체
        </div>
        <div className="flex-1 h-full flex items-center justify-center text-sm leading-[14px] text-[#333333]/40 border-b border-[#eeeeee]">
          팔로잉
        </div>
      </div>
      <SectionStack>
        <LatestReviewListSkeleton />
      </SectionStack>
    </>
  )
}
