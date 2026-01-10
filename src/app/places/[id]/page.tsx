import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import PlaceDetailHeaderSection from './_components/PlaceDetailHeaderSection'
import PlaceImageGallery from './_components/PlaceImageGallerySection'
import PlaceSummarySection from './_components/PlaceSummarySection'
import PlaceTabSection from './_components/PlaceTabSection'

interface PlaceDetailPageProps {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{ tab?: string }>
}

export default async function PlaceDetailPage({ params, searchParams }: PlaceDetailPageProps) {
  const { id } = await params
  const searchParamsData = await searchParams

  const placeId = Number(id)

  const initialTab = (searchParamsData.tab || 'info') as 'info' | 'menu' | 'photo'

  return (
    <>
      <PlaceDetailHeaderSection placeId={placeId} />
      <SectionStack>
        <BorderedSection>
          <PlaceImageGallery placeId={placeId} />
          <PlaceSummarySection placeId={placeId} />
        </BorderedSection>
        <PlaceTabSection placeId={placeId} initialTab={initialTab} />
      </SectionStack>
    </>
  )
}
