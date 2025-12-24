import { Skeleton } from '@/components/ui/skeleton'
import { formatDecimal } from '@/lib/number'
import { BestPlace } from '@/types/api/place'
import Image from 'next/image'
import Link from 'next/link'

export function BestPlaceListSkeleton() {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <BestPlaceListSkeletonItem key={i} />
      ))}
    </>
  )
}

export function BestPlaceListSkeletonItem() {
  return (
    <div className="group block overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
      <div className="py-[15px]">
        <div className="flex items-center justify-between mb-1.5">
          <Skeleton className="w-1/4 h-3 mb-5" />
          <Skeleton className="w-1/6 h-[19px]" />
        </div>
        <Skeleton className="h-4 w-3/4 mb-[15px]" />
        <div className="flex gap-1.5 overflow-hidden">
          <Skeleton className="w-1/5 h-[26px] rounded-[14px]" />
        </div>
      </div>
    </div>
  )
}

interface BestPlaceListProps {
  places: BestPlace[]
}

export default async function BestPlaceList({ places }: BestPlaceListProps) {
  return places.map((place) => (
    <li key={place.id}>
      <Link href={`/places/${place.id}`} className="group block overflow-hidden">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={place.imageUrl}
            alt={place.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-300"
          />
        </div>
        <div className="py-[15px]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-[#999999]">{place.stationName}</span>
            <span className="text-[19px] text-main">{formatDecimal(place.rating, 1)}</span>
          </div>
          <h3 className="mb-[15px] truncate">{place.name}</h3>
          <div className="flex gap-1.5 overflow-hidden">
            {place.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2.5 py-1 text-xs text-[#666666] bg-white border border-[#eeeeee] rounded-[14px] whitespace-nowrap flex-shrink-0"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </li>
  ))
}
