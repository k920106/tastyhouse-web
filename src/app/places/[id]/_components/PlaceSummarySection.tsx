import { Suspense } from 'react'
import { PlaceBookmarkButtonSkeleton } from './PlaceBookmarkButtonClient'
import PlaceBookmarkButtonServer from './PlaceBookmarkButtonServer'
import { PlaceSummarySkeleton } from './PlaceSummary'
import PlaceSummaryServer from './PlaceSummaryServer'

interface PlaceSummarySectionProps {
  placeId: number
}

export default function PlaceSummarySection({ placeId }: PlaceSummarySectionProps) {
  return (
    <section className="px-[15px] py-5">
      <Suspense fallback={<PlaceSummarySkeleton />}>
        <PlaceSummaryServer
          placeId={placeId}
          bookmarkButton={
            <Suspense fallback={<PlaceBookmarkButtonSkeleton />}>
              <PlaceBookmarkButtonServer placeId={placeId} />
            </Suspense>
          }
        />
      </Suspense>
    </section>
  )
}
