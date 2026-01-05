import BorderedSection from '@/components/ui/BorderedSection'
import { Suspense } from 'react'
import PlaceInfoServer from './PlaceInfoServer'

interface PlaceInfoSectionProps {
  placeId: number
}

export default function PlaceInfoSection({ placeId }: PlaceInfoSectionProps) {
  return (
    <BorderedSection className="px-[15px] py-5">
      <Suspense fallback={<div></div>}>
        <PlaceInfoServer placeId={placeId} />
      </Suspense>
    </BorderedSection>
  )
}
