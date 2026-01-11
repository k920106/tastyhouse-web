import ReviewListFetcher from './ReviewListFetcher'
import ReviewStatisticsFetcher from './ReviewStatisticsFetcher'

interface ReviewSectionProps {
  placeId: number
}

export default function ReviewSection({ placeId }: ReviewSectionProps) {
  return (
    <section className="px-[15px] pt-5 pb-8 border-b border-[#eeeeee] box-border">
      <ReviewStatisticsFetcher placeId={placeId} />
      <ReviewListFetcher placeId={placeId} />
    </section>
  )
}
