import { Suspense } from 'react'
import PlaceSummaryContent from './PlaceSummaryContent'

interface PlaceSummarySectionProps {
  placeId: number
}

export default function PlaceSummarySection({ placeId }: PlaceSummarySectionProps) {
  return (
    <section className="px-[15px] py-5">
      <Suspense fallback={<div></div>}>
        <PlaceSummaryContent placeId={placeId} />
      </Suspense>
    </section>
  )
}
