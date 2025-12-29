import { Suspense } from 'react'
import LatestPlaceList, { LatestPlaceListSkeleton } from './LatestPlaceList'

export default function LatestPlaceListSection() {
  return (
    <section className="py-5">
      <Suspense fallback={<LatestPlaceListSkeleton />}>
        <LatestPlaceList />
      </Suspense>
    </section>
  )
}
