import { Suspense } from 'react'
import PlaceListContent, { PlaceListContentSkeleton } from './PlaceListContent'

export default function PlaceListSection() {
  return (
    <section>
      <Suspense fallback={<PlaceListContentSkeleton />}>
        <PlaceListContent />
      </Suspense>
    </section>
  )
}
