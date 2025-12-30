import { Suspense } from 'react'
import FacilityContent from './FacilityContent'
import { FacilitySelectorSkeleton } from './FacilitySelector'

export default function FacilitySection() {
  return (
    <section className="px-[15px] py-[30px] bg-white border-b border-[#eeeeee] box-border">
      <h2 className="mb-[15px] text-sm leading-[14px]">편의시설</h2>
      <Suspense fallback={<FacilitySelectorSkeleton />}>
        <FacilityContent />
      </Suspense>
    </section>
  )
}
