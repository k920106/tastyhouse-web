import { Suspense } from 'react'
import BookmarkButton from './BookmarkButton'
import BookmarkButtonSkeleton from './BookmarkButtonSkeleton'
import { PlaceSummarySkeleton } from './PlaceSummary'
import PlaceSummaryContent from './PlaceSummaryContent'

interface PlaceSummarySectionProps {
  placeId: number
}

export default function PlaceSummarySection({ placeId }: PlaceSummarySectionProps) {
  return (
    <section className="px-[15px] py-5">
      <Suspense fallback={<PlaceSummarySkeleton />}>
        <PlaceSummaryContent
          placeId={placeId}
          bookmarkButton={
            <Suspense fallback={<BookmarkButtonSkeleton />}>
              <BookmarkButton placeId={placeId} />
            </Suspense>
          }
        />
      </Suspense>
    </section>
  )
}
