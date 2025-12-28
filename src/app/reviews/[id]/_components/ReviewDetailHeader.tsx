import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { Skeleton } from '@/components/ui/shadcn/skeleton'

export function ReviewDetailHeaderSkeleton() {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderCenter>
        <Skeleton className="h-[17px] w-[120px]" />
      </HeaderCenter>
    </Header>
  )
}

interface ReviewDetailHeaderProps {
  memberNickname: string
}

export default function ReviewDetailHeader({ memberNickname }: ReviewDetailHeaderProps) {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderCenter>
        {memberNickname && (
          <h1 className="text-[17px] leading-[17px]">
            <span className="font-bold">{memberNickname}</span>
            님의 리뷰
          </h1>
        )}
      </HeaderCenter>
    </Header>
  )
}
