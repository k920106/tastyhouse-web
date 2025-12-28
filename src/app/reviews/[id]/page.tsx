import ReviewDetailContent from './_components/ReviewDetailContent'

interface ReviewDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ReviewDetailPage({ params }: ReviewDetailPageProps) {
  const { id } = await params

  return <ReviewDetailContent reviewId={Number(id)} />
}
