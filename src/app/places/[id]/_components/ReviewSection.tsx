import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import ReviewListFetcher from './ReviewListFetcher'
import ReviewStatisticsFetcher from './ReviewStatisticsFetcher'

interface ReviewSectionProps {
  placeId: number
}

export default function ReviewSection({ placeId }: ReviewSectionProps) {
  return (
    <section>
      <SectionStack>
        <BorderedSection className="border-t-0">
          <ReviewStatisticsFetcher placeId={placeId} />
        </BorderedSection>
        <BorderedSection>
          <ReviewListFetcher placeId={placeId} />
        </BorderedSection>
      </SectionStack>
    </section>
  )
}
