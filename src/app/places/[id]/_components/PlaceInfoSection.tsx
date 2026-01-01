import BorderedSection from '@/components/ui/BorderedSection'
import { Suspense } from 'react'
import PlaceInfoContent from './PlaceInfoContent'

interface PlaceInfoSectionProps {
  placeId: number
}

export default function PlaceInfoSection({ placeId }: PlaceInfoSectionProps) {
  return (
    <BorderedSection className="px-[15px] py-5">
      <Suspense fallback={<div></div>}>
        <PlaceInfoContent placeId={placeId} />
      </Suspense>
    </BorderedSection>
  )
}
