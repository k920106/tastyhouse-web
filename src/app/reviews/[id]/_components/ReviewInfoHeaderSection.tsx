import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { Suspense } from 'react'
import ReviewInfoHeader, { ReviewInfoHeaderSkeleton } from './ReviewInfoHeader'

interface ReviewInfoHeaderSectionProps {
  reviewId: number
}

export default function ReviewInfoHeaderSection({ reviewId }: ReviewInfoHeaderSectionProps) {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderCenter>
        <Suspense fallback={<ReviewInfoHeaderSkeleton />}>
          <ReviewInfoHeader reviewId={reviewId} />
        </Suspense>
      </HeaderCenter>
    </Header>
  )
}
