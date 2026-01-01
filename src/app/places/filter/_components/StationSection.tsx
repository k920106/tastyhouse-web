import { Suspense } from 'react'
import BorderedSection from '@/components/ui/BorderedSection'
import StationContent from './StationContent'
import { StationSelectorSkeleton } from './StationSelector'

export default function StationSection() {
  return (
    <BorderedSection className="px-[15px] py-5">
      <h2 className="mb-[15px] text-sm leading-[14px]">지하철역</h2>
      <Suspense fallback={<StationSelectorSkeleton />}>
        <StationContent />
      </Suspense>
    </BorderedSection>
  )
}
