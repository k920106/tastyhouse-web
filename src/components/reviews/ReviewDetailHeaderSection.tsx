import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { Suspense } from 'react'
import { ReviewDetailHeaderSkeleton } from './ReviewDetailHeader'
import ReviewDetailHeaderServer from './ReviewDetailHeaderServer'

interface ReviewDetailHeaderSectionProps {
  reviewId: number
}

export default function ReviewDetailHeaderSection({ reviewId }: ReviewDetailHeaderSectionProps) {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderCenter>
        <Suspense fallback={<ReviewDetailHeaderSkeleton />}>
          <ReviewDetailHeaderServer reviewId={reviewId} />
        </Suspense>
      </HeaderCenter>
    </Header>
  )
}
