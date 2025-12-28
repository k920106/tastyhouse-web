import { Suspense } from 'react'
import CommentList, { CommentListSkeleton } from './CommentList'

interface CommentListSectionProps {
  reviewId: number
}

export default async function CommentListSection({ reviewId }: CommentListSectionProps) {
  return (
    <section>
      <div className="px-[15px] py-5">
        <div className="space-y-[30px]">
          <Suspense fallback={<CommentListSkeleton />}>
            <CommentList reviewId={reviewId} />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
