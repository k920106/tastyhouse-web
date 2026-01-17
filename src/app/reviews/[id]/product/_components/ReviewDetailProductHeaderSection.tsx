import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import ReviewDetailHeader from '@/components/reviews/ReviewDetailHeader'

interface ReviewDetailProductHeaderSectionProps {
  memberNickname: string
}

export default function ReviewDetailProductHeaderSection({ memberNickname }: ReviewDetailProductHeaderSectionProps) {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderCenter>
        <ReviewDetailHeader memberNickname={memberNickname} />
      </HeaderCenter>
    </Header>
  )
}
