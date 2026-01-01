import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { Suspense } from 'react'
import PlaceDetailHeader, { PlaceDetailHeaderSkeleton } from './PlaceDetailHeader'

interface PlaceDetailHeaderSectionProps {
  placeId: number
}

export default function PlaceDetailHeaderSection({ placeId }: PlaceDetailHeaderSectionProps) {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderCenter>
        <Suspense fallback={<PlaceDetailHeaderSkeleton />}>
          <PlaceDetailHeader placeId={placeId} />
        </Suspense>
      </HeaderCenter>
    </Header>
  )
}
