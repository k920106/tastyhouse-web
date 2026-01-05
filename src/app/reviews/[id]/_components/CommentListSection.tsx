import { Suspense } from 'react'
import { CommentListSkeleton } from './CommentList'
import CommentListServer from './CommentListServer'

interface CommentListSectionProps {
  params: Promise<{ id: string }>
}

export default function CommentListSection({ params }: CommentListSectionProps) {
  return (
    <section>
      <div className="px-[15px] py-5">
        <div className="space-y-[30px]">
          <Suspense fallback={<CommentListSkeleton />}>
            <CommentListServer params={params} />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
