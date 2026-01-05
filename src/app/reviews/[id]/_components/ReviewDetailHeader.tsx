import { Skeleton } from '@/components/ui/shadcn/skeleton'

export function ReviewDetailHeaderSkeleton() {
  return <Skeleton className="h-[17px] w-[120px]" />
}

interface ReviewDetailHeaderProps {
  memberNickname: string
}

export default function ReviewDetailHeader({ memberNickname }: ReviewDetailHeaderProps) {
  return (
    <h1 className="text-[17px] leading-[17px]">
      <span className="font-bold">{memberNickname}</span>
      님의 리뷰
    </h1>
  )
}
