import ReviewListFetcher from './ReviewListFetcher'

interface ReviewListSectionProps {
  placeId: number
}

export default function ReviewListSection({ placeId }: ReviewListSectionProps) {
  return (
    <section className="px-[15px]">
      <ReviewListFetcher placeId={placeId} />
    </section>
  )
}
