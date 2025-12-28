import ReviewInfoContent from './_components/ReviewInfoContent'

interface ReviewInfoPageProps {
  params: Promise<{ id: string }>
}

export default async function ReviewInfoPage({ params }: ReviewInfoPageProps) {
  const { id } = await params

  return <ReviewInfoContent reviewId={Number(id)} />
}
