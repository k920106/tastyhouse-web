import { Suspense } from 'react'
import { PlaceImageGallerySkeleton } from './PlaceImageGallery'
import PlaceImageGalleryServer from './PlaceImageGalleryServer'

interface PlaceImageGallerySectionProps {
  placeId: number
}

export default function PlaceImageGallerySection({ placeId }: PlaceImageGallerySectionProps) {
  return (
    <section>
      <Suspense fallback={<PlaceImageGallerySkeleton />}>
        <PlaceImageGalleryServer placeId={placeId} />
      </Suspense>
    </section>
  )
}
