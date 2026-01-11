'use client'

import ReviewImageGallery, {
  ReviewImageGallerySkeleton,
} from '@/components/reviews/ReviewImageGallery'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { PlacePhotoCategory } from '@/types/api/place-detail'

export function PlacePhotoListSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="pt-[30px]">
          <Skeleton className="mb-[15px] w-8 h-[14px]" />
          <ReviewImageGallerySkeleton />
        </div>
      ))}
    </>
  )
}

interface PlacePhotoListProps {
  categories: PlacePhotoCategory[]
}

export default function PlacePhotoList({ categories }: PlacePhotoListProps) {
  return (
    <div>
      {categories.map((category) => (
        <div key={category.categoryName} className="pt-[30px]">
          <h3 className="mb-[15px] text-sm leading-[14px]">{category.categoryName}</h3>
          <ReviewImageGallery imageUrls={category.imageUrls} />
        </div>
      ))}
    </div>
  )
}
