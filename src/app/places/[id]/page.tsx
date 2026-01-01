import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import PlaceDetailHeaderSection from './_components/PlaceDetailHeaderSection'
import PlaceImageGallery from './_components/PlaceImageGallerySection'
import PlaceSummarySection from './_components/PlaceSummarySection'

// async function getPlaceInfo(placeId: string) {
//   const response = await api.get<CommonResponse<PlaceInfoResponse>>(
//     `/api/places/v1/${placeId}/info`,
//   )
//   if (response.error || !response.data) {
//     throw new Error(response.error || '플레이스 정보를 불러올 수 없습니다')
//   }
//   return response.data.data
// }

// async function getPlaceThumbnails(placeId: string) {
//   const response = await api.get<CommonResponse<PlaceThumbnailResponse[]>>(
//     `/api/places/v1/${placeId}/thumbnails`,
//   )
//   if (response.error || !response.data) {
//     throw new Error(response.error || '썸네일 정보를 불러올 수 없습니다')
//   }
//   return response.data.data
// }

// async function getPlaceMenus(placeId: string) {
//   const response = await api.get<CommonResponse<PlaceMenuResponse[]>>(
//     `/api/places/v1/${placeId}/menus`,
//   )
//   if (response.error || !response.data) {
//     throw new Error(response.error || '메뉴 정보를 불러올 수 없습니다')
//   }
//   return response.data.data
// }

// async function getPlacePhotos(placeId: string) {
//   const response = await api.get<PagedCommonResponse<PlacePhotoResponse>>(
//     `/api/places/v1/${placeId}/photos`,
//     {
//       params: {
//         page: 0,
//         size: 100,
//       },
//     },
//   )
//   if (response.error || !response.data) {
//     throw new Error(response.error || '사진 정보를 불러올 수 없습니다')
//   }
//   return response.data.data
// }

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
}

export default async function PlaceDetailPage({ params }: PlaceDetailPageProps) {
  const { id } = await params

  const placeId = Number(id)

  return (
    <>
      <PlaceDetailHeaderSection placeId={placeId} />
      <SectionStack>
        <BorderedSection>
          <PlaceImageGallery placeId={placeId} />
          <PlaceSummarySection placeId={placeId} />
        </BorderedSection>
        {/* <PlaceInfoSection placeId={placeId} /> */}
      </SectionStack>
    </>
  )
}
