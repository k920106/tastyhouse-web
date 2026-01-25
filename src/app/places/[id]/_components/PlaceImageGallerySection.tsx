import { Suspense } from 'react'
import { ImageGallerySkeleton } from './ImageGallery'
import PlaceImageGalleryServer from './PlaceImageGalleryServer'

interface PlaceImageGallerySectionProps {
  placeId: number
}

export default function PlaceImageGallerySection({ placeId }: PlaceImageGallerySectionProps) {
  return (
    <section>
      <Suspense fallback={<ImageGallerySkeleton />}>
        <PlaceImageGalleryServer placeId={placeId} />
      </Suspense>
    </section>
  )
}
