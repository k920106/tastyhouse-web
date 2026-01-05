import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import PlaceDetailHeaderSection from './_components/PlaceDetailHeaderSection'
import PlaceImageGallery from './_components/PlaceImageGallerySection'
import PlaceSummarySection from './_components/PlaceSummarySection'
import PlaceTabSection from './_components/PlaceTabSection'

// async function getPlaceReviews(placeId: string) {
//   const response = await api.get<PagedCommonResponse<PlaceReviewResponse>>(
//     `/api/places/v1/${placeId}/reviews`,
//     {
//       params: {
//         page: 0,
//         size: 10,
//       },
//     },
//   )
//   if (response.error || !response.data) {
//     throw new Error(response.error || '리뷰 정보를 불러올 수 없습니다')
//   }
//   return response.data.data
// }

// async function getPlaceReviewStatistics(placeId: string) {
//   const response = await api.get<CommonResponse<PlaceReviewStatisticsResponse>>(
//     `/api/places/v1/${placeId}/reviews/statistics`,
//   )
//   if (response.error || !response.data) {
//     throw new Error(response.error || '리뷰 통계 정보를 불러올 수 없습니다')
//   }
//   return response.data.data
// }

interface PlaceDetailPageProps {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{ tab?: string }>
}

export default async function PlaceDetailPage({ params, searchParams }: PlaceDetailPageProps) {
  const { id } = await params
  const placeId = Number(id)
  const searchParamsData = await searchParams
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
