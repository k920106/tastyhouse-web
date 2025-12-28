import { Suspense } from 'react'
import ReviewDetailContent from './_components/ReviewDetailContent'

interface ReviewDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ReviewDetailPage({ params }: ReviewDetailPageProps) {
  const { id } = await params

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ReviewDetailContent reviewId={id} />
    </Suspense>
  )
}
