import { Skeleton } from '@/components/ui/shadcn/skeleton'

export function PlaceDetailHeaderSkeleton() {
  return <Skeleton className="h-[17px] w-[120px]" />
}

interface PlaceDetailHeaderProps {
  name: string
}

export default function PlaceDetailHeader({ name }: PlaceDetailHeaderProps) {
  return <h1 className="text-[17px] leading-[17px]">{name}</h1>
}
