import { Suspense } from 'react'
import { PlaceImageGallerySkeleton } from './PlaceImageGallery'
import PlaceImageGalleryContent from './PlaceImageGalleryContent'

interface PlaceImageGallerySectionProps {
  placeId: number
}

export default function PlaceImageGallerySection({ placeId }: PlaceImageGallerySectionProps) {
  return (
    <section>
      <Suspense fallback={<PlaceImageGallerySkeleton />}>
        <PlaceImageGalleryContent placeId={placeId} />
      </Suspense>
    </section>
  )
}
