import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'

interface ReviewDetailHeaderProps {
  userName: string
}

export default function ReviewDetailHeader({ userName }: ReviewDetailHeaderProps) {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderCenter>
        <h1 className="text-[17px] leading-[17px]">
          <span className="font-bold">{userName}</span>
          님의 리뷰
        </h1>
      </HeaderCenter>
    </Header>
  )
}
