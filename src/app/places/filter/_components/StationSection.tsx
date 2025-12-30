import { Suspense } from 'react'
import StationContent from './StationContent'
import { StationSelectorSkeleton } from './StationSelector'

export default function StationSection() {
  return (
    <section className="px-4 py-5 bg-white border-b border-[#eeeeee] box-border">
      <h2 className="mb-[15px] text-sm leading-[14px]">지하철역</h2>
      <Suspense fallback={<StationSelectorSkeleton />}>
        <StationContent />
      </Suspense>
    </section>
  )
}
