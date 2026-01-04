import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { Suspense } from 'react'
import ReviewDetailHeader, { ReviewDetailHeaderSkeleton } from './ReviewDetailHeader'

interface ReviewDetailHeaderSectionProps {
  params: Promise<{ id: string }>
}

export default function ReviewDetailHeaderSection({ params }: ReviewDetailHeaderSectionProps) {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderCenter>
        <Suspense fallback={<ReviewDetailHeaderSkeleton />}>
          <ReviewDetailHeader params={params} />
        </Suspense>
      </HeaderCenter>
    </Header>
  )
}
